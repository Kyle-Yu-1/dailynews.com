(function () {
  'use strict';
  var BOOKS = Array.isArray(window.LIBRARY_BOOKS) ? window.LIBRARY_BOOKS : [];
  var NOTE_PREFIX = 'library_note_';

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

  /* 当前正在阅读的书与笔记编辑框（供"离开时自动保存"使用） */
  var currentBook = null;
  var currentNoteArea = null;
  var saveTimer = null;
  var noteStatus = null;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escAttr(s) { return esc(s).replace(/'/g, '&#39;'); }

  function hideAll() {
    var aiView = document.getElementById('aiView');
    [listView, detailView, treeView, notesView, noteReader, tasksView, libraryView, libraryReader, aiView]
      .forEach(function (v) { if (v) v.classList.add('hidden'); });
  }

  function findBook(id) {
    for (var i = 0; i < BOOKS.length; i++) { if (BOOKS[i].id === id) return BOOKS[i]; }
    return null;
  }

  /* ---------- 卡片：只浏览 + 本地下载 ---------- */
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

  function cardHtml(b) {
    var actions = '';
    actions += '<button class="book-action primary" data-act="read" data-id="' + escAttr(b.id) + '">📖 站内浏览</button>';
    actions += '<a class="book-action" href="' + escAttr(b.localPdf) + '" download>⤓ 本地下载' + (b.size ? ' · ' + esc(b.size) : '') + '</a>';
    return '<article class="book-card">'
      + coverHtml(b)
      + '<div class="book-body">'
      + '<div class="book-category">' + esc(b.category || '书籍') + '</div>'
      + '<h3 class="book-title">' + esc(b.title) + '<span class="book-edition">' + esc(b.edition || '') + '</span></h3>'
      + '<div class="book-author">' + esc(b.author || '') + (b.org ? ' · ' + esc(b.org) : '') + '</div>'
      + '<p class="book-desc">' + esc(b.desc || '') + '</p>'
      + '<div class="book-tags">' + (b.tags || []).map(function (t) { return '<span class="book-tag">' + esc(t) + '</span>'; }).join('') + '</div>'
      + '<div class="book-actions">' + actions + '</div>'
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

  /* ---------- 笔记：自动保存 + 手动保存 ---------- */
  function noteKey(b) { return NOTE_PREFIX + b.id; }

  function loadNote(b) {
    try { return localStorage.getItem(noteKey(b)) || ''; } catch (e) { return ''; }
  }

  /* 立即写入 localStorage（任意时刻退出前调用都可保证不丢） */
  function saveNoteNow(manual) {
    if (!currentBook || !currentNoteArea) return;
    try { localStorage.setItem(noteKey(currentBook), currentNoteArea.value); } catch (e) {}
    if (noteStatus) {
      var t = new Date();
      var hh = ('0' + t.getHours()).slice(-2);
      var mm = ('0' + t.getMinutes()).slice(-2);
      var ss = ('0' + t.getSeconds()).slice(-2);
      noteStatus.textContent = '已保存 ' + hh + ':' + mm + ':' + ss + ' · 笔记只存在你的浏览器本地';
      noteStatus.className = 'library-note-status saved';
    }
    if (manual && window.showToast) window.showToast('笔记已保存');
  }

  /* 输入后短暂停顿即自动保存 */
  function scheduleSave() {
    clearTimeout(saveTimer);
    if (noteStatus) { noteStatus.textContent = '正在输入…'; noteStatus.className = 'library-note-status'; }
    saveTimer = setTimeout(function () { saveNoteNow(false); }, 500);
  }

  function openReader(b) {
    currentBook = b;
    hideAll();
    libraryReader.classList.remove('hidden');

    var saved = loadNote(b);
    libraryReader.innerHTML =
      '<div class="library-reader-top">'
      + '<button id="libReaderBack" class="back-btn">← 返回图书馆</button>'
      + '<span class="library-reader-title">📖 ' + esc(b.title) + (b.edition ? ' · ' + esc(b.edition) : '') + '</span>'
      + '<span class="library-reader-spacer"></span>'
      + '<button id="libNoteSave" class="back-btn">💾 保存笔记</button>'
      + '<a class="back-btn" href="' + escAttr(b.localPdf) + '" target="_blank" rel="noopener">↗ 新窗口</a>'
      + '</div>'
      + '<div class="library-reader-main">'
      + '<div class="library-reader-frame"><iframe src="' + escAttr(b.localPdf) + '" title="' + escAttr(b.title) + '"></iframe></div>'
      + '<aside class="library-note-panel">'
      + '<div class="library-note-head">📝 我的笔记</div>'
      + '<p class="library-note-hint">在这里写的笔记会自动保存在本机浏览器；离开本页、返回图书馆或切换到其它功能都不会丢失。也可点上方「💾 保存笔记」手动保存。若先「本地下载」，还能用你自己电脑上的工具标注 PDF。</p>'
      + '<textarea id="libraryNoteArea" placeholder="写笔记、摘抄、做标注…"></textarea>'
      + '<div class="library-note-status" id="libraryNoteStatus">已加载本地笔记</div>'
      + '</aside>'
      + '</div>';

    currentNoteArea = document.getElementById('libraryNoteArea');
    noteStatus = document.getElementById('libraryNoteStatus');
    currentNoteArea.value = saved;

    document.getElementById('libReaderBack').addEventListener('click', function () {
      saveNoteNow(true);
      currentBook = null; currentNoteArea = null; noteStatus = null;
      hideAll();
      libraryView.classList.remove('hidden');
    });
    document.getElementById('libNoteSave').addEventListener('click', function () {
      saveNoteNow(true);
    });
    currentNoteArea.addEventListener('input', scheduleSave);
  }

  /* 页面关闭/刷新前兜底保存 */
  window.addEventListener('beforeunload', function () {
    saveNoteNow(false);
  });
  /* 任意隐藏阅读器的路径都先落盘 */
  function safeHideOthers() {
    saveNoteNow(false);
  }

  /* ---------- 入口与返回 ---------- */
  libraryBtn.addEventListener('click', function () {
    safeHideOthers();
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