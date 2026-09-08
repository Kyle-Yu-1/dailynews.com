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
  function once(name, fn) {
    if (!libPromises[name]) libPromises[name] = fn();
    return libPromises[name];
  }
  function loadMarked() {
    return once('marked', function () { return loadScript('https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js'); });
  }
  function loadKaTeX() {
    return once('katex', function () {
      if (!document.getElementById('katexCss')) {
        var l = document.createElement('link');
        l.id = 'katexCss'; l.rel = 'stylesheet';
        l.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css';
        document.head.appendChild(l);
      }
      return loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js')
        .then(function () { return loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js'); });
    });
  }
  function loadMermaid() {
    return once('mermaid', function () {
      return loadScript('https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js');
    });
  }

  function hideAll() {
    [listView, detailView, treeView, notesView, noteReader].forEach(function (v) {
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

  function openNote(file, title) {
    hideAll();
    noteReader.classList.remove('hidden');
    noteReader.innerHTML = '<button id="noteBackBtn" class="back-btn">← 返回笔记列表</button>'
      + '<article class="markdown-body note-body"><div class="note-loading">正在打开笔记…</div></article>';
    document.getElementById('noteBackBtn').addEventListener('click', function () {
      hideAll();
      notesView.classList.remove('hidden');
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