/* ====================================================
   FraudShield – transaction.js
   ==================================================== */

let currentRiskScore = 0;
let currentAnalysis = null;

// ---- Live UPI Check ----
function liveUpiCheck(value) {
  const status = document.getElementById('upiStatus');
  if (!value || value.length < 4) {
    if (status) status.innerHTML = '';
    return;
  }
  const result = FraudEngine.liveUpiCheck(value);
  if (!result) return;

  if (status) {
    const color = result.type === 'danger' ? 'var(--crimson-lt)' : result.type === 'safe' ? 'var(--emerald-lt)' : 'var(--amber-lt)';
    const icon = result.type === 'danger' ? Icons.render('xCircle', 16) : result.type === 'safe' ? Icons.render('checkCircle', 16) : Icons.render('alertTriangle', 16);
    status.innerHTML = `<span style="color:${color}" class="upi-status-icon">${icon}</span>`;
  }
  updateRiskMeter();
}

// ---- Check Amount ----
function checkAmount(value) {
  const warn = document.getElementById('amountWarning');
  if (!warn) return;
  const amt = Number(value);
  if (amt > 100000) {
    warn.textContent = '⚠️ Very large amount — are you sure? Scammers often ask for large transfers.';
    warn.className = 'amount-warning hint-danger';
  } else if (amt > 50010) {
    warn.textContent = '⚠️ Large amount detected — double-check the recipient UPI ID.';
    warn.className = 'amount-warning hint-warn';
  } else if (amt > 0) {
    warn.textContent = '';
  }
  updateRiskMeter();
}

// ---- Check Purpose ----
function checkPurpose(value) {
  const warn = document.getElementById('purposeWarning');
  if (!warn) return;
  const msgs = {
    prize: '🚨 WARNING: Paying to claim a prize is a guaranteed scam! You never need to pay to receive a prize.',
    investment: '⚠️ Caution: Verify the investment platform is SEBI/RBI registered before sending money.',
    job: '🚨 WARNING: Paying for a job opportunity is a scam. Legitimate employers will NEVER ask for money.',
    loan: '⚠️ Ensure you know the lender and have a proper agreement. Never pay processing fees upfront.',
  };
  if (msgs[value]) {
    warn.textContent = msgs[value];
    warn.className = 'purpose-warning ' + (['prize', 'job'].includes(value) ? 'hint-danger' : 'hint-warn');
  } else {
    warn.textContent = '';
  }
  updateRiskMeter();
}

// ---- Live Risk Meter Update ----
function updateRiskMeter() {
  const upi = document.getElementById('upiId')?.value || '';
  const amount = document.getElementById('amount')?.value || 0;
  const purpose = document.getElementById('txnPurpose')?.value || '';
  const recipientName = document.getElementById('recipientName')?.value || '';

  if (!upi && !amount && !purpose) return;

  const analysis = FraudEngine.analyzeTransaction({ upiId: upi, amount, purpose, recipientName });
  currentRiskScore = analysis.riskScore;
  currentAnalysis = analysis;

  const fill = document.getElementById('riskFill');
  const label = document.getElementById('riskLabel');
  const factors = document.getElementById('riskFactors');

  if (fill) {
    fill.style.width = analysis.riskScore + '%';
    fill.style.backgroundColor = analysis.color;
  }
  if (label) {
    label.textContent = analysis.label;
    label.style.color = analysis.color;
  }
  if (factors) {
    factors.innerHTML = analysis.risks.slice(0, 3).map(r => `
      <div class="risk-item ${r.level}">
        <span style="flex-shrink:0;margin-top:2px">${r.level === 'danger' ? Icons.render('shieldAlert', 14) : r.level === 'warn' ? Icons.render('alertTriangle', 14) : Icons.render('checkCircle', 14)}</span>
        <span>${r.text}</span>
      </div>
    `).join('');
  }
}

