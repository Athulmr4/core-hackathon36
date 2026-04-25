/* ====================================================
   FraudShield – learn.js  v2 (SVG icons, no emojis)
   ==================================================== */

const LESSONS = [
  {
    id: 'L001', cat: 'scams', thumb: 't-crimson',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
    title: 'What is Phishing?',
    desc: 'Learn to spot fake emails and messages that try to steal your banking details.',
    time: '3 min', level: 'easy', xp: 20,
    content: `
      <h3>What is Phishing?</h3>
      <p>Phishing is when scammers send you fake messages — emails, SMS, or WhatsApp — pretending to be your bank, government, or a trusted company. Their goal is to trick you into clicking a link and entering your password, OTP, or card number.</p>
      <div class="lesson-highlight">
        <strong>Real Example:</strong> You receive an SMS saying "Your SBI account will be blocked! Click here to verify: sbi-secure-login.tk". This is a fake site designed to steal your credentials.
      </div>
      <p>How to identify phishing:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>Check the sender's number — banks use official shortcodes</li>
        <li>Hover over any link — see if the real URL looks suspicious</li>
        <li>Real banks NEVER ask for OTP via SMS or WhatsApp</li>
        <li>Watch for urgency — "Act now or lose access!"</li>
      </ul>
      <div class="lesson-rule">Golden Rule: If in doubt, don't click. Call your bank directly from their official number.</div>
    `
  },
  {
    id: 'L002', cat: 'scams', thumb: 't-amber',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    title: 'OTP Fraud — Never Share It',
    desc: 'Understand how scammers trick you into sharing your One-Time Password.',
    time: '4 min', level: 'easy', xp: 20,
    content: `
      <h3>OTP Fraud — Never Share It</h3>
      <p>Your OTP (One-Time Password) is the last line of defense protecting your bank account. Scammers know this, which is why tricking you into sharing it is their #1 technique.</p>
      <div class="lesson-highlight">
        <strong>Common Trick:</strong> Someone calls claiming to be from your bank. They say there's suspicious activity and need to "verify" your account. They ask for an OTP sent to your phone. The moment you share it, they drain your account.
      </div>
      <p>Remember these facts:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>No bank employee will EVER ask for your OTP</li>
        <li>No government official needs your OTP</li>
        <li>OTPs expire in 30–60 seconds — scammers need yours right now</li>
        <li>If someone is pressuring you for an OTP, hang up immediately</li>
      </ul>
      <div class="lesson-rule">Golden Rule: OTP = One Thought: NEVER share it with anyone, ever.</div>
    `
  },
  {
    id: 'L003', cat: 'scams', thumb: 't-violet',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`,
    title: 'Vishing — Fake Phone Calls',
    desc: 'Learn how scammers use phone calls to impersonate authorities and trick you.',
    time: '4 min', level: 'medium', xp: 25,
    content: `
      <h3>Vishing — Voice Phishing</h3>
      <p>Vishing (voice phishing) is when criminals call you pretending to be from the RBI, police, telecom company, or your bank. They create panic and urgency to make you act without thinking.</p>
      <div class="lesson-highlight">
        <strong>Common Vishing Script:</strong> "This is the Cyber Crime Division. We have found illegal transactions linked to your Aadhaar. To avoid arrest, transfer your savings to a 'safe government account' immediately."
      </div>
      <p>This is 100% a scam. No legitimate authority ever:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>Asks you to transfer money to avoid arrest</li>
        <li>Demands payment over the phone</li>
        <li>Threatens "digital arrest" or remote monitoring</li>
        <li>Asks for UPI transfer to "Government accounts"</li>
      </ul>
      <div class="lesson-rule">Golden Rule: Hang up. Call the official number back. Real authorities never cold-call for money.</div>
    `
  },
  {
    id: 'L004', cat: 'payments', thumb: 't-emerald',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    title: 'Safe UPI Payments',
    desc: 'Learn how to verify UPI IDs and send money safely using any UPI app.',
    time: '5 min', level: 'easy', xp: 20,
    content: `
      <h3>Safe UPI Payments</h3>
      <p>UPI has made payments easy, but it has also made it easier for scammers to steal from you. Knowing how UPI works helps you avoid common traps.</p>
      <div class="lesson-highlight">
        <strong>Key Rule:</strong> To RECEIVE money, you NEVER need to enter your UPI PIN. If someone asks you to enter your PIN to receive a refund, they are stealing money FROM you.
      </div>
      <p>Safe payment practices:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>Always verify the recipient's name before confirming payment</li>
        <li>Be suspicious of UPI IDs with words like "winner", "prize", "reward"</li>
        <li>Never scan a QR code from an untrusted source</li>
        <li>Double check the amount — scammers change amounts at last second</li>
        <li>Set daily transaction limits in your UPI app</li>
      </ul>
      <div class="lesson-rule">Golden Rule: You only need your UPI PIN to SEND money. Never for receiving.</div>
    `
  },
  {
    id: 'L005', cat: 'payments', thumb: 't-teal',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6a6 6 0 100 12A6 6 0 0012 6z"/><circle cx="12" cy="12" r="2"/></svg>`,
    title: 'Spotting Fake Banking Apps',
    desc: 'Discover how to identify malicious apps disguised as your bank\'s official app.',
    time: '4 min', level: 'medium', xp: 25,
    content: `
      <h3>Spotting Fake Banking Apps</h3>
      <p>Scammers create fake apps that look identical to your bank's real app. Once installed, they steal your login credentials and take over your account.</p>
      <div class="lesson-highlight">
        <strong>Warning Signs:</strong> The app has few downloads, poor reviews, a slightly different name (e.g. "SBI Mobile Bankin" instead of "YONO SBI"), or asks for permissions it doesn't need (camera, contacts, SMS).
      </div>
      <p>How to stay safe:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>Only install banking apps from the official Google Play Store or Apple App Store</li>
        <li>Check the developer name — must match your bank's official name</li>
        <li>Look at number of downloads — official bank apps have millions</li>
        <li>Never install a banking app from a link sent via SMS or WhatsApp</li>
      </ul>
      <div class="lesson-rule">Golden Rule: Only install banking apps from official app stores. Never from links.</div>
    `
  },
  {
    id: 'L006', cat: 'passwords', thumb: 't-violet',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
    title: 'Creating Strong Passwords',
    desc: 'Build uncrackable passwords and learn why you should never reuse them.',
    time: '3 min', level: 'easy', xp: 20,
    content: `
      <h3>Creating Strong Passwords</h3>
      <p>Your password is the first — and often only — barrier protecting your money. Weak or reused passwords are how most accounts get hacked.</p>
      <div class="lesson-highlight">
        <strong>Weak passwords:</strong> "12345678", "password", "rahul123", your birthday. These can be cracked in seconds.
        <br/><br/>
        <strong>Strong password:</strong> "Mango$River#42!" — 16 characters, mixed case, numbers, symbols.
      </div>
      <p>Password rules to follow:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>Use at least 12 characters</li>
        <li>Mix uppercase, lowercase, numbers, and symbols</li>
        <li>Never use personal info (name, birthday, phone number)</li>
        <li>Use a DIFFERENT password for every account</li>
        <li>Change your banking password every 3 months</li>
      </ul>
      <div class="lesson-rule">Golden Rule: A strong password = words + numbers + symbols + length.</div>
    `
  },
  {
    id: 'L007', cat: 'passwords', thumb: 't-sky',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Two-Factor Authentication',
    desc: 'Why enabling 2FA on your banking app adds a critical second layer of protection.',
    time: '3 min', level: 'easy', xp: 20,
    content: `
      <h3>Two-Factor Authentication (2FA)</h3>
      <p>Two-factor authentication means that even if someone knows your password, they can't log in without a second verification — usually an OTP sent to your phone or a biometric like fingerprint.</p>
      <div class="lesson-highlight">
        <strong>Think of it like this:</strong> Your password is the key to the door. 2FA is a security guard who checks your face before letting you in, even if you have the key.
      </div>
      <p>Enable 2FA wherever possible:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>All banking and payments apps</li>
        <li>Email accounts linked to banking</li>
        <li>Social media (scammers use these to gather info about you)</li>
        <li>Use fingerprint/face lock on your banking app for extra security</li>
      </ul>
      <div class="lesson-rule">Golden Rule: Always enable 2FA and biometric lock on your banking apps.</div>
    `
  },
  {
    id: 'L008', cat: 'scams', thumb: 't-crimson',
    iconSvg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>`,
    title: 'KYC & Lottery Scams',
    desc: 'Why "You\'ve won!" messages are always a trap, and how to avoid them.',
    time: '3 min', level: 'easy', xp: 20,
    content: `
      <h3>KYC & Lottery Scams</h3>
      <p>These are two of the most common scams in India. Both rely on urgency and greed to make you act without thinking.</p>
      <div class="lesson-highlight">
        <strong>Lottery Scam:</strong> "Congratulations! You've won ₹10 lakhs in the KBC Lottery! Send ₹5,000 processing fee to claim your prize."<br/><br/>
        <strong>KYC Scam:</strong> "Your bank account will be blocked in 24 hours. Complete KYC update by clicking this link: sbi-kyc-update.tk"
      </div>
      <p>Why these always fail the "real" test:</p>
      <ul style="color:var(--t2);font-size:0.88rem;line-height:1.8;margin-left:1.25rem">
        <li>You can never win a lottery you didn't enter</li>
        <li>Legitimate prize winners are never asked to pay first</li>
        <li>Banks NEVER send KYC links via SMS or WhatsApp</li>
        <li>Real KYC is always done at a bank branch or official app</li>
      </ul>
      <div class="lesson-rule">Golden Rule: Real prizes don't require payment. Real KYC never happens over SMS links.</div>
    `
  }
];

const QUIZ = [
  { q: 'A message says "Your SBI account will close in 24hrs! Click to update KYC". What should you do?', opts: ['Click the link immediately', 'Share the link with family', 'Call SBI\'s official number from their website', 'Reply to the SMS asking for more info'], correct: 2, exp: 'Correct! Always call the bank\'s official number. Banks never send KYC links via SMS.' },
  { q: 'Someone calling from "RBI" says you need to transfer money to a "safe account" to avoid arrest. What do you do?', opts: ['Transfer the money — it\'s the government!', 'Ask them to call back', 'Hang up immediately and call the police (100)', 'Give them your account details to verify'], correct: 2, exp: 'Right! RBI and government officials NEVER ask for money transfers over the phone. This is Vishing.' },
  { q: 'To RECEIVE a UPI refund, the merchant asks you to enter your UPI PIN. What should you do?', opts: ['Enter the PIN — it\'s needed to receive money', 'Share the PIN via WhatsApp', 'Refuse — you never need a PIN to receive money', 'Enter a wrong PIN to test them'], correct: 2, exp: 'Exactly! UPI PIN is ONLY needed to SEND money. Asking for your PIN to "receive" is a scam.' },
  { q: 'You receive a message: "Congratulations! You\'ve won ₹5 lakh in a lucky draw. Pay ₹2000 to claim." What is this?', opts: ['A genuine prize — pay quickly so you don\'t miss it', 'A lottery scam — real prizes never require upfront payment', 'A government scheme', 'Your bank rewarding you'], correct: 1, exp: 'Correct! Real prizes never require upfront fees. This is a classic advance-fee lottery scam.' },
  { q: 'Which of these passwords is the STRONGEST?', opts: ['rahul1990', 'password123', 'P@ssw0rd', 'Mango$River#42!'], correct: 3, exp: 'Right! "Mango$River#42!" is strong because it uses 15+ characters, mixed case, numbers, and symbols.' },
];

let userProgress = Store ? Store.get('learn_progress', {}) : {};
let currentCat = 'all';
let quizIdx = 0, quizScore = 0, quizAnswered = false;

function getTotalXP() { return Object.values(userProgress).filter(v => v === 'done').length * 20; }
function getCompleted() { return Object.values(userProgress).filter(v => v === 'done').length; }

function updateProgressUI() {
  const completed = getCompleted();
  const total     = LESSONS.length;
  const pct       = Math.round((completed / total) * 100);
  const xp        = getTotalXP();

  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('completedCount', completed);
  el('totalXP', xp);
  el('totalXpDisplay', xp);
  el('progressPct', pct + '% Complete');
  const fill = document.getElementById('overallProgress');
  if (fill) fill.style.width = pct + '%';
}

function renderLessons() {
  const grid = document.getElementById('lessonsGrid');
  if (!grid) return;
  const filtered = currentCat === 'all' ? LESSONS : LESSONS.filter(l => l.cat === currentCat);
  grid.innerHTML = filtered.map(l => {
    const done = userProgress[l.id] === 'done';
    return `
      <div class="lesson-card ${done ? 'completed' : ''}" onclick="openLesson('${l.id}')">
        <div class="lesson-thumb ${l.thumb}">
          ${l.iconSvg}
          ${done ? `<div class="lesson-completed-overlay"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg></div>` : ''}
        </div>
        <div class="lesson-body">
          <div class="lesson-cat">${l.cat.toUpperCase()}</div>
          <div class="lesson-title">${l.title}</div>
          <div class="lesson-desc">${l.desc}</div>
          <div class="lesson-footer">
            <span class="lesson-meta-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
              ${l.time}
            </span>
            <span class="lesson-meta-pill">${l.level}</span>
            <span class="lesson-meta-pill xp-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>
              +${l.xp} XP
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterLessons(cat, btn) {
  currentCat = cat;
  document.querySelectorAll('.mod-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const lessons  = document.getElementById('lessonsGrid');
  const quizSec  = document.getElementById('quizSection');
  if (cat === 'quiz') {
    if (lessons)  lessons.style.display = 'none';
    if (quizSec)  quizSec.style.display = 'block';
    renderQuiz();
  } else {
    if (lessons)  lessons.style.display = 'grid';
    if (quizSec)  quizSec.style.display = 'none';
    renderLessons();
  }
}

function openLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  document.getElementById('lessonModalContent').innerHTML = `
    <div style="background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(13,148,136,0.1));padding:1.75rem;border-bottom:1px solid var(--border)">
      <div class="lesson-cat" style="margin-bottom:5px">${lesson.cat.toUpperCase()}</div>
      <div style="font-family:var(--fhead);font-size:1.25rem;font-weight:800;color:var(--t1)">${lesson.title}</div>
      <div style="display:flex;gap:0.875rem;margin-top:0.875rem;flex-wrap:wrap">
        <span class="lesson-meta-pill">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
          ${lesson.time}
        </span>
        <span class="lesson-meta-pill">${lesson.level}</span>
        <span class="lesson-meta-pill xp-pill">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>
          +${lesson.xp} XP
        </span>
      </div>
    </div>
    <div class="lesson-content" style="padding:1.75rem">${lesson.content}</div>
  `;

  const done = userProgress[id] === 'done';
  document.getElementById('lessonModalFoot').innerHTML = done
    ? `<div style="display:flex;align-items:center;gap:8px;color:var(--emerald-lt);font-size:0.85rem;font-weight:600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
        Lesson completed — +${lesson.xp} XP earned
       </div>
       <button class="btn btn-ghost" onclick="closeModal('lessonModal')" style="margin-left:auto">Close</button>`
    : `<button class="btn btn-primary" onclick="completeLesson('${id}');closeModal('lessonModal')" style="flex:1">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
        Mark as Complete (+${lesson.xp} XP)
       </button>
       <button class="btn btn-ghost" onclick="closeModal('lessonModal')">Skip for now</button>`;

  openModal('lessonModal');
}

function completeLesson(id) {
  userProgress[id] = 'done';
  if (Store) Store.set('learn_progress', userProgress);
  const lesson = LESSONS.find(l => l.id === id);
  updateProgressUI();
  renderLessons();
  showToast(`Lesson complete — +${lesson?.xp || 20} XP earned!`, 'success');
}

// ---- Quiz ----
function renderQuiz() {
  const content = document.getElementById('quizContent');
  if (!content) return;
  const q = QUIZ[quizIdx];
  const optLetters = ['A', 'B', 'C', 'D'];

  content.innerHTML = `
    <div class="quiz-q-num">Question ${quizIdx + 1} of ${QUIZ.length}</div>
    <div class="quiz-question-text">${q.q}</div>
    <div class="quiz-options" id="quizOpts">
      ${q.opts.map((o, i) => `
        <button class="quiz-opt" id="qopt_${i}" onclick="answerQuiz(${i})">
          <span class="opt-num">${optLetters[i]}</span>
          ${o}
        </button>
      `).join('')}
    </div>
    <div id="quizFeedback"></div>
    <div class="quiz-nav">
      <span style="font-size:0.8rem;color:var(--t3)">${quizScore} correct so far</span>
      <button class="btn btn-primary" id="nextQuizBtn" onclick="nextQuiz()" style="display:none;font-size:0.85rem;padding:10px 22px">
        ${quizIdx < QUIZ.length - 1 ? 'Next Question' : 'See Results'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
      </button>
    </div>
  `;
  const scoreEl = document.getElementById('quizScoreDisplay');
  if (scoreEl) scoreEl.textContent = `${quizScore} / ${QUIZ.length} Correct`;
  quizAnswered = false;
}

function answerQuiz(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q   = QUIZ[quizIdx];
  const correct = idx === q.correct;
  if (correct) quizScore++;

  document.querySelectorAll('.quiz-opt').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  document.getElementById('quizFeedback').innerHTML = `
    <div class="quiz-feedback ${correct ? 'fb-correct' : 'fb-wrong'}">
      <strong>${correct ? 'Correct!' : 'Not quite.'}</strong> ${q.exp}
    </div>
  `;
  document.getElementById('nextQuizBtn').style.display = 'flex';
  const scoreEl = document.getElementById('quizScoreDisplay');
  if (scoreEl) scoreEl.textContent = `${quizScore} / ${QUIZ.length} Correct`;
}

function nextQuiz() {
  if (quizIdx < QUIZ.length - 1) {
    quizIdx++;
    renderQuiz();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const pct = Math.round((quizScore / QUIZ.length) * 100);
  const msg = pct >= 80 ? 'Outstanding! You are well equipped to stay safe.' : pct >= 60 ? 'Good work! Review the failed questions.' : 'Keep practising — your safety depends on it!';
  const col = pct >= 80 ? 'var(--emerald-lt)' : pct >= 60 ? 'var(--amber-lt)' : 'var(--crimson-lt)';

  document.getElementById('quizContent').innerHTML = `
    <div style="text-align:center;padding:2rem">
      <div style="font-size:3.5rem;font-weight:900;font-family:var(--fhead);color:${col};line-height:1;margin-bottom:0.5rem">${pct}%</div>
      <div style="font-size:1.1rem;font-weight:700;color:var(--t1);margin-bottom:0.625rem">Quiz Complete! ${quizScore}/${QUIZ.length} correct</div>
      <p style="font-size:0.88rem;color:var(--t2);line-height:1.6;max-width:380px;margin:0 auto 1.75rem">${msg}</p>
      <button class="btn btn-primary" onclick="retakeQuiz()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
        Retake Quiz
      </button>
    </div>
  `;
  showToast(`Quiz done! ${quizScore}/${QUIZ.length} correct.`, pct >= 60 ? 'success' : 'warning');
}

function retakeQuiz() { quizIdx = 0; quizScore = 0; renderQuiz(); }

document.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();
  renderLessons();
});
