(function () {
  'use strict';
  var WORDS = Array.isArray(window.VOCABULARY) ? window.VOCABULARY : [];
  var PROG_KEY = 'vocab_prog_v1';
  var CFG_KEY = 'vocab_cfg_v1';
  var WRITE_KEY = 'vocab_write_v1';

  var vocabBtn = document.getElementById('vocabBtn');
  var vocabView = document.getElementById('vocabView');
  if (!vocabBtn || !vocabView || !WORDS.length) return;

  var prog = {};
  var cfg = { dailyNew: 15 };
  var writes = [];
  var curTab = 'today';
  var curReview = [];   // 本轮待复习词
  var curNew = [];      // 本轮新词
  var curIdx = 0;
  var curCard = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function today() { var d = new Date(); return Math.floor(d.getTime() / 86400000); }
  function load() {
    try { prog = JSON.parse(localStorage.getItem(PROG_KEY) || '{}'); } catch (e) { prog = {}; }
    try { var c = JSON.parse(localStorage.getItem(CFG_KEY) || '{}'); if (c && c.dailyNew) cfg.dailyNew = c.dailyNew; } catch (e) {}
    try { writes = JSON.parse(localStorage.getItem(WRITE_KEY) || '[]'); } catch (e) { writes = []; }
  }
  function saveProg() { try { localStorage.setItem(PROG_KEY, JSON.stringify(prog)); } catch (e) {} }
  function saveCfg() { try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch (e) {} }
  function saveWrites() { try { localStorage.setItem(WRITE_KEY, JSON.stringify(writes)); } catch (e) {} }

  /* ---------- SM-2 ---------- */
  function review(id, grade) {
    var p = prog[id] || { ease: 2.5, interval: 0, reps: 0, due: 0, lapses: 0, seen: 1 };
    if (grade === 0) { p.lapses++; p.reps = 0; p.interval = 1; }
    else if (grade === 1) { p.interval = p.interval === 0 ? 1 : Math.round(p.interval * 1.2); p.ease = Math.max(1.3, p.ease - 0.15); p.reps++; }
    else if (grade === 2) { p.interval = p.interval === 0 ? 1 : Math.round(p.interval * p.ease); p.reps++; }
    else { p.interval = p.interval === 0 ? 1 : Math.round(p.interval * p.ease * 1.3); p.ease = Math.min(2.8, p.ease + 0.05); p.reps++; }
    p.due = today() + p.interval;
    p.seen = 1;
    prog[id] = p; saveProg();
  }
  function dueWords() {
    var t = today();
    return WORDS.filter(function (w) { var p = prog[w.id]; return p && p.due <= t; });
  }
  function newWords() {
    var seen = {};
    Object.keys(prog).forEach(function (k) { seen[k] = true; });
    return WORDS.filter(function (w) { return !seen[w.id]; });
  }
  function knownCount() { return Object.keys(prog).length; }

  /* ---------- 视图骨架 ---------- */
  function renderShell() {
    var tabs = [
      ['today', '🗓 今日任务'], ['library', '📚 单词库'], ['dictation', '✍️ 听写'],
      ['corpus', '📖 语境阅读'], ['write', '✏️ 每日一句'], ['stats', '📈 统计']
    ];
    vocabView.innerHTML =
      '<div class="vocab-topbar">'
      + '<button id="vocabBack" class="back-btn">← 返回日报</button>'
      + '<span class="vocab-title">🔤 背单词 · 听写 · 写作</span>'
      + '<span class="vocab-topbar-spacer"></span>'
      + tabs.map(function (t) { return '<button class="vocab-tab' + (t[0] === curTab ? ' active' : '') + '" data-tab="' + t[0] + '">' + t[1] + '</button>'; }).join('')
      + '</div>'
      + '<div id="vocabBody" class="vocab-body"></div>';

    document.getElementById('vocabBack').addEventListener('click', function () {
      vocabView.classList.add('hidden');
      document.getElementById('listView').classList.remove('hidden');
    });
    Array.prototype.forEach.call(vocabView.querySelectorAll('.vocab-tab'), function (b) {
      b.addEventListener('click', function () { curTab = b.getAttribute('data-tab'); renderBody(); });
    });
    renderBody();
  }

  function renderBody() {
    var body = document.getElementById('vocabBody');
    Array.prototype.forEach.call(vocabView.querySelectorAll('.vocab-tab'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-tab') === curTab);
    });
    if (curTab === 'today') renderToday(body);
    else if (curTab === 'library') renderLibrary(body);
    else if (curTab === 'dictation') renderDictation(body);
    else if (curTab === 'corpus') renderCorpus(body);
    else if (curTab === 'write') renderWrite(body);
    else renderStats(body);
  }

  /* ---------- 今日任务 ---------- */
  function renderToday(body) {
    curReview = dueWords();
    var avail = newWords();
    curNew = avail.slice(0, cfg.dailyNew);
    var total = curReview.length + curNew.length;
    if (!total) {
      body.innerHTML = '<div class="vocab-card">'
        + '<h3>🎉 今日任务完成</h3>'
        + '<p class="vocab-muted">没有到期的复习词，新词也已背完。到「单词库」自由浏览，或把每日新词数调大。</p>'
        + '<label class="vocab-muted">每日新词数 <input id="newPerDay" type="number" min="5" max="50" value="' + cfg.dailyNew + '" style="width:70px"></label>'
        + '</div>';
      document.getElementById('newPerDay').addEventListener('change', function () {
        cfg.dailyNew = Math.max(5, Math.min(50, Number(this.value) || 15));
        saveCfg(); renderBody();
      });
      return;
    }
    var queue = curReview.concat(curNew);
    var type = curIdx < curReview.length ? '复习' : '新词';
    curCard = queue[curIdx];
    body.innerHTML = '<div class="vocab-card" id="cardBox">'
      + '<div class="vocab-progress">' + type + ' · ' + (curIdx + 1) + ' / ' + queue.length + '</div>'
      + '<div class="vocab-word" id="cardWord">' + esc(curCard.word) + '</div>'
      + (curCard.abbr ? '<div class="vocab-abbr">' + esc(curCard.abbr) + '</div>' : '')
      + '<div class="vocab-course">' + esc(curCard.course) + ' · ' + esc(curCard.context) + '</div>'
      + '<div id="cardMeaning" class="vocab-meaning hidden">'
      + '<div class="vocab-meaning-main">' + esc(curCard.meaning) + '</div>'
      + (curCard.sentence ? '<div class="vocab-sentence">📄 ' + esc(curCard.sentence) + '</div>' : '')
      + '</div>'
      + '<div class="vocab-actions">'
      + '<button id="flipBtn" class="back-btn">🔄 显示释义</button>'
      + '<span id="rateRow" class="hidden">'
      + '<button data-g="0" class="rate r0">😵 忘记</button>'
      + '<button data-g="1" class="rate r1">😐 困难</button>'
      + '<button data-g="2" class="rate r2">🙂 记得</button>'
      + '<button data-g="3" class="rate r3">🤩 轻松</button>'
      + '</span>'
      + '</div>'
      + '</div>'
      + '<div class="vocab-tts-row"><button id="sayBtn" class="back-btn">🔊 朗读</button></div>';

    document.getElementById('flipBtn').addEventListener('click', function () {
      document.getElementById('cardMeaning').classList.remove('hidden');
      document.getElementById('rateRow').classList.remove('hidden');
      this.classList.add('hidden');
    });
    document.getElementById('sayBtn').addEventListener('click', function () { say(curCard.word); });
    Array.prototype.forEach.call(body.querySelectorAll('.rate'), function (b) {
      b.addEventListener('click', function () {
        var g = Number(b.getAttribute('data-g'));
        var isReview = curIdx < curReview.length;
        review(curCard.id, g);
        if (isReview && g === 0) curReview.push(curCard); // 忘记的词本轮再来一次
        curIdx++;
        renderBody();
      });
    });
  }

  /* ---------- 单词库 ---------- */
  function renderLibrary(body) {
    var courses = {};
    WORDS.forEach(function (w) { courses[w.course] = true; });
    var opts = Object.keys(courses).map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
    body.innerHTML = '<div class="vocab-toolbar">'
      + '<label>课程 <select id="libCourse">' + opts + '</select></label>'
      + '<label>关键词 <input id="libQuery" placeholder="搜索英文/中文"></label>'
      + '</div><div id="libList" class="vocab-list"></div>';
    var courseSel = document.getElementById('libCourse');
    var qInput = document.getElementById('libQuery');
    function draw() {
      var c = courseSel.value, q = qInput.value.trim().toLowerCase();
      var list = WORDS.filter(function (w) {
        if (c && w.course !== c) return false;
        if (q && !(w.word.toLowerCase().indexOf(q) >= 0 || w.meaning.toLowerCase().indexOf(q) >= 0)) return false;
        return true;
      }).slice(0, 200);
      var html = list.map(function (w) {
        var p = prog[w.id];
        return '<div class="vocab-row">'
          + '<div class="vocab-row-head"><b>' + esc(w.word) + '</b>' + (w.abbr ? ' <span class="vocab-abbr">' + esc(w.abbr) + '</span>' : '') + ' <span class="vocab-muted">' + esc(w.meaning) + '</span>'
          + (p ? ' <span class="vocab-tag">' + p.reps + ' 次</span>' : ' <span class="vocab-tag new">未学</span>') + '</div>'
          + (w.sentence ? '<div class="vocab-sentence">📄 ' + esc(w.sentence) + '</div>' : '')
          + '<div class="vocab-muted small">' + esc(w.course) + ' · ' + esc(w.context) + '</div>'
          + '</div>';
      }).join('');
      document.getElementById('libList').innerHTML = html || '<div class="empty">没有匹配的词。</div>';
    }
    courseSel.addEventListener('change', draw);
    qInput.addEventListener('input', draw);
    draw();
  }

  /* ---------- 听写 ---------- */
  var dictPool = [], dictIdx = 0, dictWrong = 0;
  function renderDictation(body) {
    if (!dictPool.length) {
      dictPool = WORDS.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 10);
      dictIdx = 0; dictWrong = 0;
    }
    var w = dictPool[dictIdx];
    body.innerHTML = '<div class="vocab-card">'
      + '<div class="vocab-progress">听写 ' + (dictIdx + 1) + ' / ' + dictPool.length + (dictWrong ? ' · 已错 ' + dictWrong + ' 个' : '') + '</div>'
      + '<div class="vocab-muted">听发音写出英文拼写（可重复播放）</div>'
      + '<button id="dictSay" class="back-btn big">🔊 播放发音</button>'
      + '<div id="dictHint" class="vocab-muted">提示：' + esc(w.meaning) + '</div>'
      + '<input id="dictInput" class="vocab-input" placeholder="拼写这个单词…" autocomplete="off">'
      + '<div class="vocab-actions"><button id="dictCheck" class="back-btn">提交</button><button id="dictSkip" class="back-btn">跳过</button></div>'
      + '<div id="dictResult"></div>'
      + '</div>';
    document.getElementById('dictSay').addEventListener('click', function () { say(w.word); });
    document.getElementById('dictCheck').addEventListener('click', function () {
      var val = document.getElementById('dictInput').value.trim().toLowerCase();
      var ans = w.word.toLowerCase();
      var ok = val === ans;
      if (!ok) dictWrong++;
      if (!ok) review(w.id, 0); else review(w.id, 2);
      document.getElementById('dictResult').innerHTML = ok
        ? '<div class="vocab-ok">✅ 正确！ ' + esc(w.word) + '</div>'
        : '<div class="vocab-bad">❌ 正确答案：' + esc(w.word) + '</div>';
      setTimeout(function () { dictIdx++; renderBody(); }, 1400);
    });
    document.getElementById('dictSkip').addEventListener('click', function () {
      document.getElementById('dictResult').innerHTML = '<div class="vocab-muted">答案：' + esc(w.word) + '</div>';
      setTimeout(function () { dictIdx++; renderBody(); }, 1200);
    });
    setTimeout(function () { var i = document.getElementById('dictInput'); if (i) i.focus(); }, 0);
  }

  /* ---------- 语境阅读（语料 cloze） ---------- */
  function renderCorpus(body) {
    var CORPUS = window.CORPUS || [];
    var courses = {};
    CORPUS.forEach(function (c) { courses[c.course] = true; });
    var opts = Object.keys(courses).map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
    body.innerHTML = '<div class="vocab-toolbar"><label>课程 <select id="corCourse">' + opts + '</select></label>'
      + '<button id="corNew" class="back-btn">🎲 换一篇</button></div><div id="corBox"></div>';
    function draw() {
      var c = document.getElementById('corCourse').value;
      var list = CORPUS.filter(function (x) { return x.course === c; })[0];
      var src = list.sources[Math.floor(Math.random() * list.sources.length)];
      var words = src.quote.replace(/[^\w'-]/g, ' ').split(/\s+/).filter(function (w) { return w.length > 3; });
      var blank = words[Math.floor(Math.random() * words.length)];
      var text = src.quote.replace(new RegExp('\\b' + blank.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b'), '____');
      document.getElementById('corBox').innerHTML = '<div class="vocab-card">'
        + '<div class="vocab-question">🔍 ' + esc(list.questions[Math.floor(Math.random() * list.questions.length)].q) + '</div>'
        + '<p class="vocab-passage">' + esc(text) + '</p>'
        + '<input id="corInput" class="vocab-input" placeholder="填入被挖掉的单词…">'
        + '<div class="vocab-actions"><button id="corCheck" class="back-btn">提交</button></div>'
        + '<div id="corResult"></div>'
        + '<div class="vocab-muted small">来源：' + esc(src.t) + '（' + esc(src.venue) + ' ' + esc(String(src.y)) + '）<br>关联词：' + esc((src.w || []).join('、')) + '</div>'
        + '</div>';
      document.getElementById('corCheck').addEventListener('click', function () {
        var val = document.getElementById('corInput').value.trim().toLowerCase();
        var ok = val === blank.toLowerCase();
        document.getElementById('corResult').innerHTML = ok
          ? '<div class="vocab-ok">✅ 正确</div>'
          : '<div class="vocab-bad">❌ 原词：' + esc(blank) + '</div>';
      });
    }
    document.getElementById('corCourse').addEventListener('change', draw);
    document.getElementById('corNew').addEventListener('click', draw);
    draw();
  }

  /* ---------- 每日一句（仿写） ---------- */
  function renderWrite(body) {
    var withSent = WORDS.filter(function (w) { return w.sentence; });
    var w = withSent[Math.floor(Math.random() * withSent.length)];
    body.innerHTML = '<div class="vocab-card">'
      + '<div class="vocab-question">✏️ 每日一句 · 句型仿写</div>'
      + '<div class="vocab-sentence">📄 例句：' + esc(w.sentence) + '</div>'
      + '<div class="vocab-muted">词：' + esc(w.word) + '（' + esc(w.meaning) + '）· ' + esc(w.context) + '</div>'
      + '<div class="vocab-muted">仿写一句，保留句型结构、替换内容（比如换成你的课程场景）。</div>'
      + '<textarea id="writeInput" class="vocab-textarea" placeholder="My sentence: …"></textarea>'
      + '<div class="vocab-actions"><button id="writeSave" class="back-btn">💾 保存</button></div>'
      + '<div id="writeList"></div>'
      + '</div>';
    function drawList() {
      document.getElementById('writeList').innerHTML = '<h4>我的仿写记录（' + writes.length + '）</h4>'
        + writes.slice(-20).map(function (x) { return '<div class="vocab-row"><div class="vocab-muted">' + esc(x.pattern) + '</div><div>' + esc(x.text) + '</div></div>'; }).join('');
    }
    document.getElementById('writeSave').addEventListener('click', function () {
      var t = document.getElementById('writeInput').value.trim();
      if (!t) return;
      writes.push({ pattern: w.word, text: t });
      saveWrites();
      document.getElementById('writeInput').value = '';
      drawList();
    });
    drawList();
  }

  /* ---------- 统计 ---------- */
  function renderStats(body) {
    var known = knownCount(), total = WORDS.length;
    var withSent = WORDS.filter(function (w) { return w.sentence; }).length;
    var lapsed = 0, repsSum = 0;
    Object.keys(prog).forEach(function (k) { lapsed += prog[k].lapses || 0; repsSum += prog[k].reps || 0; });
    body.innerHTML = '<div class="vocab-card">'
      + '<h3>📈 学习统计</h3>'
      + '<div class="vocab-stats">'
      + '<div><b>' + known + '</b><br>已学词</div>'
      + '<div><b>' + total + '</b><br>词库总量</div>'
      + '<div><b>' + withSent + '</b><br>带例句</div>'
      + '<div><b>' + repsSum + '</b><br>累计复习</div>'
      + '<div><b>' + lapsed + '</b><br>遗忘次数</div>'
      + '</div>'
      + '<div class="vocab-progress-bar"><div style="width:' + Math.round(known / total * 100) + '%"></div></div>'
      + '<p class="vocab-muted">已学进度 ' + Math.round(known / total * 100) + '%（按 SM-2 记忆曲线自动安排复习）</p>'
      + '<p class="vocab-muted">我的仿写：' + writes.length + ' 句</p>'
      + '</div>';
  }

  /* ---------- TTS ---------- */
  function say(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function hideAll() {
    ['listView', 'detailView', 'treeView', 'notesView', 'noteReader', 'tasksView', 'libraryView', 'libraryReader', 'aiView', 'vocabView']
      .forEach(function (id) { var el = document.getElementById(id); if (el) el.classList.add('hidden'); });
  }

  load();
  renderShell();
  vocabBtn.addEventListener('click', function () {
    hideAll();
    vocabView.classList.remove('hidden');
    renderShell();
  });
})();