/* ====================================================
   FraudShield – report.js
   ==================================================== */

let currentStep = 1;
let selectedFraudType = null;
let uploadedFilesList = [];

const FRAUD_TYPES = [
  { id: 'phishing', label: 'Phishing', icon: '🔗', desc: 'Fake SMS/Email link' },
  { id: 'otp', label: 'OTP Fraud', icon: '📱', desc: 'Someone asked for your OTP' },
  { id: 'upi', label: 'UPI Scam', icon: '💸', desc: 'Money sent to wrong person' },
  { id: 'call', label: 'Vishing Call', icon: '📞', desc: 'Fake bank/police call' },
  { id: 'app', label: 'Fake App', icon: '📥', desc: 'Installed a suspicious app' },
  { id: 'investment', label: 'Big Investment', icon: '📈', desc: 'Doubling money scams' },
];

function renderFraudTypes() {
  const grid = document.getElementById('fraudTypeGrid');
  if (!grid) return;
  grid.innerHTML = FRAUD_TYPES.map(f => `
    <div class="fraud-type-card" onclick="selectFraudType('${f.id}', this)">
      <div class="ft-icon">${f.icon}</div>
      <div class="ft-label">${f.label}</div>
      <div class="ft-desc">${f.desc}</div>
    </div>
  `).join('');
}

