(function () {
  'use strict';
  var TASKS = Array.isArray(window.TASKS) ? window.TASKS : [];
  if (!TASKS.length) return;
  var DONE_KEY = 'tasks_done_v1';
  var COLORS = {
    'AMA1110': '#d4a574', 'EIE1005': '#c38d94', 'ME29004': '#81b29a',
    'AP10005': '#9d91c4', 'LEI1101': '#c95f8d', 'IT 安全': '#8fa6bd'
  };
  var tasksBtn = document.getElementById('tasksBtn');
  var tasksBack = document.getElementById('tasksBack');
  var tasksReset = document.getElementById('tasksReset');
  var tasksView = document.getElementById('tasksView');
  var tasksCal = document.getElementById('tasksCal');
  var tasksList = document.getElementById('tasksList');
  var tasksProgress = document.getElementById('tasksProgress');
  var listView = document.getElementById('listView');
  var detailView = document.getElementById('detailView');
  var treeView = document.getElementById('treeView');
  var notesView = document.getElementById('notesView');
  var noteReader = document.getElementById('noteReader');
  if (!tasksView) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function getDone() { try { return JSON.parse(localStorage.getItem(DONE_KEY) || '[]'); } catch (e) { return []; } }
  function setDone(a) { localStorage.setItem(DONE_KEY, JSON.stringify(a)); }
  function colorOf(c) { return COLORS[c] || '#d4a574'; }

  function renderCalendar() {
    var dated = TASKS.filter(function (t) { return t.date; });
    var byDay = {};
    dated.forEach(function (t) { (byDay[t.date] = byDay[t.date] || []).push(t); });
    var months = [
      { y: 2026, m: 8, label: '2026年9月' },
      { y: 2026, m: 9, label: '2026年10月' },
      { y: 2026, m: 10, label: '2026年11月' },
      { y: 2026, m: 11, label: '2026年12月' }
    ];
    var html = '';
    months.forEach(function (mo) {
      var first = new Date(mo.y, mo.m, 1);
      var start = (first.getDay() + 6) % 7; // 周一为一周开始
      var days = new Date(mo.y, mo.m + 1, 0).getDate();
      var cells = '';
      for (var i = 0; i < start; i++) cells += '<div class="cal-cell empty"></div>';
      for (var d = 1; d <= days; d++) {
        var key = mo.y + '-' + ('0' + (mo.m + 1)).slice(-2) + '-' + ('0' + d).slice(-2);
        var evs = byDay[key] || [];
        var chips = evs.map(function (t) {
          return '<div class="cal-chip" style="--cc:' + colorOf(t.course) + '" title="' + esc(t.course + ' · ' + t.title) + '">' + esc(t.title.length > 12 ? t.title.slice(0, 12) + '…' : t.title) + '</div>';
        }).join('');
        var cls = 'cal-cell' + (evs.length ? ' has-ev' : '');
        cells += '<div class="' + cls + '"><span class="cal-day">' + d + '</span>' + chips + '</div>';
      }
      html += '<div class="cal-month"><div class="cal-month-title">' + mo.label + '</div><div class="cal-grid">' +
        '<div class="cal-dow">一</div><div class="cal-dow">二</div><div class="cal-dow">三</div><div class="cal-dow">四</div><div class="cal-dow">五</div><div class="cal-dow">六</div><div class="cal-dow">日</div>' +
        cells + '</div></div>';
    });
    tasksCal.innerHTML = html;
  }

  function renderList() {
    var done = getDone();
    var dated = TASKS.filter(function (t) { return t.date; }).sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    var tbd = TASKS.filter(function (t) { return !t.date; });
    var groups = {};
    dated.forEach(function (t) { (groups[t.date] = groups[t.date] || []).push(t); });
    var html = '<h3 class="tl-head">按日期</h3>';
    Object.keys(groups).sort().forEach(function (key) {
      groups[key].forEach(function (t) { html += rowHtml(t, done); });
    });
    if (tbd.length) {
      html += '<h3 class="tl-head">日期待定 / 自定进度</h3>';
      tbd.forEach(function (t) { html += rowHtml(t, done); });
    }
    tasksList.innerHTML = html;
    Array.prototype.forEach.call(tasksList.querySelectorAll('.task-check'), function (box) {
      box.addEventListener('change', function () {
        var id = box.getAttribute('data-id');
        var d = getDone();
        if (box.checked) { if (d.indexOf(id) === -1) d.push(id); }
        else { d = d.filter(function (x) { return x !== id; }); }
        setDone(d);
        refresh();
      });
    });
  }
  function rowHtml(t, done) {
    var checked = done.indexOf(t.id) !== -1;
    return '<label class="task-row' + (checked ? ' done' : '') + '" data-id="' + esc(t.id) + '">' +
      '<input type="checkbox" class="task-check" data-id="' + esc(t.id) + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="task-date">' + esc(t.dateLabel || '') + '</span>' +
      '<span class="task-course" style="color:' + colorOf(t.course) + '">' + esc(t.course) + '</span>' +
      '<span class="task-title">' + esc(t.title) + '</span>' +
      '<span class="task-meta">' + esc(t.type || '') + ' · ' + esc(t.weight || '') + (t.time ? ' · ' + esc(t.time) : '') + '</span>' +
      (t.note ? '<span class="task-note">' + esc(t.note) + '</span>' : '') +
      '</label>';
  }
  function refresh() {
    renderCalendar();
    renderList();
    var done = getDone();
    var total = TASKS.length;
    var n = TASKS.filter(function (t) { return done.indexOf(t.id) !== -1; }).length;
    var pct = total ? Math.round(n / total * 100) : 0;
    tasksProgress.innerHTML = '已完成 <b>' + n + '</b> / ' + total + ' 项（' + pct + '%）' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>';
  }

  tasksBtn.addEventListener('click', function () {
    [listView, detailView, treeView, notesView, noteReader].forEach(function (v) { if (v) v.classList.add('hidden'); });
    tasksView.classList.remove('hidden');
    refresh();
  });
  tasksBack.addEventListener('click', function () {
    tasksView.classList.add('hidden');
    listView.classList.remove('hidden');
  });
  tasksReset.addEventListener('click', function () {
    setDone([]);
    refresh();
  });
  refresh();
})();
