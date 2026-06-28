/**
 * FocuslyNow Theme Engine — Light/Dark Mode
 * Include via: <script src="theme.js"></script>
 * Provides: FN_toggleTheme(), FN_toggleMore(), applied before DOMContentLoaded
 */
(function () {
  var THEME_KEY = 'fn_theme';

  var LIGHT = [
    /* ── BASE TOKENS ── */
    '[data-theme="light"]{--bg:#e9e5de;--card:#f2ede6;--surface:#dedad2;--text:#1a1a22;--muted:#52566a;--border:#cdc8be}',
    /* ── ACCENT OVERRIDES for light (darker, readable on white) ── */
    '[data-theme="light"]{--accent:#4f7c00;--accent2:#0a6e8a;--accent3:#b54d00;--accent4:#5b3fa6}',
    '[data-theme="light"] body{background:var(--bg)!important;color:var(--text)!important}',
    '[data-theme="light"] nav{background:rgba(233,229,222,.97)!important;border-bottom-color:#cdc8be!important}',
    '[data-theme="light"] footer{background:var(--bg)!important;border-top-color:#cdc8be!important}',
    /* ── TOASTS ── */
    '[data-theme="light"] .fn-toast{background:#fff!important;box-shadow:0 8px 32px rgba(0,0,0,.15)!important}',
    '[data-theme="light"] .fn-toast-title{color:#18181b!important}',
    '[data-theme="light"] .fn-toast-msg{color:#4b5563!important}',
    '[data-theme="light"] .fn-toast-close{color:#4b5563!important}',
    /* ── MODALS ── */
    '[data-theme="light"] .modal-overlay,.fn-modal,[id$="Modal"]{color-scheme:light}',
    '[data-theme="light"] input,[data-theme="light"] textarea,[data-theme="light"] select{color-scheme:light}',
    /* ── THEME BTN ── */
    '.fn-theme-btn{background:none;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:.28rem .55rem;cursor:pointer;font-size:.88rem;transition:all .2s;line-height:1;flex-shrink:0;font-family:"DM Sans",sans-serif}',
    '.fn-theme-btn:hover{border-color:var(--accent,#c8f064);color:var(--accent,#c8f064)}'
  ].join('') + `
    /* ── NAV & FOOTER ── */
    [data-theme="light"] nav { background: rgba(247,246,242,.97) !important; border-bottom-color: #d8d4cc !important; }
    [data-theme="light"] footer { background: var(--bg) !important; border-top-color: #d8d4cc !important; }

    /* ── NAV LINKS ── */
    [data-theme="light"] .nav-links>li>a { color: #4b5563 !important; }
    [data-theme="light"] .nav-links>li>a:hover { color: #18181b !important; }
    [data-theme="light"] .nav-logo { color: var(--accent) !important; }

    /* ── NAV MORE DROPDOWN ── */
    [data-theme="light"] .nav-more-dropdown { background: #f2ede6 !important; border-color: #cdc8be !important; box-shadow: 0 8px 24px rgba(0,0,0,.12) !important; }
    [data-theme="light"] .nav-more-dropdown a { color: #18181b !important; }
    [data-theme="light"] .nav-more-dropdown a:hover { background: #e9e5de !important; color: var(--accent) !important; }

    /* ── JBTNS ── */
    [data-theme="light"] .jbtn.g { background: rgba(79,124,0,.08) !important; border-color: rgba(79,124,0,.3) !important; color: #4f7c00 !important; }
    [data-theme="light"] .jbtn.g:hover { background: rgba(79,124,0,.15) !important; }
    [data-theme="light"] .jbtn.b { background: rgba(10,110,138,.08) !important; border-color: rgba(10,110,138,.3) !important; color: #0a6e8a !important; }
    [data-theme="light"] .jbtn.b:hover { background: rgba(10,110,138,.15) !important; }
    [data-theme="light"] .jbtn.o { background: rgba(181,77,0,.08) !important; border-color: rgba(181,77,0,.3) !important; color: #b54d00 !important; }
    [data-theme="light"] .jbtn.o:hover { background: rgba(181,77,0,.15) !important; }
    [data-theme="light"] .jbtn.p { background: rgba(91,63,166,.08) !important; border-color: rgba(91,63,166,.3) !important; color: #5b3fa6 !important; }
    [data-theme="light"] .jbtn.p:hover { background: rgba(91,63,166,.15) !important; }
    [data-theme="light"] .more-btn { background: rgba(0,0,0,.04) !important; border-color: #d8d4cc !important; color: #4b5563 !important; }
    [data-theme="light"] .more-btn:hover { background: rgba(0,0,0,.08) !important; color: #18181b !important; }

    /* ── CARDS & SURFACES ── */
    [data-theme="light"] .panel,
    [data-theme="light"] .card,
    [data-theme="light"] .tl-outer,
    [data-theme="light"] .tpl-panel,
    [data-theme="light"] .mini-todo-panel,
    [data-theme="light"] .rc,
    [data-theme="light"] .heatmap-section,
    [data-theme="light"] .goal-card,
    [data-theme="light"] .input-card,
    [data-theme="light"] .mission-block,
    [data-theme="light"] .value-card,
    [data-theme="light"] .contact-form,
    [data-theme="light"] .info-block,
    [data-theme="light"] .founder-teaser,
    [data-theme="light"] .input-wrap .input-card,
    [data-theme="light"] .arena { background: var(--card) !important; border-color: var(--border) !important; }

    /* ── MODALS ── */
    [data-theme="light"] .modal-overlay,
    [data-theme="light"] #fModal,
    [data-theme="light"] #tplConfirmModal,
    [data-theme="light"] #goalModal,
    [data-theme="light"] #delModal,
    [data-theme="light"] #clearModal,
    [data-theme="light"] #fn-wrapup-overlay { background: rgba(0,0,0,.45) !important; }

    [data-theme="light"] .fn-modal,
    [data-theme="light"] #fn-wrapup-modal,
    [data-theme="light"] [id$="Modal"] > div { background: #ffffff !important; border-color: #d8d4cc !important; color: #18181b !important; }

    [data-theme="light"] .fm-title,
    [data-theme="light"] .wu-title { color: #18181b !important; }
    [data-theme="light"] .fm-body { color: #4b5563 !important; }
    [data-theme="light"] .fm-body strong { color: #18181b !important; }
    [data-theme="light"] .fm-input,
    [data-theme="light"] .fm-pri-btn { background: #e9e5de !important; border-color: #cdc8be !important; color: #1a1a22 !important; }
    [data-theme="light"] .fm-btn-ghost { border-color: #d8d4cc !important; color: #4b5563 !important; }
    [data-theme="light"] .wu-stat { background: #dedad2 !important; border-color: #cdc8be !important; }
    [data-theme="light"] .wu-pending-list { background: #dedad2 !important; border-color: #cdc8be !important; }
    [data-theme="light"] .wu-stat-num[style*="#c8f064"] { color: #4f7c00 !important; }
    [data-theme="light"] .wu-stat-num[style*="#f0a064"] { color: #b54d00 !important; }

    /* ── INPUTS & SELECTS ── */
    [data-theme="light"] input:not([type="color"]):not([type="range"]):not([type="checkbox"]),
    [data-theme="light"] textarea,
    [data-theme="light"] select,
    [data-theme="light"] .finput,
    [data-theme="light"] .field input,
    [data-theme="light"] .mtp-input,
    [data-theme="light"] .tpl-name-inp,
    [data-theme="light"] .task-input { background: #f7f6f2 !important; border-color: #d8d4cc !important; color: #18181b !important; }
    [data-theme="light"] input::placeholder,
    [data-theme="light"] textarea::placeholder { color: #9ca3af !important; }

    /* ── INFO NOTE / BANNERS ── */
    [data-theme="light"] .info-note { background: rgba(10,110,138,.05) !important; border-color: rgba(10,110,138,.2) !important; }
    [data-theme="light"] .info-note strong { color: #0a6e8a !important; }
    [data-theme="light"] .hero-tag, [data-theme="light"] .page-tag { color: #4f7c00 !important; background: rgba(79,124,0,.07) !important; border-color: rgba(79,124,0,.25) !important; }

    /* ── TIMELINE & SCHEDULE ── */
    [data-theme="light"] .timeline::before { background: #d8d4cc !important; }
    [data-theme="light"] .hour-block { border-bottom-color: rgba(216,212,204,.5) !important; }
    [data-theme="light"] .t-block { background: var(--surface) !important; }
    [data-theme="light"] .sum-bar,
    [data-theme="light"] .s-chip { background: var(--surface) !important; border-color: var(--border) !important; }

    /* ── STAT PILLS & BADGES ── */
    [data-theme="light"] .stat-pill,
    [data-theme="light"] .stat-chip,
    [data-theme="light"] .s-chip { background: var(--surface) !important; border-color: var(--border) !important; }

    /* ── PENDING BANNER ── */
    [data-theme="light"] .pending-inner { background: rgba(181,77,0,.06) !important; }

    /* ── SCORE RING TRACK ── */
    [data-theme="light"] .score-ring circle:first-child,
    [data-theme="light"] circle[stroke="#2a2e3d"] { stroke: #d8d4cc !important; }
    [data-theme="light"] .ring-svg circle[stroke="#2a2e3d"] { stroke: #d8d4cc !important; }

    /* ── HEATMAP ── */
    [data-theme="light"] .hm-cell[style*="background:#2a2e3d"] { background: #dedad4 !important; }

    /* ── DAY BARS ── */
    [data-theme="light"] .dbar[style*="transparent"] { background: transparent !important; }

    /* ── IMPORT ZONE ── */
    [data-theme="light"] .import-zone { border-color: #d8d4cc !important; }
    [data-theme="light"] .import-zone:hover { background: rgba(10,110,138,.04) !important; }
    [data-theme="light"] .import-preview { background: var(--surface) !important; border-color: var(--border) !important; }

    /* ── SOUND & TASK PICKER ── */
    [data-theme="light"] .snd-btn { background: var(--surface) !important; border-color: var(--border) !important; }
    [data-theme="light"] .tp-item  { background: var(--surface) !important; border-color: var(--border) !important; }

    /* ── PERMISSION BANNER ── */
    [data-theme="light"] .perm-inner.default { background: rgba(10,110,138,.04) !important; border-color: rgba(10,110,138,.2) !important; }
    [data-theme="light"] .perm-inner.granted { background: rgba(79,124,0,.05) !important; border-color: rgba(79,124,0,.2) !important; }
    [data-theme="light"] .perm-inner.denied  { background: rgba(220,38,38,.04) !important; border-color: rgba(220,38,38,.2) !important; }

    /* ── ENGINE ERROR ── */
    [data-theme="light"] .engine-error-inner { background: rgba(220,38,38,.04) !important; }

    /* ── SAVED BADGE ── */
    [data-theme="light"] .saved-badge { background: rgba(79,124,0,.1) !important; border-color: rgba(79,124,0,.3) !important; color: #4f7c00 !important; }


    /* ══ REMINDERS PAGE ══ */
    /* Permission banner backgrounds — much more visible */
    [data-theme="light"] .perm-inner.granted {
      background: rgba(79,124,0,.10) !important;
      border-color: rgba(79,124,0,.35) !important;
    }
    [data-theme="light"] .perm-inner.default {
      background: rgba(10,110,138,.09) !important;
      border-color: rgba(10,110,138,.35) !important;
    }
    [data-theme="light"] .perm-inner.denied {
      background: rgba(200,50,50,.08) !important;
      border-color: rgba(200,50,50,.3) !important;
    }
    /* Perm title visible */
    [data-theme="light"] .perm-title { color: #1a1a22 !important; font-weight: 700; }
    [data-theme="light"] .perm-desc  { color: #3d4155 !important; }
    /* Enable Notifications button — accent is now dark green; text must be white */
    [data-theme="light"] .perm-btn.ask { background: #4f7c00 !important; color: #ffffff !important; }
    [data-theme="light"] .perm-btn.test-perm { color: #4f7c00 !important; border-color: rgba(79,124,0,.4) !important; background: rgba(79,124,0,.08) !important; }
    /* Reminder cards */
    [data-theme="light"] .rc { background: #ffffff !important; border-color: #cdc8be !important; }
    [data-theme="light"] .rc.enabled { border-color: var(--rc-color, #4f7c00) !important; }
    [data-theme="light"] .rc-title  { color: #1a1a22 !important; }
    [data-theme="light"] .rc-desc   { color: #4b5470 !important; }
    [data-theme="light"] .rc-expand-icon { color: #6b7180 !important; }
    /* Card inner expand area */
    [data-theme="light"] .rc-body   { background: #f2ede6 !important; border-top-color: #cdc8be !important; }
    /* Section headers */
    [data-theme="light"] .section-hdr { color: #52566a !important; }
    [data-theme="light"] .section-hdr::after { background: #cdc8be !important; }
    /* Toggle track: off=grey, on=accent */
    [data-theme="light"] .toggle-track { background: #c0bdb7 !important; }
    [data-theme="light"] .toggle input:checked ~ .toggle-track { background: var(--rc-color, #4f7c00) !important; }
    [data-theme="light"] .toggle-track::before { background: #ffffff !important; box-shadow: 0 1px 4px rgba(0,0,0,.2) !important; }
    /* Time tags */
    [data-theme="light"] .time-tag { background: #e9e5de !important; border-color: #cdc8be !important; color: #1a1a22 !important; }
    [data-theme="light"] .time-tag-del { color: #7a8090 !important; }
    [data-theme="light"] .time-inp { background: #e9e5de !important; border-color: #cdc8be !important; color: #1a1a22 !important; }
    /* Interval control */
    [data-theme="light"] .ic-btn { background: #e9e5de !important; border-color: #cdc8be !important; color: #1a1a22 !important; }
    [data-theme="light"] .ic-val  { color: #1a1a22 !important; }
    [data-theme="light"] .interval-label { color: #52566a !important; }
    /* Saved badge */
    [data-theme="light"] .saved-badge { background: rgba(79,124,0,.12) !important; border-color: rgba(79,124,0,.4) !important; color: #3a5c00 !important; }
    /* Test buttons inside cards */
    [data-theme="light"] .test-btn { background: #e9e5de !important; border-color: #cdc8be !important; color: #3d4155 !important; }
    [data-theme="light"] .test-btn:hover { border-color: #4f7c00 !important; color: #4f7c00 !important; }
    /* Field messages */
    [data-theme="light"] .field-msg { color: #b54d00 !important; }

    /* ══ TODO DONE PANEL ══ */
    [data-theme="light"] #donePanel { background: #f2ede6 !important; border-left-color: #cdc8be !important; }
    [data-theme="light"] .dp-head   { background: #f2ede6 !important; border-bottom-color: #cdc8be !important; }
    [data-theme="light"] .dp-footer { background: #f2ede6 !important; border-top-color: #cdc8be !important; }
    [data-theme="light"] .dp-title  { color: #1a1a22 !important; }
    [data-theme="light"] .dp-meta   { color: #52566a !important; border-bottom-color: #cdc8be !important; }
    [data-theme="light"] .dp-item   { background: #ffffff !important; border-color: #cdc8be !important; }
    [data-theme="light"] .dp-item:hover { border-color: #4f7c00 !important; }
    [data-theme="light"] .dp-check  { background: #4f7c00 !important; color: #ffffff !important; }
    [data-theme="light"] .dp-text   { color: #1a1a22 !important; }
    [data-theme="light"] .dp-time   { color: #6b7180 !important; }
    [data-theme="light"] .dp-undo   { border-color: #cdc8be !important; color: #52566a !important; }
    [data-theme="light"] .dp-undo:hover { border-color: #0a6e8a !important; color: #0a6e8a !important; background: rgba(10,110,138,.06) !important; }
    [data-theme="light"] .dp-empty  { color: #6b7180 !important; }

    /* ══ GENERAL CONTRAST IMPROVEMENTS ══ */
    /* Nav logo and active link */
    [data-theme="light"] .nav-logo  { color: #3a5c00 !important; }
    /* Hero tags and page tags */
    [data-theme="light"] .hero-tag, [data-theme="light"] .page-tag {
      color: #3a5c00 !important;
      background: rgba(79,124,0,.09) !important;
      border-color: rgba(79,124,0,.3) !important;
    }
    /* Card headings */
    [data-theme="light"] .card-title, [data-theme="light"] .panel-title,
    [data-theme="light"] .rc-title, [data-theme="light"] .mission-block h2,
    [data-theme="light"] .value-card h3 { color: #1a1a22 !important; }
    /* Muted text: readable but clearly secondary */
    [data-theme="light"] .muted, [data-theme="light"] [class*="desc"],
    [data-theme="light"] .mission-block p, [data-theme="light"] .value-card p { color: #4b5470 !important; }
    /* Stat pills */
    [data-theme="light"] .stat-pill {
      background: #e9e5de !important;
      border-color: #cdc8be !important;
      color: #1a1a22 !important;
    }
    /* Footer text */
    [data-theme="light"] footer p { color: #52566a !important; }

    /* ── DARK SURFACE OVERLAYS used inline ── */
    [data-theme="light"] [style*="background:rgba(13,15,20"] { background: rgba(247,246,242,.97) !important; }
    [data-theme="light"] [style*="background:#0d0f14"]        { background: var(--bg) !important; }
    [data-theme="light"] [style*="background:#1a1e28"]        { background: var(--card) !important; }
    [data-theme="light"] [style*="background:#111318"]        { background: var(--surface) !important; }

    /* ── MUTED TEXT ── */
    [data-theme="light"] [style*="color:#7a7f96"],
    [data-theme="light"] [style*="color:var(--muted)"] { color: #4b5563 !important; }

    /* ── BUBBLE ARENA ── */
    [data-theme="light"] .arena { background-image: radial-gradient(rgba(91,63,166,.06) 1px, transparent 1px) !important; }

    /* ── SIDEBAR ── */
    [data-theme="light"] .mtp-item:hover { background: rgba(91,63,166,.07) !important; }
    [data-theme="light"] .tpl-card { background: var(--surface) !important; }

    /* ── SECTION HEADERS ── */
    [data-theme="light"] .section-hdr { color: #4b5563 !important; }
    [data-theme="light"] .section-hdr::after { background: #d8d4cc !important; }

    /* ── TOGGLE TRACK ── */
    [data-theme="light"] .toggle-track { background: #d8d4cc !important; }
  `;

  /* ══════════════════════════════
     NAV DROPDOWN + MORE MENU CSS
  ══════════════════════════════ */
  var NAV_CSS = `
    /* Ensure nav never clips the dropdown */
    nav { overflow: visible !important; }
    .nav-links { overflow: visible !important; flex-wrap: nowrap !important; overflow-x: auto; scrollbar-width: none; }
    .nav-links::-webkit-scrollbar { display: none; }
    .nav-more-wrap { position: relative; flex-shrink: 0; }
    .more-btn { cursor: pointer; }
    .nav-more-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + .55rem);
      right: 0;
      min-width: 175px;
      background: #1a1e28;
      border: 1px solid #2a2e3d;
      border-radius: 12px;
      padding: .4rem 0;
      z-index: 99999;
      box-shadow: 0 12px 36px rgba(0,0,0,.5);
      animation: fnDropIn .18s cubic-bezier(.34,1.56,.64,1);
    }
    .nav-more-dropdown.open { display: block; }
    @keyframes fnDropIn { from { opacity:0; transform:translateY(-6px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
    .nav-more-dropdown a {
      display: block;
      padding: .55rem 1rem;
      color: #e8eaf2;
      text-decoration: none;
      font-size: .82rem;
      font-weight: 500;
      font-family: 'DM Sans', sans-serif;
      transition: background .15s, color .15s;
      white-space: nowrap;
    }
    .nav-more-dropdown a:hover { background: rgba(200,240,100,.08); color: #c8f064; }
    .nav-more-dropdown a:first-child { border-radius: 12px 12px 0 0; }
    .nav-more-dropdown a:last-child  { border-radius: 0 0 12px 12px; }
  `;

  function inject() {
    if (document.getElementById('fn-theme-css')) return;
    var s = document.createElement('style');
    s.id = 'fn-theme-css';
    s.textContent = LIGHT;
    document.head.appendChild(s);

    var n = document.createElement('style');
    n.id = 'fn-nav-css';
    n.textContent = NAV_CSS;
    document.head.appendChild(n);
  }

  function applyTheme(t) {
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, t);
    refreshBtns(t);
  }

  function refreshBtns(t) {
    document.querySelectorAll('.fn-theme-btn').forEach(function (b) {
      b.textContent = t === 'light' ? '🌙' : '☀';
      b.title = t === 'light' ? 'Dark mode' : 'Light mode';
    });
  }

  window.FN_toggleTheme = function () {
    applyTheme((localStorage.getItem(THEME_KEY) || 'dark') === 'light' ? 'dark' : 'light');
  };

  /* ── MORE DROPDOWN TOGGLE ── */
  window.FN_toggleMore = function () {
    var drop = document.getElementById('moreNavDrop');
    if (!drop) return;
    drop.classList.toggle('open');
  };

  /* Close more dropdown when clicking outside */
  document.addEventListener('click', function (e) {
    var wrap = e.target.closest ? e.target.closest('.nav-more-wrap') : null;
    if (!wrap) {
      var drop = document.getElementById('moreNavDrop');
      if (drop) drop.classList.remove('open');
    }
  });

  /* Apply immediately (before paint) */
  var saved = localStorage.getItem(THEME_KEY) || 'dark';
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  inject();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { refreshBtns(saved); });
  } else {
    refreshBtns(saved);
  }
})();
