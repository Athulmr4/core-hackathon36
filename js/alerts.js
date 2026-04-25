/* ====================================================
   FraudShield – alerts.js  v2 (SVG icons, no emojis)
   ==================================================== */

const ALL_ALERTS = [
  {
    id: 'A001', level: 'critical', unread: true,
    icon: 'shieldAlert',
    title: 'Phishing SMS Detected',
    desc: 'A link received via SMS matches known phishing patterns targeting SBI bank customers. The URL "sbi-secure-login.tk" is a known fake banking site. Do NOT click this link.',
    time: new Date(Date.now() - 1800000),
    actions: ['dismiss', 'details', 'action'],
    detail: 'The URL "sbi-secure-login.tk" uses a suspicious .tk domain and mimics the SBI login page. Our AI detected 4 red flags: fake domain extension, missing HTTPS, misspelled brand name, and an Indian IP redirect.',
  },
  {
    id: 'A002', level: 'warning', unread: true,
    icon: 'alertTriangle',
    title: 'Large Transaction Paused',
    desc: 'A payment of ₹25,000 to unknown UPI ID "prize.claim@pay" was automatically paused. This UPI ID contains known scam keywords.',
    time: new Date(Date.now() - 3600000),
    actions: ['dismiss', 'details'],
    detail: 'The UPI ID "prize.claim@pay" contains keywords ("prize", "claim") that appear in 94% of known lottery scams. The recipient has no prior transaction history with you.',
  },
  {
    id: 'A003', level: 'warning', unread: true,
    icon: 'lock',
    title: 'New Device Login Detected',
    desc: 'Your account was accessed from a new device in Mumbai at 11:42 PM. If this wasn\'t you, take action immediately.',
    time: new Date(Date.now() - 7200000),
    actions: ['dismiss', 'details', 'action'],
    detail: 'A login was detected from a device with IP 49.36.x.x (Mumbai, Maharashtra). Browser: Chrome 124 on Android. If you did not do this, someone else may have your credentials.',
  },
  {
    id: 'A004', level: 'info', unread: false,
    icon: 'info',
    title: 'Safety Score Updated',
    desc: 'Your Safety Score improved from 72 to 78 after completing 2 educational lessons.',
    time: new Date(Date.now() - 86400000),
    actions: ['dismiss'],
    detail: 'Your score improved because you completed the "What is Phishing?" and "OTP Fraud" lessons. Complete more lessons to reach 90+.',
  },
  {
    id: 'A005', level: 'info', unread: false,
    icon: 'globe',
    title: 'URL Scan Complete',
    desc: 'You checked "sbi-secure-login.tk" — identified as HIGH RISK phishing site. Your data is safe.',
    time: new Date(Date.now() - 172800000),
    actions: ['dismiss'],
    detail: 'The URL scan found 5 phishing indicators. You did the right thing by checking before clicking.',
  },
  {
    id: 'A006', level: 'resolved', unread: false,
    icon: 'checkCircle',
    title: 'Suspicious Transaction Blocked',
    desc: 'Your earlier flagged transaction to "prize.winner@upi" for ₹50,000 was blocked successfully.',
    time: new Date(Date.now() - 259200000),
    actions: ['dismiss'],
    detail: 'The ₹50,000 payment to "prize.winner@upi" was rejected. This UPI ID has been reported in 47 other fraud cases.',
  },
];

const PATTERN_DATA = [
  { label: 'Phishing Attempts',     val: '3 this week',  pct: 60, color: 'var(--crimson)', desc: 'SMS + email phishing attacks on your profile' },
  { label: 'Suspicious UPI IDs',    val: '2 detected',   pct: 40, color: 'var(--amber)',   desc: 'Scam-keyword UPI IDs intercepted' },
  { label: 'Night-time Logins',     val: '1 anomaly',    pct: 20, color: 'var(--violet)',  desc: 'Login at unusual hours from new device' },
  { label: 'High-Value Alerts',     val: '₹75K at risk', pct: 75, color: 'var(--crimson)', desc: 'Total value of paused transactions' },
];