// ---- Analyze Transaction ----
function analyzeTxn(e) {
  e.preventDefault();

  const upi = document.getElementById('upiId')?.value?.trim();
  const amount = document.getElementById('amount')?.value;
  const purpose = document.getElementById('txnPurpose')?.value;
  const recipientName = document.getElementById('recipientName')?.value?.trim();

  if (!upi || !amount || !purpose) {
    showToast('Please fill in all required fields!', 'warning');
    return;
  }

  const analysis = FraudEngine.analyzeTransaction({ upiId: upi, amount, purpose, recipientName });
  currentAnalysis = analysis;

  if (analysis.riskScore >= 35) {
    showFraudWarning(analysis, { upi, amount, purpose, recipientName });
  } else {
    proceedSafely({ upi, amount, recipientName });
  }
}

// ---- Show Fraud Warning Modal ----
function showFraudWarning(analysis, data) {
  const header = document.getElementById('fraudModalHeader');
  const icon = document.getElementById('modalIcon');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const breakdown = document.getElementById('riskBreakdown');
  const education = document.getElementById('modalEducation');

  if (icon) {
    icon.innerHTML = analysis.riskScore >= 70 ? Icons.render('shieldAlert', 48) : Icons.render('alertTriangle', 48);
    icon.style.color = analysis.color;
  }
  if (title) {
    title.textContent = analysis.riskScore >= 70 ? 'High Fraud Risk Detected!' : 'Caution — Risk Detected';
    title.style.color = analysis.color;
  }
  if (subtitle) subtitle.textContent = `Potential scam detected. Score: ${analysis.riskScore}/100`;

  if (breakdown) {
    breakdown.innerHTML = analysis.risks.map(r => `
      <div class="risk-item ${r.level}">
        <span style="flex-shrink:0">${r.level === 'danger' ? Icons.render('shieldAlert', 15) : r.level === 'warn' ? Icons.render('alertTriangle', 15) : Icons.render('checkCircle', 15)}</span>
        <span>${r.text}</span>
      </div>
    `).join('');
  }

  const eduTexts = {
    prize: '<strong>⚠️ Prize Scam Alert:</strong> Scammers call/message claiming you won a prize. They ask you to "pay a small fee" first. This is always a lie. No real prize needs payment upfront.',
    investment: '<strong>📈 Investment Fraud:</strong> Fake trading apps promise high returns. They show fake profits to lure more deposits. Only use SEBI-registered platforms.',
    job: '<strong>💼 Job Scam:</strong> Real employers never charge for jobs. "Registration fees", "training fees", or "security deposits" — all fake.',
    default: '<strong>🛡️ Stay Safe:</strong> Verify the recipient personally before sending money. Call them directly on a known number — don\'t rely on the number the "bank" or "official" gave you.'
  };

  const purpose = document.getElementById('txnPurpose')?.value;
  if (education) education.innerHTML = eduTexts[purpose] || eduTexts.default;

  openModal('fraudModal');
}

// ---- Cancel Transaction ----
function cancelTransaction() {
  const upi = document.getElementById('upiId')?.value?.trim();
  const amount = document.getElementById('amount')?.value || 0;
  const name = document.getElementById('recipientName')?.value?.trim() || upi;

  // Record as blocked transaction for "Money Saved" stat
  const txn = {
    id: genId('TXN'),
    name: name,
    upi: upi,
    amount: Number(amount),
    type: 'debit',
    status: 'blocked',
    time: new Date().toISOString(),
    init: name.substring(0, 2).toUpperCase(),
    color: '#dc2626'
  };
  Store.push('transactions', txn);

  closeModal('fraudModal');
  showToast('✅ Transaction cancelled — you stayed safe!', 'success');
  resetForm();
}

// ---- Proceed Anyway ----
function proceedAnyway() {
  closeModal('fraudModal');
  const upi = document.getElementById('upiId')?.value?.trim();
  const amount = document.getElementById('amount')?.value;
  const name = document.getElementById('recipientName')?.value?.trim();
  proceedSafely({ upi, amount, recipientName: name }, true);
}

