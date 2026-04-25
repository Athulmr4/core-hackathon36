/* ====================================================
   FraudShield – dashboard.js v3.4 (Dynamic API)
   ==================================================== */

// ── SVG icon shortcuts ──────────────────────────────────────────────
const SVG_ICONS = {
  shield:        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 6.5v5.5C3 17.5 7 22 12 23c5-1 9-5.5 9-11V6.5L12 2z"/></svg>`,
  shieldAlert:  `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 6.5v5.5C3 17.5 7 22 12 23c5-1 9-5.5 9-11V6.5L12 2z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  alertTriangle:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  check:        `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>`,
  warn:         `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  block:        `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 6.5v5.5C3 17.5 7 22 12 23c5-1 9-5.5 9-11V6.5L12 2z"/></svg>`,
};

// ── Helpers ─────────────────────────────────────────────────────────
function safeEl(id) { return document.getElementById(id); }

// ── Score Ring & Labels ──────────────────────────────────────────────
function updateScoreUI(score) {
  const s = Math.round(score);
  const scoreEl = safeEl('safetyScore');
  if (scoreEl) scoreEl.innerHTML = s + '<span class="score-max">/100</span>';

  const ringLabel = safeEl('ringScorelabel');
  if (ringLabel) ringLabel.textContent = s + '%';

  const circle = safeEl('scoreRingCircle');
  if (circle) {
    const circ = 2 * Math.PI * 56;
    circle.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)';
    circle.setAttribute('stroke-dashoffset', circ - (circ * s / 100));
  }

  const level = safeEl('safetyLevel');
  const tip   = safeEl('safetyTip');
  if (level) {
    if (s >= 80) {
      level.innerHTML = `<span style="color:var(--emerald-lt)">Ironclad Security</span>`;
      if (tip) tip.textContent = 'Your account is extremely secure. Keep it up!';
    } else if (s >= 40) {
      level.innerHTML = `<span style="color:var(--amber-lt)">Moderate Protection</span>`;
      if (tip) tip.textContent = 'Complete more lessons to improve your score.';
    } else {
      level.innerHTML = `<span style="color:var(--crimson-lt)">High Risk Profile</span>`;
      if (tip) tip.textContent = 'Take immediate action to secure your account.';
    }
  }
}

// ── Fetch Stats ──────────────────────────────────────────────────────
async function fetchStats(userId) {
  try {
    const res = await fetch(`${window.FS_CONFIG.API_BASE}/user/stats?user_id=${userId}&cb=${Date.now()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();

    if (typeof animateCount === 'function') {
      if (safeEl('statSavedVal'))   animateCount(safeEl('statSavedVal'),   d.moneySaved    || 0);
      if (safeEl('statTxnVal'))     animateCount(safeEl('statTxnVal'),     d.txnsProtected || 0);
      if (safeEl('statBlockedVal')) animateCount(safeEl('statBlockedVal'), d.scannedTotal  || 0);
    } else {
      if (safeEl('statSavedVal'))   safeEl('statSavedVal').textContent   = d.moneySaved || 0;
      if (safeEl('statTxnVal'))     safeEl('statTxnVal').textContent     = d.txnsProtected || 0;
      if (safeEl('statBlockedVal')) safeEl('statBlockedVal').textContent = d.scannedTotal || 0;
    }

    updateScoreUI(d.safetyScore || 0);

    const badge = safeEl('alertBadge');
    if (badge) {
      const n = d.scannedTotal || 0;
      badge.textContent = n;
      badge.style.display = n > 0 ? 'flex' : 'none';
    }
  } catch (err) {
    console.error('fetchStats error:', err);
    const level = safeEl('safetyLevel');
    if (level) level.innerHTML = `<span style="color:var(--crimson-lt)">Backend Error — check connection</span>`;
  }
}

// ── Activity List ────────────────────────────────────────────────────
function renderActivity(txns) {
  const list = safeEl('txnList');
  if (!list) return;
  if (!txns || !txns.length) {
    list.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--t3);font-size:0.875rem">No transactions yet. Send money to see activity!</div>`;
    return;
  }
  list.innerHTML = txns.map(t => {
    const isSafe = t.status === 'safe';
    const isWarn = t.status === 'warn';
    const color  = t.status === 'blocked' ? '#ef4444' : isWarn ? '#f59e0b' : '#10b981';
    const init   = (t.recipient_name || '??').substring(0,2).toUpperCase();
    const ago    = typeof timeAgo       === 'function' ? timeAgo(t.timestamp)      : t.timestamp;
    const amount = typeof formatCurrency=== 'function' ? formatCurrency(t.amount)  : '₹'+t.amount;
    return `
    <div class="txn-row">
      <div class="txn-avatar" style="background:${color}">${init}</div>
      <div class="txn-info">
        <div class="txn-name">${t.recipient_name || t.upi_id}</div>
        <div class="txn-sub">${t.upi_id} · ${ago}</div>
      </div>
      <div class="txn-right">
        <div class="txn-amount debit">-${amount}</div>
        <div class="txn-badge ${isSafe?'tb-safe':isWarn?'tb-warn':'tb-blocked'}">
          ${isSafe ? SVG_ICONS.check+' Safe' : isWarn ? SVG_ICONS.warn+' Review' : SVG_ICONS.block+' Blocked'}
        </div>
      </div>
    </div>`;
  }).join('');
}

async function fetchActivity(userId) {
  try {
    const res  = await fetch(`${window.FS_CONFIG.API_BASE}/transactions?user_id=${userId}&cb=${Date.now()}`);
    const txns = await res.json();
    renderActivity(txns);
  } catch (err) { console.warn('fetchActivity:', err); }
}

// ── Alerts List ─────────────────────────────────────────────────────
function renderAlerts(alerts) {
  const list = safeEl('alertList');
  if (!list) return;
  const ago = typeof timeAgo === 'function' ? timeAgo : s => s;
    if (!alerts || alerts.length === 0) {
      list.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--t3); opacity: 0.8;">
          <div style="margin-bottom: 0.75rem; opacity: 0.3;">
            ${SVG_ICONS.shield || ''}
          </div>
          <p style="font-size: 0.8rem; font-weight: 600;">System Secure</p>
          <p style="font-size: 0.7rem;">No recent threats detected</p>
        </div>
      `;
      return;
    }

    list.innerHTML = alerts.slice(0, 5).map(a => `
    <div class="alert-row ${a.type}" onclick="window.location='alerts.html'" style="cursor:pointer">
      <div class="alert-row-icon ai-${a.type}">${a.type==='critical'?SVG_ICONS.shieldAlert:SVG_ICONS.alertTriangle}</div>
      <div>
        <div class="alert-row-title">${a.title}</div>
        <div class="alert-row-desc">${(a.message||'').substring(0,60)}…</div>
        <div class="alert-row-time">${ago(a.timestamp)}</div>
      </div>
    </div>
  `).join('');
}

async function fetchAlertsList(userId) {
  try {
    const res    = await fetch(`${window.FS_CONFIG.API_BASE}/alerts?user_id=${userId}&cb=${Date.now()}`);
    const alerts = await res.json();
    renderAlerts(alerts);
  } catch (err) { console.warn('fetchAlertsList:', err); }
}

function startAutoRefresh(userId) {
  if (!userId) return;
  console.log('Dashboard: Auto-refresh started (8s interval)');
  setInterval(() => {
    fetchStats(userId);
    fetchActivity(userId);
    fetchAlertsList(userId);
  }, 8000);
}
