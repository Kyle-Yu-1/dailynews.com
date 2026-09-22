(function () {
  'use strict';

  /* 常见 OpenAI 兼容服务商（与 Worker 的 ALLOWED_HOSTS 对应） */
  var PROVIDERS = [
    { name: 'DeepSeek（推荐，便宜）', url: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
    { name: 'OpenAI', url: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
    { name: 'Kimi（Moonshot）', url: 'https://api.moonshot.cn/v1/chat/completions', model: 'moonshot-v1-8k' },
    { name: '通义千问', url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', model: 'qwen-plus' },
    { name: '智谱 GLM', url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'glm-4-flash' },
    { name: '硅基流动', url: 'https://api.siliconflow.cn/v1/chat/completions', model: 'deepseek-ai/DeepSeek-V3' }
  ];
  var CFG_KEY = 'ai_cfg_v1';
  var CHAT_KEY = 'ai_chat_v1';

  var aiBtn = document.getElementById('aiBtn');
  var aiView = document.getElementById('aiView');
  if (!aiBtn || !aiView) return;

  var cfg = { provider: 0, apiUrl: PROVIDERS[0].url, model: PROVIDERS[0].model, apiKey: '', workerUrl: '', remember: false };
  var chatHistory = [];
  var busy = false;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escAttr(s) { return esc(s).replace(/'/g, '&#39;'); }

  function hideAll() {
    ['listView', 'detailView', 'treeView', 'notesView', 'noteReader', 'tasksView', 'libraryView', 'libraryReader', 'aiView']
      .forEach(function (id) { var el = document.getElementById(id); if (el) el.classList.add('hidden'); });
  }

  /* ---------- 配置持久化（key 只有勾选“记住”才写进本机） ---------- */
  function loadCfg() {
    try {
      var raw = JSON.parse(localStorage.getItem(CFG_KEY) || 'null');
      if (raw && typeof raw === 'object') {
        cfg.provider = Number(raw.provider) || 0;
        cfg.apiUrl = raw.apiUrl || PROVIDERS[cfg.provider].url;
        cfg.model = raw.model || PROVIDERS[cfg.provider].model;
        cfg.workerUrl = raw.workerUrl || '';
        cfg.remember = !!raw.remember;
        if (cfg.remember && raw.apiKey) cfg.apiKey = raw.apiKey;
      }
    } catch (e) {}
  }
  function persistCfg() {
    var obj = {
      provider: cfg.provider,
      apiUrl: cfg.apiUrl,
      model: cfg.model,
      workerUrl: cfg.workerUrl,
      remember: cfg.remember,
      apiKey: cfg.remember ? cfg.apiKey : ''
    };
    try { localStorage.setItem(CFG_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  function loadChat() {
    try { chatHistory = JSON.parse(localStorage.getItem(CHAT_KEY) || '[]'); } catch (e) { chatHistory = []; }
    if (!Array.isArray(chatHistory)) chatHistory = [];
  }
  function persistChat() {
    try { localStorage.setItem(CHAT_KEY, JSON.stringify(chatHistory.slice(-100))); } catch (e) {}
  }

  /* ---------- 渲染 ---------- */
  function renderShell() {
    aiView.innerHTML =
      '<div class="ai-topbar">'
      + '<button id="aiBack" class="back-btn">← 返回日报</button>'
      + '<span class="ai-title">🤖 AI 助手 · 自带 Key</span>'
      + '<span class="ai-topbar-spacer"></span>'
      + '<button id="aiToggleConfig" class="back-btn">⚙️ 设置</button>'
      + '<button id="aiClearChat" class="back-btn">🧹 清空对话</button>'
      + '</div>'
      + '<div id="aiConfig" class="ai-config"></div>'
      + '<div id="aiChat" class="ai-chat"></div>';

    document.getElementById('aiBack').addEventListener('click', function () {
      hideAll();
      document.getElementById('listView').classList.remove('hidden');
    });
    document.getElementById('aiClearChat').addEventListener('click', function () {
      chatHistory = [];
      persistChat();
      renderChat();
      if (window.showToast) window.showToast('对话已清空');
    });
    document.getElementById('aiToggleConfig').addEventListener('click', function () {
      var box = document.getElementById('aiConfig');
      box.classList.toggle('hidden');
    });

    renderConfig();
    renderChat();
  }

  function renderConfig() {
    var box = document.getElementById('aiConfig');
    var opts = PROVIDERS.map(function (p, i) {
      return '<option value="' + i + '"' + (i === cfg.provider ? ' selected' : '') + '>' + esc(p.name) + '</option>';
    }).join('');
    box.innerHTML =
      '<div class="ai-config-grid">'
      + '<div class="ai-field"><label>服务商</label><select id="aiProvider">' + opts + '</select></div>'
      + '<div class="ai-field"><label>API 端点（选服务商后自动填）</label><input id="aiUrl" value="' + escAttr(cfg.apiUrl) + '"></div>'
      + '<div class="ai-field"><label>模型</label><input id="aiModel" value="' + escAttr(cfg.model) + '"></div>'
      + '<div class="ai-field"><label>API Key</label><input id="aiKey" type="password" value="' + escAttr(cfg.apiKey) + '" placeholder="sk-..."></div>'
      + '<div class="ai-field"><label>代理地址（你部署的 Worker）</label><input id="aiWorker" value="' + escAttr(cfg.workerUrl) + '" placeholder="https://xxx.workers.dev"></div>'
      + '</div>'
      + '<div class="ai-config-foot">'
      + '<label class="ai-remember"><input type="checkbox" id="aiRemember"' + (cfg.remember ? ' checked' : '') + '> 记住到本机浏览器（不勾选则 Key 仅本次会话有效）</label>'
      + '<div class="ai-config-actions">'
      + '<button id="aiSaveCfg" class="back-btn">💾 保存设置</button>'
      + '<button id="aiClearKey" class="back-btn">🗑 清除 Key</button>'
      + '</div>'
      + '</div>'
      + '<p class="ai-safety">🔒 Key 只存在你自己的浏览器，仅经你自己的 Worker 转发给所选 AI 厂商；本站代码不含任何 Key。公共电脑请勿勾选“记住”。</p>';

    document.getElementById('aiProvider').addEventListener('change', function () {
      var i = Number(this.value) || 0;
      document.getElementById('aiUrl').value = PROVIDERS[i].url;
      document.getElementById('aiModel').value = PROVIDERS[i].model;
    });
    document.getElementById('aiSaveCfg').addEventListener('click', function () { collectCfg(true); });
    document.getElementById('aiClearKey').addEventListener('click', function () {
      cfg.apiKey = '';
      persistCfg();
      document.getElementById('aiKey').value = '';
      if (window.showToast) window.showToast('Key 已清除');
    });
  }

  function collectCfg(manual) {
    var p = Number(document.getElementById('aiProvider').value) || 0;
    cfg.provider = p;
    cfg.apiUrl = document.getElementById('aiUrl').value.trim();
    cfg.model = document.getElementById('aiModel').value.trim();
    cfg.apiKey = document.getElementById('aiKey').value.trim();
    cfg.workerUrl = document.getElementById('aiWorker').value.trim().replace(/\/+$/, '');
    cfg.remember = document.getElementById('aiRemember').checked;
    persistCfg();
    if (manual && window.showToast) window.showToast('设置已保存');
  }

  function renderChat() {
    var box = document.getElementById('aiChat');
    var msgs = chatHistory.map(function (m) {
      var cls = m.role === 'user' ? 'ai-msg user' : 'ai-msg assistant';
      return '<div class="' + cls + '"><div class="ai-bubble">' + esc(m.content) + '</div></div>';
    }).join('');
    var welcome = chatHistory.length ? '' : '<div class="ai-welcome">你好！先点 ⚙️ 设置填好「代理地址 + Key」，然后直接问我任何问题。当前支持 DeepSeek / OpenAI / Kimi / 通义 / 智谱 / 硅基流动。</div>';
    box.innerHTML = '<div class="ai-messages" id="aiMessages">' + welcome + msgs + '<div id="aiBusy" class="ai-busy hidden">思考中…</div></div>'
      + '<div class="ai-input-row">'
      + '<textarea id="aiInput" placeholder="输入问题…（Enter 发送，Shift+Enter 换行）"></textarea>'
      + '<button id="aiSend" class="ai-send">发送</button>'
      + '</div>';

    var messagesEl = document.getElementById('aiMessages');
    document.getElementById('aiSend').addEventListener('click', send);
    var input = document.getElementById('aiInput');
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    input.focus();
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /* ---------- 发送消息 ---------- */
  function send() {
    if (busy) return;
    collectCfg(false);
    var text = document.getElementById('aiInput').value.trim();
    if (!text) return;
    if (!cfg.workerUrl) { alert('请先在 ⚙️ 设置里填写「代理地址」（你的 Worker 地址）。'); return; }
    if (!cfg.apiKey) { alert('请先在 ⚙️ 设置里填写 API Key。'); return; }
    if (!cfg.apiUrl || !cfg.model) { alert('请先在 ⚙️ 设置里选择服务商与模型。'); return; }

    chatHistory.push({ role: 'user', content: text });
    persistChat();
    renderChat();
    busy = true;
    document.getElementById('aiBusy').classList.remove('hidden');

    fetch(cfg.workerUrl + '/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiUrl: cfg.apiUrl,
        apiKey: cfg.apiKey,
        model: cfg.model,
        messages: chatHistory,
        temperature: 0.7
      })
    }).then(function (resp) {
      return resp.text().then(function (t) {
        var data = null;
        try { data = JSON.parse(t); } catch (e) { data = null; }
        if (!resp.ok || !data) {
          var errMsg = '';
          if (data && data.error && data.error.message) errMsg = data.error.message;
          else if (t) errMsg = t.slice(0, 300);
          else errMsg = 'HTTP ' + resp.status;
          throw new Error(errMsg);
        }
        var content = '';
        if (data.choices && data.choices[0] && data.choices[0].message) content = data.choices[0].message.content || '';
        else if (data.choices && data.choices[0] && data.choices[0].text) content = data.choices[0].text || '';
        if (!content) throw new Error('返回内容为空');
        return content;
      });
    }).then(function (content) {
      chatHistory.push({ role: 'assistant', content: content });
      persistChat();
    }).catch(function (e) {
      chatHistory.push({ role: 'assistant', content: '⚠️ 出错：' + (e && e.message ? e.message : e) });
      persistChat();
    }).then(function () {
      busy = false;
      renderChat();
    });
  }

  /* ---------- 入口 ---------- */
  loadCfg();
  loadChat();
  renderShell();

  aiBtn.addEventListener('click', function () {
    hideAll();
    aiView.classList.remove('hidden');
    renderShell();
  });
})();