// ---- Build UPI Deep Link ----
function buildUpiLink({ upi, amount, recipientName, purpose }) {
  // NOTE: We do NOT use URLSearchParams because it encodes '@' as '%40'
  // and spaces as '+', which many UPI apps reject.
  const name = (recipientName || 'Recipient').replace(/&/g, 'and').replace(/[#?=%]/g, '');
  const amt = Number(amount);
  // Use integer if whole number, otherwise 2 decimal places
  const amtStr = amt % 1 === 0 ? amt.toString() : amt.toFixed(2);

  // Keep transaction note simple — avoid special characters
  const note = 'Payment via FraudShield';

  // Build manually — only essential params (pa, pn, am, cu)
  // Do NOT include 'mode' — it can restrict payment on some apps
  return `upi://pay?pa=${upi}&pn=${encodeURIComponent(name)}&am=${amtStr}&cu=INR&tn=${encodeURIComponent(note)}`;
}



// ---- Open UPI App ----
function openUpiApp(upiLink) {
  // Try to open the UPI intent link
  const isAndroid = /android/i.test(navigator.userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS || /mobile/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = upiLink;
  } else {
    // On desktop, show a helpful message
    showToast('UPI payment links work on mobile devices. Open this page on your phone to pay via UPI app.', 'info', 5000);
  }
}

// ---- Proceed Safely ----
function proceedSafely({ upi, amount, recipientName }, withWarning = false) {
  const name = recipientName || upi;
  const purpose = document.getElementById('txnPurpose')?.value || '';

  // Build UPI deep link
  const upiLink = buildUpiLink({ upi, amount, recipientName: name, purpose });

  // Store the link globally so the modal button can access it
  window._lastUpiLink = upiLink;

  // Update success modal content
  const successDetails = document.getElementById('successDetails');
  if (successDetails) {
    successDetails.innerHTML = `
      <div style="text-align:left;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--r-md);padding:1rem;margin-bottom:0.5rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:0.75rem;color:var(--t3)">To</span>
          <span style="font-size:0.85rem;font-weight:700;color:var(--t1)">${name}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:0.75rem;color:var(--t3)">UPI ID</span>
          <span style="font-size:0.82rem;font-weight:600;color:var(--violet-lt);font-family:var(--fmono)">${upi}</span>
        </div>
        <div style="display:flex;justify-content:space-between">
          <span style="font-size:0.75rem;color:var(--t3)">Amount</span>
          <span style="font-size:1rem;font-weight:800;color:var(--emerald-lt)">${formatCurrency(amount)}</span>
        </div>
      </div>
    `;
  }

  // Record transaction
  const txn = {
    id: genId('TXN'),
    name: name,
    upi: upi,
    amount: Number(amount),
    type: 'debit',
    status: withWarning ? 'warn' : 'safe',
    time: new Date().toISOString(),
    init: name.substring(0, 2).toUpperCase(),
    color: withWarning ? '#fbbf24' : '#7c3aed'
  };

  Store.push('transactions', txn);
  FraudEngine.addKnownPayee(upi);

  const refId = txn.id;
  showToast(`Transaction ${refId} verified — opening UPI app...`, withWarning ? 'warning' : 'success');
  openModal('successModal');

  // Auto-open UPI app after a short delay
  setTimeout(() => {
    openUpiApp(upiLink);
  }, 800);
}

// ---- Reset Form ----
function resetForm() {
  document.getElementById('transferForm')?.reset();
  document.getElementById('upiStatus').textContent = '';
  document.getElementById('upiHint').textContent = '';
  document.getElementById('amountWarning').textContent = '';
  document.getElementById('purposeWarning').textContent = '';
  document.getElementById('riskFill').style.width = '0%';
  document.getElementById('riskLabel').textContent = 'Not Analyzed Yet';
  document.getElementById('riskFactors').innerHTML = '';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Set min date for form
  const upiInput = document.getElementById('upiId');
  if (upiInput) upiInput.focus();
});
