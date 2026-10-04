(function () {
  'use strict';
  var COURSES = Array.isArray(window.ONLINE_COURSES) ? window.ONLINE_COURSES : [];

  var coursesBtn = document.getElementById('coursesBtn');
  var coursesBack = document.getElementById('coursesBack');
  var coursesView = document.getElementById('coursesView');
  var coursesList = document.getElementById('coursesList');
  if (!coursesBtn || !coursesView) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escAttr(s) { return esc(s).replace(/'/g, '&#39;'); }

  function coverHtml(c) {
    var g = c.glyph || '🎓';
    var a = c.accent || '#d4a574';
    return '<div class="book-cover" style="--accent:' + escAttr(a) + '">'
      + '<span class="book-spine"></span>'
      + '<span class="book-glyph">' + esc(g) + '</span>'
      + '<span class="book-cover-title">' + esc(c.title) + '</span>'
      + '<span class="book-cover-edition">' + esc(c.edition || '') + '</span>'
      + '</div>';
  }

  function cardHtml(c) {
    var status = c.status ? '<span class="book-tag">📌 ' + esc(c.status) + '</span>' : '';
    return '<article class="book-card">'
      + coverHtml(c)
      + '<div class="book-body">'
      + '<div class="book-category">' + esc(c.category || '课程') + '</div>'
      + '<h3 class="book-title">' + esc(c.title) + '<span class="book-edition">' + esc(c.edition || '') + '</span></h3>'
      + '<div class="book-author">' + esc(c.author || '') + (c.org ? ' · ' + esc(c.org) : '') + '</div>'
      + '<p class="book-desc">' + esc(c.desc || '') + '</p>'
      + '<div class="book-tags">' + (c.tags || []).map(function (t) { return '<span class="book-tag">' + esc(t) + '</span>'; }).join('') + status + '</div>'
      + '<div class="book-actions"><a class="book-action primary" href="' + escAttr(c.link || '#') + '" target="_blank" rel="noopener">' + esc(c.linkLabel || '🌐 去上课') + '</a></div>'
      + '</div>'
      + '</article>';
  }

  function render() {
    coursesList.innerHTML = COURSES.length
      ? COURSES.map(cardHtml).join('')
      : '<div class="empty">暂无课程。</div>';
  }

  function hideAll() {
    ['listView', 'detailView', 'treeView', 'notesView', 'noteReader', 'tasksView', 'libraryView', 'libraryReader', 'aiView', 'vocabView', 'coursesView']
      .forEach(function (id) { var el = document.getElementById(id); if (el) el.classList.add('hidden'); });
  }

  coursesBtn.addEventListener('click', function () {
    hideAll();
    coursesView.classList.remove('hidden');
    render();
  });
  if (coursesBack) {
    coursesBack.addEventListener('click', function () {
      coursesView.classList.add('hidden');
      var lv = document.getElementById('listView');
      if (lv) lv.classList.remove('hidden');
    });
  }
  render();
})();