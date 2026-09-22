(function () {
  'use strict';
  var BOOKS = Array.isArray(window.LIBRARY_BOOKS) ? window.LIBRARY_BOOKS : [];

  var libraryBtn = document.getElementById('libraryBtn');
  var libraryBack = document.getElementById('libraryBack');
  var libraryView = document.getElementById('libraryView');
  var libraryList = document.getElementById('libraryList');
  var libraryReader = document.getElementById('libraryReader');
  var listView = document.getElementById('listView');
  var detailView = document.getElementById('detailView');
  var treeView = document.getElementById('treeView');
  var notesView = document.getElementById('notesView');
  var noteReader = document.getElementById('noteReader');
  var tasksView = document.getElementById('tasksView');
  if (!libraryBtn || !libraryView) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escAttr(s) { return esc(s).replace(/'/g, '&#39;'); }

  function hideAll() {
    [listView, detailView, treeView, notesView, noteReader, tasksView, libraryView, libraryReader]
      .forEach(function (v) { if (v) v.classList.add('hidden'); });
  }

  function findBook(id) {
    for (var i = 0; i < BOOKS.length; i++) { if (BOOKS[i].id === id) return BOOKS[i]; }
    return null;
  }

  function coverHtml(b) {
    var g = b.glyph || '📕';
    var a = b.accent || '#d4a574';
    return '<div class="book-cover" style="--accent:' + escAttr(a) + '">'
      + '<span class="book-spine"></span>'
      + '<span class="book-glyph">' + esc(g) + '</span>'
      + '<span class="book-cover-title">' + esc(b.title) + '</span>'
      + '<span class="book-cover-edition">' + esc(b.edition || '') + '</span>'
      + '</div>';
  }

  function actionsHtml(b) {
    var html = '';
    html += '<a class="book-action primary" href="' + escAttr(b.readUrl || '#') + '" target="_blank" rel="noopener">🌐 官方在线</a>';
    if (b.localPdf) {
      html += '<button class="book-action" data-act="read" data-id="' + escAttr(b.id) + '">📖 站内阅读</button>';
      html += '<a class="book-action" href="' + escAttr(b.downloadUrl || b.localPdf) + '" download>' + (b.size ? '⤓ 下载 PDF · ' + esc(b.size) : '⤓ 下载 PDF') + '</a>';
    } else {
      html += '<a class="book-action" href="' + escAttr(b.downloadUrl || '#') + '" target="_blank" rel="noopener">⤓ 官方仓库</a>';
    }
    return html;
  }

  function cardHtml(b) {
    return '<article class="book-card">'
      + coverHtml(b)
      + '<div class="book-body">'
      + '<div class="book-category">' + esc(b.category || '书籍') + '</div>'
      + '<h3 class="book-title">' + esc(b.title) + '<span class="book-edition">' + esc(b.edition || '') + '</span></h3>'
      + '<div class="book-author">' + esc(b.author || '') + (b.org ? ' · ' + esc(b.org) : '') + '</div>'
      + '<p class="book-desc">' + esc(b.desc || '') + '</p>'
      + '<div class="book-tags">' + (b.tags || []).map(function (t) { return '<span class="book-tag">' + esc(t) + '</span>'; }).join('') + '</div>'
      + '<div class="book-actions">' + actionsHtml(b) + '</div>'
      + '</div>'
      + '</article>';
  }

  function renderList() {
    if (!BOOKS.length) {
      libraryList.innerHTML = '<div class="empty">图书馆暂无藏书。</div>';
      return;
    }
    libraryList.innerHTML = BOOKS.map(cardHtml).join('');
    Array.prototype.forEach.call(libraryList.querySelectorAll('[data-act="read"]'), function (btn) {
      btn.addEventListener('click', function () {
        var b = findBook(btn.getAttribute('data-id'));
        if (b) openReader(b);
      });
    });
  }

  function openReader(b) {
    hideAll();
    libraryReader.classList.remove('hidden');
    var head = '<div class="library-reader-top">'
      + '<button id="libReaderBack" class="back-btn">← 返回图书馆</button>'
      + '<span class="library-reader-title">📖 ' + esc(b.title) + (b.edition ? ' · ' + esc(b.edition) : '') + '</span>'
      + '<span class="library-reader-spacer"></span>'
      + '<a class="back-btn" href="' + escAttr(b.localPdf) + '" target="_blank" rel="noopener">↗ 新窗口打开</a>'
      + '<a class="back-btn" href="' + escAttr(b.downloadUrl || b.localPdf) + '" download>⤓ 下载</a>'
      + '</div>'
      + '<div class="library-reader-frame"><iframe src="' + escAttr(b.localPdf) + '" title="' + escAttr(b.title) + '"></iframe></div>';
    libraryReader.innerHTML = head;
    document.getElementById('libReaderBack').addEventListener('click', function () {
      hideAll();
      libraryView.classList.remove('hidden');
    });
  }

  libraryBtn.addEventListener('click', function () {
    hideAll();
    libraryView.classList.remove('hidden');
    renderList();
  });
  libraryBack.addEventListener('click', function () {
    hideAll();
    listView.classList.remove('hidden');
  });

  renderList();
})();
