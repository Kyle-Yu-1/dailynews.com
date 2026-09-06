(function () {
  'use strict';
  var DEFAULT_INDUSTRIES = ['机器人'];
  var STORAGE_KEY = 'industry_extra_v1';
  var THEME_KEY = 'report_site_theme_v1';
  var reports = Array.isArray(window.DAILY_REPORTS) ? window.DAILY_REPORTS : [];

  var nav = document.getElementById('industryNav');
  var pageTitle = document.getElementById('pageTitle');
  var listView = document.getElementById('listView');
  var detailView = document.getElementById('detailView');
  var reportList = document.getElementById('reportList');
  var searchInput = document.getElementById('searchInput');
  var themeToggle = document.getElementById('themeToggle');
  var addBtn = document.getElementById('addIndustryBtn');
  var addBox = document.getElementById('addIndustryBox');
  var newInput = document.getElementById('newIndustryInput');
  var confirmAdd = document.getElementById('confirmAdd');
  var cancelAdd = document.getElementById('cancelAdd');
  var toastEl = document.getElementById('toast');
  var statReports = document.getElementById('statReports');
  var statIndustries = document.getElementById('statIndustries');
  var statDays = document.getElementById('statDays');

  var currentIndustry = DEFAULT_INDUSTRIES[0];
  var currentReport = null;
  var query = '';
  var toastTimer = null;

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escAttr(s) { return esc(s).replace(/'/g, '&#39;'); }
  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function highlight(text) {
    var t = esc(text);
    var q = query.trim();
    if (!q) return t;
    var safe = esc(q);
    if (!safe) return t;
    return t.replace(new RegExp('(' + escapeRegExp(safe) + ')', 'gi'), '<mark>$1</mark>');
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.add('hidden'); }, 2200);
  }

  /* ---------- 主题 ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
  (function initTheme() {
    var saved = 'light';
    try { saved = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) {}
    applyTheme(saved);
  })();
  themeToggle.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ---------- 行业 ---------- */
  function getExtra() {
    try {
      var v = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(v) ? v.filter(function (x) { return typeof x === 'string' && x.trim(); }) : [];
    } catch (e) { return []; }
  }
  function setExtra(list) {
    var cleaned = list.map(function (x) { return x.trim(); }).filter(Boolean);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  }
  function allIndustries() {
    var extra = getExtra().filter(function (x) { return DEFAULT_INDUSTRIES.indexOf(x) === -1; });
    return DEFAULT_INDUSTRIES.concat(extra);
  }

  function renderNav() {
    nav.innerHTML = '';
    allIndustries().forEach(function (name) {
      var count = reports.filter(function (r) { return r.industry === name; }).length;
      var item = document.createElement('div');
      item.className = 'nav-item' + (name === currentIndustry ? ' active' : '');
      var label = document.createElement('span');
      label.textContent = name;
      var badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = count;
      label.appendChild(badge);
      item.appendChild(label);
      if (DEFAULT_INDUSTRIES.indexOf(name) === -1) {
        var del = document.createElement('button');
        del.className = 'nav-del';
        del.title = '删除该行业';
        del.textContent = '×';
        del.addEventListener('click', function (e) {
          e.stopPropagation();
          if (window.confirm('确定删除行业“' + name + '”吗？（已收录的日报不会被删除）')) {
            setExtra(getExtra().filter(function (x) { return x !== name; }));
            if (currentIndustry === name) currentIndustry = DEFAULT_INDUSTRIES[0];
            renderAll();
          }
        });
        item.appendChild(del);
      }
      item.addEventListener('click', function () {
        currentIndustry = name;
        currentReport = null;
        query = '';
        searchInput.value = '';
        renderAll();
      });
      nav.appendChild(item);
    });
  }

  /* ---------- Markdown ---------- */
  function inlineMd(s) {
    s = esc(s);
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    return s;
  }
  function renderMarkdown(md) {
    var lines = String(md || '').split(/\r?\n/);
    var out = [];
    var listOpen = null;
    var table = [];
    function closeList() { if (listOpen) { out.push('</' + listOpen + '>'); listOpen = null; } }
    function flushTable() {
      if (!table.length) return;
      var html = ['<table>'];
      table.forEach(function (row, idx) {
        var cells = row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(function (c) { return c.trim(); });
        if (idx === 1 && cells.every(function (c) { return /^:?-{2,}:?$/.test(c); })) return;
        var tag = idx === 0 ? 'th' : 'td';
        html.push('<tr>' + cells.map(function (c) { return '<' + tag + '>' + inlineMd(c) + '</' + tag + '>'; }).join('') + '</tr>');
      });
      html.push('</table>');
      out.push(html.join(''));
      table = [];
    }
    lines.forEach(function (raw) {
      var line = raw.replace(/\s+$/, '');
      if (/^\s*\|.*\|\s*$/.test(line) && line.indexOf('|') !== -1) {
        closeList(); table.push(line); return;
      }
      if (table.length) flushTable();
      if (!line.trim()) { closeList(); return; }
      var m;
      if ((m = line.match(/^#{1,6}\s+(.*)$/))) {
        closeList();
        var level = Math.min(m[0].indexOf(' ') + 2, 6);
        out.push('<h' + level + '>' + inlineMd(m[1]) + '</h' + level + '>');
        return;
      }
      if ((m = line.match(/^\s*[-*+]\s+(.*)$/))) {
        if (listOpen !== 'ul') { closeList(); out.push('<ul>'); listOpen = 'ul'; }
        out.push('<li>' + inlineMd(m[1]) + '</li>');
        return;
      }
      if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
        if (listOpen !== 'ol') { closeList(); out.push('<ol>'); listOpen = 'ol'; }
        out.push('<li>' + inlineMd(m[1]) + '</li>');
        return;
      }
      closeList();
      out.push('<p>' + inlineMd(line) + '</p>');
    });
    if (table.length) flushTable();
    closeList();
    return out.join('');
  }

  /* ---------- 数据 ---------- */
  function currentReports() { return reports.filter(function (r) { return r.industry === currentIndustry; }); }
  function filteredReports() {
    var q = query.trim().toLowerCase();
    return currentReports().filter(function (r) {
      if (!q) return true;
      return [r.title, r.summary, r.content].some(function (s) {
        return String(s || '').toLowerCase().indexOf(q) !== -1;
      });
    }).sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
  }

  /* ---------- 列表 ---------- */
  function cardHtml(r) {
    var words = String(r.content || '').length;
    return '<div class="card" data-idx="">'
      + '<div class="card-date">' + esc(r.date) + '</div>'
      + '<h3 class="card-title">' + highlight(r.title || '未命名日报') + '</h3>'
      + '<p class="card-summary">' + highlight(r.summary || '') + '</p>'
      + '<div class="card-meta"><span>' + (r.industry || '') + '</span><span>约 ' + words + ' 字</span></div>'
      + '</div>';
  }
  function renderStats() {
    var items = currentReports();
    var days = {};
    items.forEach(function (r) { if (r.date) days[r.date] = true; });
    statReports.textContent = items.length;
    statIndustries.textContent = allIndustries().length;
    statDays.textContent = Object.keys(days).length;
  }
  function renderList() {
    currentReport = null;
    detailView.classList.add('hidden');
    listView.classList.remove('hidden');
    pageTitle.textContent = currentIndustry;
    var items = filteredReports();
    if (!items.length) {
      reportList.innerHTML = '<div class="empty">该行业暂无日报。<br>每日 20:00 自动更新后，这里会按日期逐天列出。</div>';
      return;
    }
    var groups = {};
    items.forEach(function (r) { (groups[r.date] = groups[r.date] || []).push(r); });
    var html = [];
    Object.keys(groups).sort(function (a, b) { return String(b).localeCompare(String(a)); }).forEach(function (date) {
      html.push('<div class="day-group"><div class="day-head"><span class="day-dot"></span><span class="day-label">' + esc(date) + '</span><span class="day-count">' + groups[date].length + ' 篇</span></div><div class="report-grid">');
      groups[date].forEach(function (r) { html.push(cardHtml(r)); });
      html.push('</div></div>');
    });
    reportList.innerHTML = html.join('');
    var cards = Array.prototype.slice.call(reportList.querySelectorAll('.card'));
    cards.forEach(function (card, i) {
      card.addEventListener('click', function () { openDetail(items[i]); });
    });
  }

  /* ---------- 详情 ---------- */
  function openDetail(r) {
    currentReport = r;
    listView.classList.add('hidden');
    detailView.classList.remove('hidden');
    pageTitle.textContent = (r.industry || '') + ' · ' + r.date;
    var html = [];
    html.push('<button class="back-btn" id="backBtn">← 返回日报列表</button>');
    html.push('<div class="detail-head"><div class="detail-date">' + esc(r.date) + ' · ' + esc(r.industry || '') + '</div>');
    html.push('<h2>' + esc(r.title || '') + '</h2>');
    if (r.summary) html.push('<p class="detail-summary">' + esc(r.summary) + '</p>');
    html.push('</div>');
    html.push('<div class="markdown-body">' + renderMarkdown(r.content || '') + '</div>');
    if (Array.isArray(r.sources) && r.sources.length) {
      html.push('<div class="sources"><h3>出处</h3><ol>');
      r.sources.forEach(function (s) {
        if (typeof s === 'string') { html.push('<li>' + esc(s) + '</li>'); }
        else if (s && s.url) { html.push('<li><a href="' + escAttr(s.url) + '" target="_blank" rel="noopener">' + esc(s.label || s.url) + '</a></li>'); }
        else if (s) { html.push('<li>' + esc(s.label || '') + '</li>'); }
      });
      html.push('</ol></div>');
    }
    detailView.innerHTML = html.join('');
    document.getElementById('backBtn').addEventListener('click', function () {
      currentReport = null;
      renderList();
    });
  }

  /* ---------- 渲染与交互 ---------- */
  function renderAll() { renderNav(); renderStats(); renderList(); }
  function toggleAdd() {
    addBox.classList.toggle('hidden');
    if (!addBox.classList.contains('hidden')) newInput.focus();
  }
  function commitAdd() {
    var name = newInput.value.trim();
    if (!name) { toast('请输入行业名称'); return; }
    if (allIndustries().indexOf(name) !== -1) { toast('该行业已存在'); return; }
    var extra = getExtra();
    extra.push(name);
    setExtra(extra);
    currentIndustry = name;
    newInput.value = '';
    addBox.classList.add('hidden');
    renderAll();
    toast('已添加行业：' + name);
  }

  addBtn.addEventListener('click', toggleAdd);
  cancelAdd.addEventListener('click', toggleAdd);
  confirmAdd.addEventListener('click', commitAdd);
  newInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') commitAdd(); });
  searchInput.addEventListener('input', function () {
    query = searchInput.value;
    if (!detailView.classList.contains('hidden')) return;
    renderList();
  });

  renderAll();
})();