/**
 * 学习 Agent · AI 转发代理（BYOK，方案 B）
 *
 * 作用：网页把 {apiUrl, apiKey, model, messages} POST 到这里，
 * 本 Worker 用「用户自己的 key」转发到 OpenAI 兼容的 AI 厂商。
 *
 * 安全设计：
 * 1. 不保存、不打印任何 key 或对话内容（无日志）
 * 2. 只接受来自你网站的请求（Origin 白名单）
 * 3. 每 IP 简单限流，防止被刷
 * 4. 只允许 https + 服务商白名单（防止被当成任意 HTTP 代理 / SSRF）
 */

const ALLOWED_ORIGINS = [
  'https://kyle-yu-1.github.io',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

/* 常见 OpenAI 兼容服务商（可按需增删） */
const ALLOWED_HOSTS = [
  'api.openai.com',
  'api.deepseek.com',
  'api.moonshot.cn',
  'dashscope.aliyuncs.com',
  'open.bigmodel.cn',
  'api.siliconflow.cn',
  'api.mistral.ai',
  'openrouter.ai',
];

const RATE_WINDOW_MS = 60 * 1000; // 1 分钟窗口
const RATE_MAX = 30;              // 每 IP 每分钟最多 30 次
const rateMap = new Map();        // ip -> 时间戳数组（仅内存，粗略限流）

function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  resp.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return resp;
}

function text(status, msg) {
  return cors(new Response(msg, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return cors(new Response(null, { status: 204 }));
    if (request.method !== 'POST') return text(405, 'Method Not Allowed');

    const url = new URL(request.url);
    if (url.pathname !== '/chat') return text(404, 'Not Found');

    /* 1. Origin 校验 */
    const origin = request.headers.get('Origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) return text(403, 'Forbidden origin');

    /* 2. 限流（按 IP） */
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    let hits = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    if (hits.length >= RATE_MAX) {
      rateMap.set(ip, hits);
      return text(429, 'Too Many Requests');
    }
    hits.push(now);
    rateMap.set(ip, hits);

    /* 3. 解析参数 */
    let body;
    try { body = await request.json(); } catch (e) { return text(400, 'Bad JSON'); }
    const { apiUrl, apiKey, model, messages, temperature, maxTokens } = body || {};
    if (!apiUrl || !apiKey || !model || !Array.isArray(messages) || !messages.length) {
      return text(400, 'Missing fields');
    }

    /* 4. 只允许 https + 白名单服务商 */
    let target;
    try { target = new URL(apiUrl); } catch (e) { return text(400, 'Bad apiUrl'); }
    if (target.protocol !== 'https:' || !ALLOWED_HOSTS.includes(target.hostname)) {
      return text(400, 'Unsupported provider');
    }

    /* 5. 转发（key 只在本次请求的内存中使用，不落盘、不打印） */
    const payload = { model, messages };
    if (typeof temperature === 'number') payload.temperature = temperature;
    if (typeof maxTokens === 'number') payload.max_tokens = maxTokens;

    let upstream;
    try {
      upstream = await fetch(target.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      return text(502, 'Upstream unreachable');
    }

    const raw = await upstream.text();
    if (!upstream.ok) {
      /* 把厂商的错误信息透传一部分给前端，方便排查（不打印到服务器日志） */
      return cors(new Response(raw, { status: upstream.status, headers: { 'Content-Type': 'application/json; charset=utf-8' } }));
    }
    return cors(new Response(raw, { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } }));
  },
};