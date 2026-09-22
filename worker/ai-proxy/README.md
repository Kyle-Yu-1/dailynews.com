# 学习 Agent · AI 转发代理（方案 B）

这个目录是网站 AI 助手的「转发员」：网页把 `你的 API key + 问题` 发给它，它转发给 AI 厂商，再把答案送回网页。**它不保存、不打印任何 key 和对话**。

## 一、准备工作（只需一次）

1. 注册 Cloudflare 账号：https://dash.cloudflare.com/sign-up （免费，不需要绑卡）
2. 电脑安装 Node.js（你已经装过了，直接下一步）

## 二、安装并登录 wrangler

打开 PowerShell，依次运行：

```powershell
npm install -g wrangler
wrangler login
```

`wrangler login` 会弹出浏览器让你点「Allow」授权。

## 三、部署

先进入本目录（把路径换成你的）：

```powershell
cd "C:\Users\19461\OneDrive\文档\ChatGPT\大学学习 3\worker\ai-proxy"
wrangler deploy
```

成功后会输出类似：

```
Deployed successfully!
Your worker is live at: https://study-agent-ai-proxy.你的名字.workers.dev
```

**把这段 `https://....workers.dev` 地址复制下来**，下一步要用。

## 四、把地址填进网站

1. 打开网站 → 点顶部 🤖 按钮 → 打开 ⚙️ 设置
2. 在「代理地址」里粘贴你的 `https://....workers.dev`
3. 选择服务商、填你的 API key → 保存，即可开始聊天

## 五、自定义

- **加/减服务商**：编辑 `src/index.js` 里的 `ALLOWED_HOSTS`
- **改限流**：编辑 `RATE_MAX`（默认每 IP 每分钟 30 次）
- **只允许自己的域名**：编辑 `ALLOWED_ORIGINS`
- 每次修改后重新运行 `wrangler deploy`

## 六、安全说明

- 本代理是「无日志、无状态」：key 只在单次请求内存里停留
- 限流是内存级的（多个实例间不严格共享），对个人网站足够；要高强度防刷可在 Cloudflare 控制台给域名加 WAF 规则
- 务必给 Cloudflare 账号开**两步验证（2FA）**
- 仓库代码公开可审计：任何人可检查本文件没有偷 key 的后门