// ---- Fraud Type Selection ----
function selectFraudType(type, el) {
  selectedFraudType = type;
  document.querySelectorAll('.fraud-type-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  const nextBtn = document.getElementById('btnStep1Next');
  if (nextBtn) nextBtn.disabled = false;

  // Contextual education
  const messages = {
    phishing: '⚡ Tip: Do not click any links from the phishing message. Take screenshots for evidence.',
    otp: '⚡ Tip: If you shared an OTP, contact your bank IMMEDIATELY to block further transactions.',
    upi: '⚡ Tip: Call your bank to reverse the transaction and block the payee UPI ID.',
    call: '⚡ Tip: Note down the caller\'s number and any transaction IDs they mentioned.',
    app: '⚡ Tip: Uninstall the fake app immediately and change all passwords on your phone.',
    investment: '⚡ Tip: Gather all payment proofs — screenshots, transaction IDs, and app names.',
  };
  showToast(messages[type] || 'Report selected', 'info', 4000);
}

// ---- Step Navigation ----
function goToStep(step) {
  // Validate current step
  if (step === 2 && !selectedFraudType) {
    showToast('Please select a fraud type first', 'warning');
    return;
  }
  if (step === 4) buildReviewPreview();

  // Hide all step bodies
  for (let i = 1; i <= 4; i++) {
    const body = document.getElementById(`stepBody${i}`);
    if (body) body.style.display = 'none';

    const stepEl = document.getElementById(`rStep${i}`);
    if (stepEl) {
      stepEl.classList.remove('active', 'done');
      if (i < step) stepEl.classList.add('done');
      else if (i === step) stepEl.classList.add('active');
    }

    const line = document.querySelectorAll('.step-line')[i-1];
    if (line) line.classList.toggle('done', i < step);
  }

  const target = document.getElementById(`stepBody${step}`);
  if (target) target.style.display = 'block';
  currentStep = step;

  // Scroll to form top
  document.getElementById('reportFormCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- Build Review Preview ----
function buildReviewPreview() {
  const typeLabels = {
    phishing:'Phishing (Fake Email/SMS)', otp:'OTP Fraud',
    upi:'UPI Scam', call:'Vishing Call',
    app:'Fake App', investment:'Investment Fraud'
  };
  const date = document.getElementById('fraudDate')?.value;
  const amount = document.getElementById('fraudAmount')?.value;
  const contact = document.getElementById('scammerContact')?.value;
  const description = document.getElementById('fraudDescription')?.value;
  const txnId = document.getElementById('bankTransactionId')?.value;

  const preview = document.getElementById('reportPreview');
  if (!preview) return;

  const rows = [
    { label: 'Fraud Type', value: typeLabels[selectedFraudType] || 'Not specified' },
    { label: 'Date & Time', value: date ? new Date(date).toLocaleString('en-IN') : 'Not specified' },
    { label: 'Amount Lost', value: amount ? '₹' + Number(amount).toLocaleString('en-IN') : '₹0 (No loss yet)' },
    { label: 'Scammer Contact', value: contact || 'Not provided' },
    { label: 'Bank TXN ID', value: txnId || 'Not provided' },
    { label: 'Files Attached', value: uploadedFilesList.length + ' file(s)' },
    { label: 'Description', value: description ? description.substring(0, 100) + (description.length > 100 ? '…' : '') : 'Not provided' },
  ];

  preview.innerHTML = rows.map(r => `
    <div class="preview-row">
      <span class="preview-label">${r.label}</span>
      <span class="preview-value">${r.value}</span>
    </div>
  `).join('');
}

// ---- File Upload Handler ----
function handleFileUpload(input) {
  const files = Array.from(input.files);
  const container = document.getElementById('uploadedFiles');
  uploadedFilesList = uploadedFilesList.concat(files.map(f => f.name));

  files.forEach(file => {
    const item = document.createElement('div');
    item.className = 'uploaded-file';
    item.innerHTML = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    container?.appendChild(item);
  });

  showToast(`${files.length} file(s) attached`, 'success', 2000);
}

// ---- Submit Report ----
function submitReport() {
  const btn = document.getElementById('btnSubmitReport');
  if (btn) {
    btn.textContent = '⏳ Submitting…';
    btn.disabled = true;
  }

  setTimeout(() => {
    const refId = genId('RPT');
    document.getElementById('reportRefId').textContent = refId;

    const typeLabels = {
      phishing:'Phishing', otp:'OTP Fraud', upi:'UPI Scam',
      call:'Vishing', app:'Fake App', investment:'Investment Fraud'
    };

    const nextSteps = document.getElementById('reportNextSteps');
    if (nextSteps) {
      nextSteps.innerHTML = [
        'Call your bank immediately to block any further transactions',
        'Call 1930 (National Cyber Crime Helpline) with your reference ID',
        `File online at <a href="https://cybercrime.gov.in" target="_blank" style="color:var(--accent-indigo)">cybercrime.gov.in</a>`,
        'Change your passwords and enable 2FA on all accounts',
        'Do NOT share your reference ID with anyone calling you about the case',
      ].map(s => `<div class="next-step-item">${s}</div>`).join('');
    }

    // Save report
    const reports = Store.get('my_reports', []);
    reports.push({
      id: refId,
      type: typeLabels[selectedFraudType] || 'Other',
      date: new Date().toISOString(),
      amount: document.getElementById('fraudAmount')?.value || 0,
      status: 'Under Review'
    });
    Store.set('my_reports', reports);

    openModal('successModal');
    showToast('Report submitted! Reference: ' + refId, 'success', 5001);

    if (btn) { btn.textContent = '🚨 Submit Report'; btn.disabled = false; }
  }, 2000);
}

// ---- Dynamic Tips based on fraud type (sidebar) ----
function updateWhatToDoList() {
  const steps = {
    otp: [
      'Call your bank IMMEDIATELY to block transactions',
      'Inform about the OTP shared and time of sharing',
      'Call 1930 Cybercrime Helpline',
      'Change your banking password and MPIN',
      'Do NOT share anything more with the scammer'
    ],
    upi: [
      'Call your bank to reverse the debit immediately',
      'Block the payee UPI ID through your bank',
      'Call 1930 with transaction ID and payee UPI',
      'File complaint at cybercrime.gov.in',
      'Keep all screenshots of the transaction'
    ],
    phishing: [
      'Do NOT click the phishing link again',
      'Change your banking password immediately',
      'Check your account for unauthorized transactions',
      'Report the phishing URL to your bank',
      'Call 1930 if any money was lost'
    ]
  };
  return steps[selectedFraudType] || [
    'Call your bank immediately to block the account/card',
    'Call 1930 (National Cybercrime Helpline)',
    'File a complaint at cybercrime.gov.in',
    'Change all passwords immediately',
    'Do not share any more OTPs or details'
  ];
}

// ---- Reset Form ----
function resetForm() {
  selectedFraudType = null;
  uploadedFilesList = [];
  document.getElementById('fraudTypeGrid').querySelectorAll('.fraud-type-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('btnStep1Next').disabled = true;
  document.getElementById('fraudDate').value = '';
  document.getElementById('fraudAmount').value = '';
  document.getElementById('scammerContact').value = '';
  document.getElementById('fraudDescription').value = '';
  document.getElementById('uploadedFiles').innerHTML = '';
  goToStep(1);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderFraudTypes();
  // Pre-fill date to now
  const dateInput = document.getElementById('fraudDate');
  if (dateInput) {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    dateInput.value = local;
  }
});
