(function () {
  'use strict';
  var TREE = window.TECH_TREE;
  var FAV_KEY = 'tree_favs_v1';
  if (!TREE || !TREE.nodes) return;

  var viewport = document.getElementById('treeViewport');
  var world = document.getElementById('treeWorld');
  var svg = document.getElementById('treeSvg');
  var nodeLayer = document.getElementById('treeNodes');
  var quickbar = document.getElementById('treeQuickbar');
  var modal = document.getElementById('nodeModal');
  var modalBody = document.getElementById('nodeModalBody');
  if (!viewport || !world || !svg || !nodeLayer) return;

  var X_GAP = 244, PAD = 170, TOP = 56, BOTTOM = 150, AXIS_W = 78;
  var yStep = 118, YSTEP_MIN = 34, YSTEP_MAX = 720;
  var Y_MIN = 2016, Y_MAX = 2026;
  var rm = String(TREE.range || '').match(/(\d{4})[^\d]*(\d{4})/);
  if (rm) { Y_MIN = parseInt(rm[1], 10); Y_MAX = parseInt(rm[2], 10); }

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function yearOf(n) { var m = String(n.year || '').match(/\d{4}/); return m ? parseInt(m[0], 10) : null; }
  function yearY(id) {
    if (id === TREE.root) return TOP;
    var y = yearOf(TREE.nodes[id]);
    if (y == null) return TOP;
    return TOP + (y - Y_MIN) * yStep;
  }

  /* ---- 布局（只依赖年份间距 yStep，字号不参与缩放） ---- */
  var meta = {}, leafCount = 0, nodeEls = {};
  function dfs(id, branch) {
    var n = TREE.nodes[id];
    if (!n) return;
    var m = meta[id] = meta[id] || {};
    m.branch = branch || '';
    m.y = yearY(id);
    var ch = n.children || [];
    if (!ch.length) {
      m.x = leafCount * X_GAP + PAD;
      leafCount += 1;
    } else {
      var xs = [];
      ch.forEach(function (c, ci) {
        if (id === TREE.root && ci > 0) { leafCount += 0.7; }
        dfs(c, id === TREE.root ? c : branch);
        xs.push(meta[c].x);
      });
      m.x = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
    }
  }
  function layout() { meta = {}; leafCount = 0; dfs(TREE.root, ''); }
  function cw() { return leafCount * X_GAP + PAD + AXIS_W; }
  function chh() { return TOP + (Y_MAX - Y_MIN) * yStep + BOTTOM; }

  var axis = document.createElement('div');
  axis.className = 'tree-axis';
  world.appendChild(axis);

  function rebuild() {
    layout();
    var w = cw(), h = chh();
    world.style.width = w + 'px';
    world.style.height = h + 'px';
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.width = w + 'px';
    svg.style.height = h + 'px';

    var guides = [];
    for (var yg = Y_MIN; yg <= Y_MAX; yg++) {
      var gy = TOP + (yg - Y_MIN) * yStep;
      guides.push('<line class="year-guide" x1="' + (PAD - 70) + '" x2="' + (w - AXIS_W - 6) + '" y1="' + gy + '" y2="' + gy + '"/>');
    }
    var lines = [];
    Object.keys(TREE.nodes).forEach(function (id) {
      var n = TREE.nodes[id];
      (n.children || []).forEach(function (cid) {
        var a = meta[id], b = meta[cid];
        lines.push('<path class="tree-line" data-branch="' + (meta[cid].branch || '') + '" d="M ' + a.x + ' ' + a.y +
          ' C ' + a.x + ' ' + ((a.y + b.y) / 2) + ', ' + b.x + ' ' + ((a.y + b.y) / 2) + ', ' + b.x + ' ' + b.y + '"/>');
      });
    });
    svg.innerHTML = guides.join('') + lines.join('');

    Object.keys(TREE.nodes).forEach(function (id) {
      var m = meta[id];
      var el = nodeEls[id];
      if (!el) {
        var n = TREE.nodes[id];
        el = document.createElement('div');
        el.className = 'tree-node' + (id === TREE.root ? ' tree-root' : '') + (n.children && n.children.length ? ' tree-branch' : '');
        el.setAttribute('data-branch', m.branch || '');
        el.innerHTML = '<span class="tn-dot"></span><span class="tn-name">' + esc(n.name) + '</span><span class="tn-year">' + esc(n.year) + '</span>';
        el.addEventListener('click', function () { openNode(id); });
        nodeLayer.appendChild(el);
        nodeEls[id] = el;
      }
      el.style.left = m.x + 'px';
      el.style.top = m.y + 'px';
    });

    axis.style.left = (w - AXIS_W) + 'px';
    var ticks = '';
    for (var ya = Y_MIN; ya <= Y_MAX; ya++) {
      var ty = (ya - Y_MIN) * yStep;
      ticks += '<div class="axis-tick" style="top:' + ty + 'px"><span class="axis-dot"></span><span class="axis-label">' + ya + '</span></div>';
    }
    axis.innerHTML = ticks;
  }

  /* ---- 视口：固定 1:1（字体不变）；滚轮调年份间距；拖拽平移 + 惯性（方案 A） ---- */
  var view = { x: 0, y: 0 }, vx = 0, vy = 0;
  function apply() { world.style.transform = 'translate(' + view.x + 'px,' + view.y + 'px)'; }
  function bounds() {
    var vw = viewport.clientWidth, vh = viewport.clientHeight;
    return { x0: Math.min(0, vw - cw()), x1: Math.max(0, vw - cw()), y0: Math.min(0, vh - chh()), y1: Math.max(0, vh - chh()) };
  }
  function clampView() {
    var b = bounds();
    view.x = Math.max(b.x0, Math.min(b.x1, view.x));
    view.y = Math.max(b.y0, Math.min(b.y1, view.y));
  }
  function fit() {
    var vw = viewport.clientWidth, vh = viewport.clientHeight;
    view.x = vw / 2 - meta[TREE.root].x;
    view.y = vh * 0.05 - meta[TREE.root].y;
    apply();
  }
  function setGrab(on) {
    var c = on ? 'grabbing' : '';
    viewport.style.cursor = c;
    world.style.cursor = c;
    nodeLayer.style.cursor = c;
  }

  viewport.addEventListener('wheel', function (e) {
    e.preventDefault();
    vx = vy = 0;
    var rect = viewport.getBoundingClientRect();
    var wx = e.clientX - rect.left - view.x;
    var wy = e.clientY - rect.top - view.y;
    var f = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    yStep = Math.max(YSTEP_MIN, Math.min(YSTEP_MAX, yStep * f));
    rebuild();
    view.x = e.clientX - rect.left - wx;
    view.y = e.clientY - rect.top - wy;
    clampView();
    apply();
  }, { passive: false });

  var drag = null;
  viewport.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    if (e.target && e.target.closest && e.target.closest('.tree-node')) return;
    e.preventDefault();
    world.style.transition = '';
    vx = vy = 0;
    drag = { moved: false, sx: e.clientX, sy: e.clientY, ox: view.x, oy: view.y, hist: [{ x: e.clientX, y: e.clientY, t: performance.now() }] };
    try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
    setGrab(true);
  });
  viewport.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (!drag.moved) {
      if (dx * dx + dy * dy > 16) { drag.moved = true; } else { return; }
    }
    var b = bounds(), nx = drag.ox + dx, ny = drag.oy + dy;
    if (nx < b.x0) { nx = b.x0 + (nx - b.x0) * 0.35; }
    if (nx > b.x1) { nx = b.x1 + (nx - b.x1) * 0.35; }
    if (ny < b.y0) { ny = b.y0 + (ny - b.y0) * 0.35; }
    if (ny > b.y1) { ny = b.y1 + (ny - b.y1) * 0.35; }
    view.x = nx; view.y = ny;
    apply();
    var t = performance.now();
    drag.hist.push({ x: e.clientX, y: e.clientY, t: t });
    while (drag.hist.length > 1 && t - drag.hist[0].t > 120) { drag.hist.shift(); }
  });
  function endDrag() {
    if (!drag) return;
    var d = drag;
    drag = null;
    setGrab(false);
    if (d.moved) {
      var h0 = d.hist[0], h1 = d.hist[d.hist.length - 1], dt = (h1.t - h0.t) / 1000;
      if (dt > 0.01) {
        var k = 16.667 / dt;
        vx = (h1.x - h0.x) * k;
        vy = (h1.y - h0.y) * k;
      }
    }
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  var springing = false;
  function frame() {
    if (!drag) {
      springing = false;
      var b = bounds();
      if (view.x < b.x0 || view.x > b.x1) {
        springing = true;
        var tx = view.x < b.x0 ? b.x0 : b.x1;
        view.x += (tx - view.x) * 0.18;
        if (Math.abs(tx - view.x) < 0.5) { view.x = tx; }
        vx = 0;
      }
      if (view.y < b.y0 || view.y > b.y1) {
        springing = true;
        var ty = view.y < b.y0 ? b.y0 : b.y1;
        view.y += (ty - view.y) * 0.18;
        if (Math.abs(ty - view.y) < 0.5) { view.y = ty; }
        vy = 0;
      }
      if (Math.abs(vx) > 0.4 || Math.abs(vy) > 0.4) {
        view.x += vx; view.y += vy;
        vx *= 0.92; vy *= 0.92;
        if (view.x <= b.x0) { view.x = b.x0; vx = 0; }
        if (view.x >= b.x1) { view.x = b.x1; vx = 0; }
        if (view.y <= b.y0) { view.y = b.y0; vy = 0; }
        if (view.y >= b.y1) { view.y = b.y1; vy = 0; }
        apply();
      } else {
        vx = vy = 0;
        if (springing) { apply(); }
      }
    }
    requestAnimationFrame(frame);
  }

  rebuild();
  fit();
  requestAnimationFrame(frame);
  window.addEventListener('tree-open', fit);
  window.addEventListener('resize', function () { clampView(); apply(); });

  /* ---- 详情、快速节点、聚焦 ---- */
  function getFavs() { try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) { return []; } }
  function setFavs(a) { localStorage.setItem(FAV_KEY, JSON.stringify(a)); }
  function renderQuickbar() {
    var favs = getFavs();
    quickbar.innerHTML = '<span class="qb-label">★ 快速节点</span>' + favs.map(function (id) {
      var n = TREE.nodes[id];
      if (!n) return '';
      return '<button class="qb-chip" data-id="' + esc(id) + '">' + esc(n.name) + ' · ' + esc(n.year) + '</button>';
    }).join('');
    Array.prototype.forEach.call(quickbar.querySelectorAll('.qb-chip'), function (btn) {
      btn.addEventListener('click', function () { focusNode(btn.getAttribute('data-id')); });
    });
  }
  function focusNode(id) {
    var m = meta[id];
    if (!m) return;
    vx = vy = 0;
    var vw = viewport.clientWidth, vh = viewport.clientHeight;
    view.x = vw / 2 - m.x;
    view.y = vh / 2 - m.y;
    world.style.transition = 'transform 800ms ease-in-out';
    apply();
    setTimeout(function () { world.style.transition = ''; }, 800);
  }
  function openNode(id) {
    var n = TREE.nodes[id];
    if (!n) return;
    var favs = getFavs();
    var isFav = favs.indexOf(id) !== -1;
    var html = '<h3 class="nm-title">' + esc(n.name) + '</h3>' +
      '<div class="nm-year">' + esc(n.year) + '</div>' +
      (n.desc ? '<p class="nm-desc">' + esc(n.desc) + '</p>' : '') +
      '<h4>论文与资料</h4>' +
      (n.papers && n.papers.length ? '<ul class="nm-papers">' + n.papers.map(function (p) {
        return '<li><a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a><span>' + esc(p.venue) + '</span></li>';
      }).join('') + '</ul>' : '<p class="nm-empty">暂无详细论文条目。</p>') +
      '<div class="nm-actions">' +
      '<button id="favBtn">' + (isFav ? '★ 取消快速节点' : '☆ 设为快速节点') + '</button>' +
      '<button id="focusBtn">◎ 移动视角至此</button>' +
      '</div>';
    modalBody.innerHTML = html;
    modal.classList.remove('hidden');
    document.getElementById('favBtn').addEventListener('click', function () {
      var f = getFavs();
      if (f.indexOf(id) === -1) { f.push(id); } else { f = f.filter(function (x) { return x !== id; }); }
      setFavs(f); renderQuickbar(); openNode(id);
    });
    document.getElementById('focusBtn').addEventListener('click', function () {
      modal.classList.add('hidden');
      focusNode(id);
    });
  }
  document.getElementById('nodeModalClose').addEventListener('click', function () { modal.classList.add('hidden'); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.add('hidden'); });
  renderQuickbar();
})();
