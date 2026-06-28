/**
 * FocuslyNow Reminders Engine v4.0
 * - ONE consolidated reminder cadence: "habits / schedule / sleep / break /
 *   motivation" reminders share a single rotating slot, fired once per
 *   user-configurable interval (default every 3 hrs) — not once per type.
 * - No clustering: only ONE notification fires per slot
 * - Cross-tab safe: if multiple FocuslyNow pages/tabs are open, a short
 *   claim+verify lock ensures only ONE of them actually fires a notification,
 *   even if several tabs become "due" at the same instant
 * - Water reminder: separate, user-controlled with its own custom interval
 * - Wrap-up: user-set time, once per day
 */
(function () {
  'use strict';

  var RKEY      = 'fn_reminders_v3';
  var LFIRE_PFX = 'fn_lf_';
  var ROT_KEY   = 'fn_rotation_idx';
  var LAST_ANY  = 'fn_last_any';
  var FIRE_LOCK = 'fn_fire_lock';
  var MIN_GAP   = 2 * 60000; /* hard floor: never two notifications within 2 min, of any kind */

  /* ── TYPES ──────────────────────────────────────────────────────── */
  var TYPES = {
    motivation: {
      icon: '\u2736', title: 'FocuslyNow \u2014 Stay Focused', color: '#c8f064', link: null,
      messages: [
        "You're doing great \u2014 keep pushing forward!",
        "Progress, not perfection. Every step counts.",
        "The hardest part is starting. You already did that.",
        "Small consistent actions beat occasional heroics every time.",
        "Don't count the days \u2014 make the days count.",
        "Your future self will thank you for today's effort.",
        "Focus is a superpower. You've got it right now.",
        "One deep hour beats ten scattered ones.",
        "You're closer than you think \u2014 keep going."
      ]
    },
    habits: {
      icon: '\uD83C\uDF3F', title: 'FocuslyNow \u2014 Habit Check-In', color: '#c8f064', link: 'habit-tracker.html',
      messages: [
        "Don't break your streak \u2014 have you logged your habits today?",
        "Small daily wins build extraordinary lives. Log your habits.",
        "Your habit tracker is waiting. Stay consistent!",
        "Discipline is choosing your habits over your impulses.",
        "Great habits aren't formed in a day \u2014 but today counts."
      ]
    },
    schedule: {
      icon: '\uD83D\uDCC5', title: 'FocuslyNow \u2014 Plan Check', color: '#64d4f0', link: 'schedule-maker.html',
      messages: [
        "Quick check: are you following your plan for today?",
        "15 minutes of planning saves hours of chaos.",
        "Your schedule is your blueprint \u2014 stay on track.",
        "A plan without action is just a wish. Execute yours.",
        "Set your next time block \u2014 make every hour count."
      ]
    },
    sleep: {
      icon: '\uD83C\uDF19', title: 'FocuslyNow \u2014 Rest Up', color: '#a78bfa', link: 'sleep-tracker.html',
      messages: [
        "Sleep is your recovery tool. Don't skip it.",
        "Quality sleep = quality tomorrow. Start winding down.",
        "The best productivity move right now might be to rest.",
        "Tomorrow needs a well-rested you. Log your sleep.",
        "You can't pour from an empty cup \u2014 rest is refueling."
      ]
    },
    rest: {
      icon: '\u2615', title: 'FocuslyNow \u2014 Take a Break', color: '#f0a064', link: 'focus-timer.html',
      messages: [
        "Take a 5-minute break \u2014 your brain will thank you.",
        "Stretch, breathe, reset. Then back to it.",
        "Short breaks make long sessions sustainable.",
        "Step away for 5 minutes. Come back sharper.",
        "Peak performance needs recovery. Break time!"
      ]
    },
    water: {
      icon: '\uD83D\uDCA7', title: 'FocuslyNow \u2014 Hydration', color: '#64d4f0', link: 'water-tracker.html',
      messages: [
        "Drink a glass of water now. Hydration powers your focus.",
        "Time to hydrate! Log your water intake.",
        "Your brain is 75% water. Keep it topped up.",
        "Quick reminder: drink some water and log it.",
        "Staying hydrated = staying sharp. Drink up!"
      ]
    },
    wrapup: {
      icon: '\uD83C\uDF19', title: 'FocuslyNow \u2014 Day Wrap-Up', color: '#a78bfa', link: 'weekly-review.html',
      messages: [
        "Time to review your day \u2014 what did you accomplish?",
        "End-of-day check: did you move the needle today?",
        "Reflect, reset, recharge. Open your daily wrap-up.",
        "Great days are built on honest reflection. Check in!",
        "Log your day before you wind down."
      ]
    }
  };

  /* ── DEFAULTS ───────────────────────────────────────────────────── */
  /* global.intervalMins = how often ONE consolidated reminder should fire.
     The "pool" (habits / schedule / sleep / rest / motivation) rotates
     through this single slot — so the user gets exactly one notification
     every `intervalMins` minutes, not one per type. */
  var DEFAULTS = {
    global:     { intervalMins: 180 },
    motivation: { enabled: true  },
    wrapup:     { enabled: true, time: '21:00' },
    water:      { enabled: false, intervalMins: 60 }
  };
  var MIN_INTERVAL_MINS = 30;   /* sanity floor for the global cadence */
  var MAX_INTERVAL_MINS = 720;  /* sanity ceiling (12 hrs) */

  /* ── SETTINGS ───────────────────────────────────────────────────── */
  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem(RKEY) || 'null');
      if (!s) s = {};
      ['global','motivation','wrapup','water'].forEach(function (k) {
        if (!s[k]) s[k] = JSON.parse(JSON.stringify(DEFAULTS[k]));
      });
      if (!s.wrapup.time) s.wrapup.time = '21:00';
      if (s.water.intervalMins === undefined) s.water.intervalMins = 60;
      var gi = parseInt(s.global.intervalMins, 10);
      if (!gi || isNaN(gi)) gi = DEFAULTS.global.intervalMins;
      gi = Math.max(MIN_INTERVAL_MINS, Math.min(MAX_INTERVAL_MINS, gi));
      s.global.intervalMins = gi;
      return s;
    } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS)); }
  }
  function saveSettings(s) { localStorage.setItem(RKEY, JSON.stringify(s)); }

  /* ── LAST-FIRED (kept for water's independent cadence) ────────────── */
  function getLastFired(type) {
    try { return parseInt(localStorage.getItem(LFIRE_PFX + type) || '0', 10) || 0; }
    catch (e) { return 0; }
  }
  function setLastFired(type, ts) {
    localStorage.setItem(LFIRE_PFX + type, (ts || Date.now()).toString());
  }

  /* ── ROTATION INDEX (which pool type fires next) ──────────────────── */
  function getRotationIndex() {
    return parseInt(localStorage.getItem(ROT_KEY) || '0', 10) || 0;
  }
  function setRotationIndex(i) {
    localStorage.setItem(ROT_KEY, String(i));
  }

  /* ── HELPERS ────────────────────────────────────────────────────── */
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* ── TOAST STYLES ───────────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('fn-rem-styles')) return;
    var s = document.createElement('style'); s.id = 'fn-rem-styles';
    s.textContent = [
      '@keyframes fnToastIn{from{opacity:0;transform:translateY(18px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}',
      '@keyframes fnToastOut{from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(10px) scale(.94)}}',
      '@keyframes fnProgShrink{from{width:100%}to{width:0%}}',
      '#fn-toasts{position:fixed;bottom:1.4rem;right:1.4rem;z-index:99999;display:flex;flex-direction:column-reverse;gap:.65rem;max-width:330px;width:calc(100% - 2.8rem);pointer-events:none}',
      '.fn-toast{background:#1a1e28;border-radius:14px;padding:.9rem 2.6rem .9rem 1rem;display:flex;align-items:flex-start;gap:.75rem;pointer-events:all;cursor:default;animation:fnToastIn .35s cubic-bezier(.34,1.56,.64,1) both;position:relative;overflow:hidden;box-shadow:0 10px 36px rgba(0,0,0,.5)}',
      '.fn-toast.clickable{cursor:pointer}',
      '.fn-toast-icon{font-size:1.5rem;flex-shrink:0;line-height:1;margin-top:.06rem}',
      '.fn-toast-body{flex:1;min-width:0}',
      '.fn-toast-title{font-family:"Playfair Display",serif;font-weight:700;font-size:.88rem;color:#e8eaf2;margin-bottom:.22rem;line-height:1.3}',
      '.fn-toast-msg{font-size:.76rem;color:#7a7f96;line-height:1.45}',
      '.fn-toast-link{display:inline-block;margin-top:.38rem;font-size:.72rem;font-weight:600;text-decoration:none;border-bottom:1px solid;opacity:.85}',
      '.fn-toast-close{position:absolute;top:.5rem;right:.55rem;background:none;border:none;color:#7a7f96;cursor:pointer;font-size:.72rem;line-height:1;padding:.15rem;transition:color .15s}',
      '.fn-toast-close:hover{color:#e8eaf2}',
      '.fn-toast-bar{position:absolute;bottom:0;left:0;height:2.5px;border-radius:0 2px 2px 0;animation:fnProgShrink linear both}'
    ].join('');
    document.head.appendChild(s);
  }

  function getContainer() {
    var c = document.getElementById('fn-toasts');
    if (!c) { c = document.createElement('div'); c.id = 'fn-toasts'; document.body.appendChild(c); }
    return c;
  }

  /* ── IN-APP TOAST ───────────────────────────────────────────────── */
  window.FN_showToast = function (type, customMsg) {
    injectStyles();
    var cfg = TYPES[type]; if (!cfg) return;
    var DURATION = 9000;
    var container = getContainer();
    if (container.children.length >= 4) container.removeChild(container.lastChild);

    var toast = document.createElement('div');
    toast.className = 'fn-toast' + (cfg.link ? ' clickable' : '');
    toast.style.borderLeft = '4px solid ' + cfg.color;

    var icon = document.createElement('div'); icon.className = 'fn-toast-icon'; icon.textContent = cfg.icon;
    var body = document.createElement('div'); body.className = 'fn-toast-body';
    var ttl  = document.createElement('div'); ttl.className  = 'fn-toast-title'; ttl.textContent = cfg.title;
    var msg  = document.createElement('div'); msg.className  = 'fn-toast-msg';   msg.textContent = customMsg || rand(cfg.messages);
    body.appendChild(ttl); body.appendChild(msg);

    if (cfg.link) {
      var lnk = document.createElement('a');
      lnk.className = 'fn-toast-link';
      lnk.style.color = cfg.color;
      lnk.style.borderBottomColor = cfg.color + '66';
      lnk.href = cfg.link;
      lnk.textContent = 'Open \u2192';
      body.appendChild(lnk);
    }

    var cl  = document.createElement('button'); cl.className = 'fn-toast-close'; cl.textContent = '\u2715'; cl.title = 'Dismiss';
    var bar = document.createElement('div');    bar.className = 'fn-toast-bar';   bar.style.background = cfg.color; bar.style.animationDuration = DURATION + 'ms';

    toast.appendChild(icon); toast.appendChild(body); toast.appendChild(cl); toast.appendChild(bar);

    function dismiss() { toast.style.animation = 'fnToastOut .28s ease forwards'; setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300); }
    cl.addEventListener('click', function (e) { e.stopPropagation(); dismiss(); });
    if (cfg.link) toast.addEventListener('click', function (e) { if (e.target !== cl) window.location.href = cfg.link; });

    container.appendChild(toast);
    setTimeout(dismiss, DURATION);
  };

  /* ── DESKTOP NOTIFICATION ───────────────────────────────────────── */
  function browserNotify(type, msg) {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    var cfg = TYPES[type]; if (!cfg) return;
    try {
      var n = new Notification(cfg.title, {
        body:               msg || rand(cfg.messages),
        tag:                'fn-' + type + '-' + Date.now(),
        requireInteraction: false,
        silent:             false
      });
      n.onclick = function () { window.focus(); };
    } catch (e) {}
  }

  /* ── FIRE ───────────────────────────────────────────────────────── */
  function fire(type, customMsg) {
    setLastFired(type, Date.now());
    localStorage.setItem(LAST_ANY, Date.now().toString());
    window.FN_showToast(type, customMsg);
    browserNotify(type, customMsg);
  }

  /* ── CORE CHECK ─────────────────────────────────────────────────── */
  function checkReminders() {
    var now = Date.now();
    var s   = loadSettings();
    var lastAny = parseInt(localStorage.getItem(LAST_ANY) || '0', 10) || 0;

    /* Hard floor: never two notifications within MIN_GAP, of any kind */
    if (now - lastAny < MIN_GAP) return;

    var candidate = null;

    /* POOL — habits / schedule / sleep / rest (+ motivation if enabled)
       all share ONE consolidated slot on the user-configured cadence.
       Exactly one of these fires every `global.intervalMins` minutes,
       rotating through the pool so each type still gets airtime. */
    var poolMs = s.global.intervalMins * 60000;
    if (now - lastAny >= poolMs) {
      var pool = ['habits', 'schedule', 'sleep', 'rest'];
      if (s.motivation && s.motivation.enabled) pool.push('motivation');
      var idx = getRotationIndex() % pool.length;
      candidate = { type: pool[idx], rotateTo: (idx + 1) % pool.length };
    }

    /* WATER — separate, user-controlled with its own custom interval */
    if (!candidate && s.water && s.water.enabled) {
      var waterMs = (s.water.intervalMins || 60) * 60000;
      if (now - getLastFired('water') >= waterMs) {
        candidate = { type: 'water' };
      }
    }

    if (!candidate) return;
    claimAndFire(candidate);
  }

  /* ── CROSS-TAB CLAIM ─────────────────────────────────────────────────
     Every open FocuslyNow tab/page runs this same check on its own timer.
     If two or more tabs decide a notification is "due" at the same moment
     (e.g. several tabs opened together, or switched between), each writes
     its own token into FIRE_LOCK and waits a short randomised delay.
     Only the tab whose token is STILL the most recently written one after
     that delay is allowed to fire — every other tab silently backs off.
     This guarantees the user sees just ONE notification at a time, no
     matter how many FocuslyNow tabs are open. ────────────────────────── */
  function claimAndFire(candidate) {
    var token = Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    try { localStorage.setItem(FIRE_LOCK, token); } catch (e) {}
    var delay = 150 + Math.floor(Math.random() * 250); /* 150–400ms jitter */
    setTimeout(function () {
      /* Another tab may have already fired while we waited */
      var lastAny = parseInt(localStorage.getItem(LAST_ANY) || '0', 10) || 0;
      if (Date.now() - lastAny < MIN_GAP) return;

      /* Only the most recent claim wins */
      var current;
      try { current = localStorage.getItem(FIRE_LOCK); } catch (e) { current = null; }
      if (current !== token) return;

      fire(candidate.type);
      if (candidate.rotateTo !== undefined) setRotationIndex(candidate.rotateTo);
    }, delay);
  }

  /* ── PERMISSION REQUEST ─────────────────────────────────────────── */
  function requestPermission(callback) {
    if (typeof Notification === 'undefined') { if (callback) callback('unsupported'); return; }
    if (Notification.permission === 'granted') { if (callback) callback('granted'); return; }
    if (Notification.permission === 'denied')  { if (callback) callback('denied');  return; }
    var p = Notification.requestPermission();
    if (p && typeof p.then === 'function') {
      p.then(function (perm) {
        if (perm === 'granted') {
          setTimeout(function () {
            try {
              new Notification('FocuslyNow Reminders Active', {
                body: "You will now receive reminders on your desktop.",
                tag:  'fn-test-' + Date.now()
              });
            } catch (e) {}
          }, 600);
        }
        if (callback) callback(perm);
      });
    }
  }

  /* ── PUBLIC API ─────────────────────────────────────────────────── */
  window.FN_REMINDERS = {
    loadSettings:      loadSettings,
    saveSettings:      saveSettings,
    fireReminder:      fire,
    requestPermission: requestPermission,
    types:             TYPES,
    check:             checkReminders
  };

  /* ── INIT ───────────────────────────────────────────────────────── */
  function initFirstRun() {
    /* On a brand-new install there's no LAST_ANY yet — seed it to "now"
       so the first reminder arrives after one full interval instead of
       within seconds of opening the site for the first time. */
    try {
      if (!localStorage.getItem(LAST_ANY)) {
        localStorage.setItem(LAST_ANY, Date.now().toString());
      }
    } catch (e) {}
  }

  function init() {
    injectStyles();
    getContainer();
    initFirstRun();
    setInterval(checkReminders, 30000);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) checkReminders();
    });
    setTimeout(checkReminders, 8000);
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }

})();