const ICON_SVG = {
  shieldAlert: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 6.5v5.5C3 17.5 7 22 12 23c5-1 9-5.5 9-11V6.5L12 2z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  alertTriangle:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  lock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/></svg>`,
  globe: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>`,
};

let currentFilter = 'all';
let alerts = [...ALL_ALERTS];

function iconClass(level) {
  const map = { critical:'aci-critical', warning:'aci-warning', info:'aci-info', resolved:'aci-resolved' };
  return map[level] || 'aci-info';
}

function renderAlerts() {
  const container = document.getElementById('alertsContainer');
  if (!container) return;
  const filtered = currentFilter === 'all' ? alerts : alerts.filter(a => a.level === currentFilter);

  if (!filtered.length) {
    container.innerHTML = `<div class="glass-card" style="padding:2.5rem;text-align:center">
      <div style="color:var(--t3);font-size:0.9rem">No ${currentFilter} alerts at this time.</div>
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(a => `
    <div class="full-alert-card ${a.level} ${a.unread ? 'unread' : ''}" id="alertCard_${a.id}">
      ${a.unread ? '<div class="unread-dot"></div>' : ''}
      <div class="alert-card-header">
        <div class="alert-card-icon ${iconClass(a.level)}">${ICON_SVG[a.icon] || ICON_SVG.info}</div>
        <div>
          <div class="alert-card-title">
            ${a.title}
            <span class="chip ${a.level === 'critical' ? 'chip-crimson' : a.level === 'warning' ? 'chip-amber' : a.level === 'resolved' ? 'chip-emerald' : 'chip-sky'}" style="font-size:0.62rem">${a.level.toUpperCase()}</span>
          </div>
        </div>
      </div>
      <div class="alert-card-desc">${a.desc}</div>
      <div class="alert-card-footer">
        <div class="alert-card-time">${timeAgo(a.time)}</div>
        <div class="alert-card-actions">
          ${a.actions.includes('dismiss') ? `<button class="alert-action-btn" onclick="dismissAlert('${a.id}',event)">Dismiss</button>` : ''}
          ${a.actions.includes('details') ? `<button class="alert-action-btn" onclick="showAlertDetail('${a.id}',event)">View Details</button>` : ''}
          ${a.actions.includes('action')  ? `<button class="alert-action-btn btn-take-action" onclick="takeAction('${a.id}',event)">Take Action</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderPatterns() {
  const grid = document.getElementById('patternGrid');
  if (!grid) return;

  const history = Store.get('transactions', []);
  const now = Date.now();
  const recent = history.filter(t => (now - new Date(t.time).getTime()) < 2592000000); // 30 days

  const velocityTxns = history.filter(t => (now - new Date(t.time).getTime()) < 600000).length;
  const blockedCount = history.filter(t => t.status === 'blocked').length;
  const blockedValue = history.filter(t => t.status === 'blocked').reduce((sum, t) => sum + t.amount, 0);
  const suspiciousUPIs = history.filter(t => t.status === 'warn' || t.status === 'blocked').length;

  const dynamicPatterns = [
    { label: 'High Velocity',    val: `${velocityTxns} recent`, pct: Math.min(velocityTxns * 25, 100), color: 'var(--crimson)', desc: 'Multiple transactions in rapid succession' },
    { label: 'Blocked Threats',  val: `${blockedCount} blocked`, pct: Math.min(blockedCount * 20, 100), color: 'var(--amber)', desc: 'Interactions with known scammer contacts' },
    { label: 'Savings Protected', val: formatCurrency(blockedValue), pct: Math.min(blockedValue / 1000, 100), color: 'var(--emerald)', desc: 'Value of money kept safe from fraud' },
    { label: 'Suspicious Activity', val: `${suspiciousUPIs} flags`, pct: Math.min(suspiciousUPIs * 15, 100), color: 'var(--violet)', desc: 'Total suspicious patterns detected' },
  ];

  grid.innerHTML = dynamicPatterns.map((p, i) => `
    <div class="pattern-item" id="pi${i}">
      <div class="pi-row">
        <div class="pi-label">${p.label}</div>
        <div class="pi-value" style="color:${p.color}">${p.val}</div>
      </div>
      <div class="bar-track">
        <div class="bar-fill" id="pb${i}" style="width:0%;background:${p.color}"></div>
      </div>
      <div class="pi-desc">${p.desc}</div>
    </div>
  `).join('');

  setTimeout(() => dynamicPatterns.forEach((p, i) => {
    const b = document.getElementById('pb' + i);
    if (b) b.style.width = p.pct + '%';
  }), 300);
}

function filterAlerts(level, btn) {
  currentFilter = level;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderAlerts();
}

function dismissAlert(id, e) {
  if (e) e.stopPropagation();
  const card = document.getElementById('alertCard_' + id);
  if (card) { card.style.opacity = '0'; card.style.transform = 'translateX(20px)'; card.style.transition = '0.3s ease'; setTimeout(() => card.remove(), 300); }
  alerts = alerts.filter(a => a.id !== id);
  showToast('Alert dismissed', 'success');
}

function showAlertDetail(id, e) {
  if (e) e.stopPropagation();
  const alert = alerts.find(a => a.id === id);
  if (!alert) return;
  const iconCls = iconClass(alert.level);
  document.getElementById('alertModalContent').innerHTML = `
    <div style="padding:1.75rem">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.25rem">
        <div class="alert-card-icon ${iconCls}" style="width:40px;height:40px">${ICON_SVG[alert.icon] || ICON_SVG.info}</div>
        <div>
          <div style="font-family:var(--fhead);font-size:1.05rem;font-weight:800;color:var(--t1)">${alert.title}</div>
          <div style="font-size:0.72rem;color:var(--t3);margin-top:3px">${timeAgo(alert.time)}</div>
        </div>
      </div>
      <p style="font-size:0.88rem;color:var(--t2);line-height:1.65;margin-bottom:1.25rem">${alert.detail}</p>
      <div style="padding:1rem;background:rgba(124,58,237,0.07);border:1px solid rgba(124,58,237,0.18);border-radius:10px;font-size:0.82rem;color:var(--t2);line-height:1.6">
        <strong style="color:var(--violet-lt)">Advice:</strong> ${
          alert.level === 'critical' ? 'Do not click any suspicious links. Run a URL scan on FraudShield and report this to your bank.' :
          alert.level === 'warning'  ? 'Review the transaction carefully. If you did not initiate it, cancel immediately and notify your bank.' :
          'Keep learning about online safety. Knowledge is your best protection.'
        }
      </div>
      <div style="display:flex;gap:0.75rem;margin-top:1.25rem">
        ${alert.actions.includes('action') ? `<button class="btn btn-danger" style="flex:1;font-size:0.85rem;padding:10px" onclick="takeAction('${id}');closeModal('alertModal')">Take Action</button>` : ''}
        <button class="btn btn-ghost" style="flex:1;font-size:0.85rem;padding:10px" onclick="dismissAlert('${id}');closeModal('alertModal')">Dismiss</button>
      </div>
    </div>
  `;
  openModal('alertModal');
  const a = alerts.find(al => al.id === id);
  if (a) a.unread = false;
  renderAlerts();
}

function takeAction(id, e) {
  if (e) e.stopPropagation();
  showToast('Action taken — alert escalated to your security team.', 'danger', 4000);
  dismissAlert(id, null);
}

function markAllRead() {
  alerts.forEach(a => a.unread = false);
  showToast('All alerts marked as read', 'success');
  renderAlerts();
}

function updateSummary() {
  const crit = alerts.filter(a => a.level === 'critical').length;
  const warn = alerts.filter(a => a.level === 'warning').length;
  const info = alerts.filter(a => a.level === 'info').length;
  const res  = alerts.filter(a => a.level === 'resolved').length;

  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('cnt-critical', crit);
  el('cnt-warning', warn);
  el('cnt-info', info);
  el('cnt-resolved', res);

  const badge = document.getElementById('alertBadge');
  if (badge) badge.textContent = alerts.filter(a => a.unread).length;
}

document.addEventListener('DOMContentLoaded', () => {
  renderAlerts();
  renderPatterns();
  updateSummary();
});
