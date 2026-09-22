(function () {
  'use strict';

  var notesBtn = document.getElementById('notesBtn');
  var notesView = document.getElementById('notesView');
  var noteReader = document.getElementById('noteReader');
  var notesList = document.getElementById('notesList');
  var notesBack = document.getElementById('notesBack');
  var listView = document.getElementById('listView');
  var detailView = document.getElementById('detailView');
  var treeView = document.getElementById('treeView');

  var NOTES = [];
  var listLoaded = false;
  var libPromises = {};

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  function loadScriptChain(urls) {
    var i = 0;
    return new Promise(function (res, rej) {
      (function next() {
        if (i >= urls.length) { rej(new Error('all sources failed')); return; }
        loadScript(urls[i]).then(res, function () { i += 1; next(); });
      })();
    });
  }
  function once(name, fn) {
    if (!libPromises[name]) libPromises[name] = fn();
    return libPromises[name];
  }
  function loadMarked() {
    return once('marked', function () {
      if (window.marked) { return Promise.resolve(); }
      return loadScriptChain(['vendor/marked.min.js', 'https://registry.npmmirror.com/marked/12.0.2/files/marked.min.js']);
    });
  }
  function loadKaTeX() {
    return once('katex', function () {
      if (!document.getElementById('katexCss')) {
        var l = document.createElement('link');
        l.id = 'katexCss'; l.rel = 'stylesheet';
        l.href = 'https://registry.npmmirror.com/katex/0.16.10/files/dist/katex.min.css';
        document.head.appendChild(l);
      }
      return loadScriptChain(['https://registry.npmmirror.com/katex/0.16.10/files/dist/katex.min.js', 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js'])
        .then(function () { return loadScriptChain(['https://registry.npmmirror.com/katex/0.16.10/files/dist/contrib/auto-render.min.js', 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js']); });
    });
  }
  function loadMermaid() {
    return once('mermaid', function () {
      return loadScriptChain(['https://registry.npmmirror.com/mermaid/10.9.1/files/dist/mermaid.min.js', 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js']);
    });
  }

  function hideAll() {
    [listView, detailView, treeView, notesView, noteReader, document.getElementById('tasksView'), document.getElementById('libraryView'), document.getElementById('libraryReader'), document.getElementById('aiView')].forEach(function (v) {
      if (v) v.classList.add('hidden');
    });
  }

  function renderList() {
    var byCourse = {};
    NOTES.forEach(function (n) {
      var c = (n.course || '其他笔记').trim();
      (byCourse[c] = byCourse[c] || []).push(n);
    });
    var html = Object.keys(byCourse).map(function (course) {
      var cards = byCourse[course].map(function (n) {
        return '<div class="note-card" data-file="' + esc(n.file) + '">'
          + '<h3 class="note-card-title">' + esc(n.title) + '</h3>'
          + '<p class="note-card-desc">' + esc(n.desc) + '</p>'
          + '</div>';
      }).join('');
      return '<div class="notes-course">' + esc(course) + '<small>' + byCourse[course].length + ' 篇笔记</small></div>' + cards;
    }).join('');
    notesList.innerHTML = html || '<div class="empty">笔记加载失败,请刷新重试。</div>';
    Array.prototype.forEach.call(notesList.querySelectorAll('.note-card'), function (card) {
      card.addEventListener('click', function () {
        var file = card.getAttribute('data-file');
        var title = card.querySelector('.note-card-title').textContent;
        openNote(file, title);
      });
    });
  }

  function loadList() {
    return fetch('notes/index.json')
      .then(function (r) { if (!r.ok) throw new Error('bad status'); return r.json(); })
      .then(function (data) {
        NOTES = Array.isArray(data) ? data : [];
        listLoaded = true;
        renderList();
      })
      .catch(function () {
        notesList.innerHTML = '<div class="empty">笔记索引加载失败,请刷新重试。</div>';
      });
  }

  var currentFile = null, currentTitle = '';
  function openNote(file, title) {
    hideAll();
    noteReader.classList.remove('hidden');
    currentFile = file;
    currentTitle = title;
    noteReader.innerHTML = '<div class="note-toolbar">'
      + '<button id="noteBackBtn" class="back-btn">← 返回笔记列表</button>'
      + '<span class="note-title-inline">' + esc(title) + '</span>'
      + '<span class="note-toolbar-spacer"></span>'
      + '<button id="noteEditBtn" class="back-btn">✏️ 编辑</button>'
      + '<button id="noteSaveBtn" class="back-btn hidden">💾 保存</button>'
      + '<button id="noteResetBtn" class="back-btn hidden">↺ 还原</button>'
      + '<button id="noteExportBtn" class="back-btn">⤓ 导出</button>'
      + '</div>'
      + '<article class="markdown-body note-body"><div class="note-loading">正在打开笔记…</div></article>';
    document.getElementById('noteBackBtn').addEventListener('click', function () {
      hideAll();
      notesView.classList.remove('hidden');
    });
    var editBtn = document.getElementById('noteEditBtn');
    var saveBtn = document.getElementById('noteSaveBtn');
    var resetBtn = document.getElementById('noteResetBtn');
    var body = noteReader.querySelector('.note-body');
    editBtn.addEventListener('click', function () {
      body.setAttribute('contenteditable', 'true');
      body.classList.add('editing');
      editBtn.classList.add('hidden');
      saveBtn.classList.remove('hidden');
      resetBtn.classList.remove('hidden');
      body.focus();
    });
    saveBtn.addEventListener('click', function () {
      try { localStorage.setItem('note_edit_' + file, body.innerHTML); } catch (e) {}
      body.removeAttribute('contenteditable');
      body.classList.remove('editing');
      editBtn.classList.remove('hidden');
      saveBtn.classList.add('hidden');
      resetBtn.classList.add('hidden');
      saveBtn.textContent = '已保存 ✓';
      setTimeout(function () { saveBtn.textContent = '💾 保存'; }, 1500);
    });
    resetBtn.addEventListener('click', function () {
      try { localStorage.removeItem('note_edit_' + file); } catch (e) {}
      openNote(file, title);
    });
    document.getElementById('noteExportBtn').addEventListener('click', function () {
      var html = '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>' + esc(title) + '</title></head><body style="max-width:860px;margin:24px auto;font-family:Georgia,\"Noto Serif SC\",serif;line-height:1.8">' + body.innerHTML + '</body></html>';
      var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = (title || 'note') + '.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    });
    fetch('notes/' + file)
      .then(function (r) { if (!r.ok) throw new Error('bad status'); return r.text(); })
      .then(function (md) { return renderNote(md); })
      .catch(function () {
        document.querySelector('.note-body').innerHTML = '<div class="empty">笔记打开失败,请刷新重试。</div>';
      });
  }

  function renderNote(md) {
    var body = document.querySelector('.note-body');
    return loadMarked().then(function () {
      var html = window.marked.parse(md);
      body.innerHTML = html;
      Array.prototype.forEach.call(body.querySelectorAll('a'), function (a) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); });
      try {
        var saved = localStorage.getItem('note_edit_' + currentFile);
        if (saved) { body.innerHTML = saved; }
      } catch (e) {}
      // mermaid 代码块 → 图表
      var blocks = body.querySelectorAll('pre code.language-mermaid');
      var hasMermaid = blocks.length > 0;
      Array.prototype.forEach.call(blocks, function (code) {
        var holder = document.createElement('div');
        holder.className = 'mermaid';
        holder.textContent = code.textContent;
        code.parentNode.parentNode.replaceChild(holder, code.parentNode);
      });
      if (hasMermaid) {
        loadMermaid().then(function () {
          try {
            window.mermaid.initialize({ startOnLoad: false, theme: 'base', securityLevel: 'loose' });
            window.mermaid.run({ nodes: body.querySelectorAll('.mermaid'), suppressErrors: true }).catch(function () {});
          } catch (e) {}
        }).catch(function () {});
      }
      // KaTeX 数学公式
      loadKaTeX().then(function () {
        try {
          window.renderMathInElement(body, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {}
      }).catch(function () {});
    }).catch(function () {
      body.innerHTML = '<pre class="note-plain">' + esc(md) + '</pre>';
    });
  }

  notesBtn.addEventListener('click', function () {
    hideAll();
    notesView.classList.remove('hidden');
    if (!listLoaded) loadList();
  });
  notesBack.addEventListener('click', function () {
    hideAll();
    listView.classList.remove('hidden');
  });
})();