/* ══════════════════════════════════════════════════════════════════
   WRAP-UP MODAL (fires at user-set time, once per day)
══════════════════════════════════════════════════════════════════ */
(function () {
  var WRAPUP_KEY = 'fn_wrapup_v1';
  var WDATE_KEY  = 'fn_wrapup_date';

  function loadWrapupSettings() {
    try { return JSON.parse(localStorage.getItem(WRAPUP_KEY) || 'null') || { enabled: true, time: '21:00' }; }
    catch (e) { return { enabled: true, time: '21:00' }; }
  }
  function saveWrapupSettings(s) { localStorage.setItem(WRAPUP_KEY, JSON.stringify(s)); }

  function p2(n) { return String(n).padStart(2, '0'); }
  function todayKey() { var t = new Date(); return t.getFullYear() + '-' + p2(t.getMonth() + 1) + '-' + p2(t.getDate()); }
  function timeNow()  { var t = new Date(); return p2(t.getHours()) + ':' + p2(t.getMinutes()); }

  function getTodayTasks() {
    var todos = []; try { todos = JSON.parse(localStorage.getItem('fn_todos_v4') || '[]'); } catch (e) {}
    var dk = todayKey(); var done = [], pending = [];
    todos.forEach(function (t) {
      var isDone = (!t.recur || t.recur === 'none') ? t.done : !!(t.doneOnDates && t.doneOnDates[dk]);
      var appears = false;
      if (!t.recur || t.recur === 'none') { appears = t.scheduledFor === dk || t.shownOn === dk || t.rolledTo === dk; }
      else {
        var dow = new Date().getDay();
        if (t.recur === 'daily') appears = true;
        else if (t.recur === 'weekdays') appears = dow >= 1 && dow <= 5;
        else if (t.recur === 'weekends') appears = dow === 0 || dow === 6;
        else appears = !!(t.recurDays && t.recurDays.indexOf(dow) >= 0);
      }
      if (!appears) return;
      if (isDone) done.push(t); else pending.push(t);
    });
    return { done: done, pending: pending };
  }

  function pushPendingToTomorrow() {
    var todos = []; try { todos = JSON.parse(localStorage.getItem('fn_todos_v4') || '[]'); } catch (e) { return; }
    var today = new Date(); today.setHours(0,0,0,0);
    var tom = new Date(today.getTime() + 86400000);
    var dk = todayKey();
    var tk = tom.getFullYear() + '-' + p2(tom.getMonth() + 1) + '-' + p2(tom.getDate());
    todos.forEach(function (t) {
      if (!t.done && (!t.recur || t.recur === 'none') &&
          (t.shownOn === dk || t.rolledTo === dk || t.scheduledFor === dk)) {
        t.rolledTo = tk; t.originalDate = t.originalDate || dk;
      }
    });
    try { localStorage.setItem('fn_todos_v4', JSON.stringify(todos)); } catch (e) {}
  }

  function injectWrapUpStyles() {
    if (document.getElementById('fn-wrapup-css')) return;
    var s = document.createElement('style'); s.id = 'fn-wrapup-css';
    s.textContent = [
      '#fn-wrapup-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(6px);z-index:10000;display:flex;align-items:center;justify-content:center;padding:1rem;animation:fnWuFade .3s ease}',
      '@keyframes fnWuFade{from{opacity:0}to{opacity:1}}',
      '#fn-wrapup-modal{background:#1a1e28;border:1px solid #2a2e3d;border-radius:22px;padding:2.2rem 2.4rem;max-width:440px;width:100%;text-align:center;animation:fnWuIn .32s cubic-bezier(.34,1.56,.64,1)}',
      '@keyframes fnWuIn{from{transform:scale(.88) translateY(12px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}',
      '.wu-icon{font-size:2.5rem;margin-bottom:.7rem}',
      '.wu-title{font-family:"Playfair Display",serif;font-size:1.4rem;font-weight:900;color:#e8eaf2;margin-bottom:.5rem}',
      '.wu-date{font-size:.78rem;color:#7a7f96;margin-bottom:1.3rem}',
      '.wu-stats{display:flex;gap:1rem;justify-content:center;margin-bottom:1.3rem;flex-wrap:wrap}',
      '.wu-stat{background:#111318;border:1px solid #2a2e3d;border-radius:12px;padding:.7rem 1.2rem;min-width:90px}',
      '.wu-stat-num{font-family:"Playfair Display",serif;font-size:1.7rem;font-weight:900;line-height:1}',
      '.wu-stat-lbl{font-size:.68rem;color:#7a7f96;margin-top:.2rem;text-transform:uppercase;letter-spacing:.5px}',
      '.wu-pending-list{text-align:left;max-height:120px;overflow-y:auto;background:#111318;border:1px solid #2a2e3d;border-radius:10px;padding:.6rem .8rem;margin-bottom:1.2rem;font-size:.8rem;color:#7a7f96;line-height:1.7}',
      '.wu-pending-list div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.wu-btns{display:flex;flex-direction:column;gap:.55rem}',
      '.wu-btn-primary{padding:.72rem;background:#c8f064;color:#0d0f14;border:none;border-radius:11px;font-family:"DM Sans",sans-serif;font-weight:700;font-size:.92rem;cursor:pointer;transition:opacity .2s}',
      '.wu-btn-primary:hover{opacity:.85}',
      '.wu-btn-secondary{padding:.72rem;background:rgba(100,212,240,.1);border:1px solid rgba(100,212,240,.25);color:#64d4f0;border-radius:11px;font-family:"DM Sans",sans-serif;font-weight:600;font-size:.88rem;cursor:pointer;transition:all .2s}',
      '.wu-btn-secondary:hover{background:rgba(100,212,240,.2)}',
      '.wu-btn-ghost{padding:.65rem;background:transparent;border:1px solid #2a2e3d;color:#7a7f96;border-radius:11px;font-family:"DM Sans",sans-serif;font-size:.85rem;cursor:pointer;transition:all .2s}',
      '.wu-btn-ghost:hover{border-color:#e8eaf2;color:#e8eaf2}'
    ].join('');
    document.head.appendChild(s);
  }

  window.FN_showWrapUp = function () {
    injectWrapUpStyles();
    if (document.getElementById('fn-wrapup-overlay')) return;
    var tasks   = getTodayTasks();
    var doneN   = tasks.done.length;
    var pendN   = tasks.pending.length;
    var dateStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    var pendHtml = '';
    if (pendN > 0) {
      pendHtml = '<div class="wu-pending-list">'
        + tasks.pending.slice(0, 8).map(function (t) { return '<div>\u23f3 ' + (t.text || '').replace(/</g, '&lt;') + '</div>'; }).join('')
        + (pendN > 8 ? '<div style="color:#7a7f96">\u2026and ' + (pendN - 8) + ' more</div>' : '')
        + '</div>';
    }
    var ov = document.createElement('div'); ov.id = 'fn-wrapup-overlay';
    ov.innerHTML = '<div id="fn-wrapup-modal">'
      + '<div class="wu-icon">\uD83C\uDF19</div>'
      + '<div class="wu-title">Day Complete!</div>'
      + '<div class="wu-date">' + dateStr + '</div>'
      + '<div class="wu-stats">'
      + '<div class="wu-stat"><div class="wu-stat-num" style="color:#c8f064">' + doneN + '</div><div class="wu-stat-lbl">Done</div></div>'
      + '<div class="wu-stat"><div class="wu-stat-num" style="color:#f0a064">' + pendN + '</div><div class="wu-stat-lbl">Pending</div></div>'
      + '</div>'
      + (pendN > 0
          ? '<div style="font-size:.8rem;color:#7a7f96;margin-bottom:.6rem;text-align:left">Pending tasks:</div>' + pendHtml
          : '<div style="font-size:.88rem;color:#c8f064;margin-bottom:1.2rem">\uD83C\uDF89 All tasks done \u2014 great work!</div>')
      + '<div class="wu-btns">'
      + (pendN > 0 ? '<button class="wu-btn-primary" id="wuPushBtn">\uD83D\uDCC5 Push pending to tomorrow</button>' : '')
      + '<a href="sleep-tracker.html" style="text-decoration:none"><button class="wu-btn-secondary">\uD83C\uDF19 Log tonight\'s sleep</button></a>'
      + '<button class="wu-btn-ghost" id="wuDismissBtn">Dismiss</button>'
      + '</div></div>';
    document.body.appendChild(ov);
    function close() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    var pb = document.getElementById('wuPushBtn');
    if (pb) { pb.addEventListener('click', function () { pushPendingToTomorrow(); pb.textContent = '\u2705 Tasks moved to tomorrow!'; pb.disabled = true; pb.style.opacity = '.6'; setTimeout(close, 1800); }); }
    document.getElementById('wuDismissBtn').addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
  };

  /* Check at exact configured time, once per day */
  function checkWrapUp() {
    /* Merge time from main settings if available */
    var ms = null;
    try {
      var mainS = JSON.parse(localStorage.getItem('fn_reminders_v3') || 'null');
      if (mainS && mainS.wrapup) ms = mainS.wrapup;
    } catch (e) {}
    var s  = loadWrapupSettings();
    /* If main settings has wrapup.enabled/time, use that as source of truth */
    if (ms) { s.enabled = ms.enabled; if (ms.time) s.time = ms.time; }
    if (!s.enabled) return;
    var tn = timeNow();
    var td = todayKey();
    if (tn === s.time && localStorage.getItem(WDATE_KEY) !== td) {
      localStorage.setItem(WDATE_KEY, td);
      setTimeout(window.FN_showWrapUp, 800);
    }
  }

  function attachToAPI() {
    if (window.FN_REMINDERS) {
      window.FN_REMINDERS.loadWrapupSettings = loadWrapupSettings;
      window.FN_REMINDERS.saveWrapupSettings = saveWrapupSettings;
      window.FN_REMINDERS.showWrapUp         = window.FN_showWrapUp;
    }
  }
  attachToAPI();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachToAPI);

  setInterval(checkWrapUp, 60000);
  setTimeout(checkWrapUp, 10000);
})();
