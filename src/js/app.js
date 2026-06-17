/* =====================================================
   WEBCRAFT — Main JavaScript
   ===================================================== */

// ── NAVBAR SCROLL ──────────────────────────────────────
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar?.classList.add('scrolled');
    backToTop?.classList.add('visible');
  } else {
    navbar?.classList.remove('scrolled');
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── HAMBURGER MENU ────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const [a,b,c] = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    a.style.transform = 'rotate(45deg) translate(5px,5px)';
    b.style.opacity = '0';
    c.style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    a.style.transform = '';
    b.style.opacity = '';
    c.style.transform = '';
  }
});

// ── REVEAL ON SCROLL ─────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION ──────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(bar => {
        const target = bar.dataset.width || '0%';
        setTimeout(() => bar.style.width = target, 200);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-section').forEach(s => barObserver.observe(s));

// ── STAT COUNTER ─────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * ease) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stats-grid').forEach(g => counterObserver.observe(g));

// ── TABS ─────────────────────────────────────────────
document.querySelectorAll('.tabs').forEach(tabGroup => {
  tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.tabs-wrapper') || document;
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.getElementById(target)?.classList.add('active');
    });
  });
});

// ── ACCORDION ─────────────────────────────────────────
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── COPY CODE ─────────────────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const block = btn.closest('.code-block');
    const text = block.querySelector('code')?.textContent || block.textContent.replace('Copiar','').trim();
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ Copiado!';
      setTimeout(() => btn.textContent = 'Copiar', 2000);
    });
  });
});

// ── TOAST ─────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const container = document.querySelector('.toast-container') || (() => {
    const c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();

  const icons = { success: '✅', error: '❌', info: '💡', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── MODAL ─────────────────────────────────────────────
document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modal = document.getElementById(trigger.dataset.modal);
    modal?.classList.add('open');
  });
});

document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === el) el.closest('.modal-overlay')?.classList.remove('open');
  });
});

// ── QUIZ ─────────────────────────────────────────────
const quizData = [
  {
    q: "Qual linguagem é responsável pela estrutura de uma página web?",
    opts: ["CSS", "JavaScript", "HTML", "PHP"],
    ans: 2,
    exp: "HTML (HyperText Markup Language) define a estrutura e o conteúdo de uma página web."
  },
  {
    q: "O que significa CSS?",
    opts: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Scripts", "Coded Style Syntax"],
    ans: 1,
    exp: "CSS significa Cascading Style Sheets — folhas de estilo em cascata, responsável pelo visual da página."
  },
  {
    q: "Qual método JavaScript seleciona um elemento pelo ID?",
    opts: ["querySelector()", "getElement()", "getElementById()", "selectById()"],
    ans: 2,
    exp: "getElementById() retorna o elemento com o ID especificado."
  },
  {
    q: "O que é o GitHub Pages?",
    opts: ["Um editor de código online", "Um serviço de hospedagem gratuita de sites estáticos", "Um framework JavaScript", "Uma extensão do VS Code"],
    ans: 1,
    exp: "GitHub Pages hospeda gratuitamente sites estáticos diretamente de repositórios do GitHub."
  },
  {
    q: "Qual propriedade CSS é usada para criar layouts flexíveis?",
    opts: ["display: block", "display: flex", "display: table", "display: inline"],
    ans: 1,
    exp: "Flexbox (display: flex) é um modelo de layout CSS para distribuir espaço entre itens."
  }
];

let quizState = { current: 0, score: 0, answered: false };

function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const { current, score } = quizState;

  if (current >= quizData.length) {
    const pct = Math.round((score / quizData.length) * 100);
    container.innerHTML = `
      <div class="quiz-card" style="text-align:center">
        <div style="font-size:4rem;margin-bottom:1rem">${pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}</div>
        <h3 style="margin-bottom:.5rem">Quiz Concluído!</h3>
        <p style="font-size:1.2rem;color:var(--cyan);margin-bottom:.5rem">
          ${score}/${quizData.length} — ${pct}%
        </p>
        <p style="color:var(--muted);margin-bottom:2rem">
          ${pct >= 80 ? 'Excelente! Você domina os fundamentos!' : pct >= 60 ? 'Bom trabalho! Continue estudando.' : 'Continue praticando para melhorar!'}
        </p>
        <button class="btn btn-primary" onclick="resetQuiz()">Tentar Novamente</button>
      </div>`;
    return;
  }

  const q = quizData[current];
  const progress = ((current) / quizData.length) * 100;

  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progress}%"></div></div>
      <div style="font-family:var(--font-mono);font-size:.8rem;color:var(--muted);margin-bottom:1rem">
        Pergunta ${current + 1} de ${quizData.length} • Pontuação: ${score}
      </div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((opt, i) => `
          <button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>
        `).join('')}
      </div>
      <div id="quiz-feedback" class="quiz-feedback" style="display:none"></div>
      <div style="margin-top:1.5rem;text-align:right">
        <button id="quiz-next" class="btn btn-primary" style="display:none" onclick="nextQuestion()">
          ${current + 1 === quizData.length ? 'Ver Resultado' : 'Próxima →'}
        </button>
      </div>
    </div>`;
}

function answerQuiz(idx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizData[quizState.current];
  const opts = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');

  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    else if (i === idx && idx !== q.ans) btn.classList.add('wrong');
  });

  const correct = idx === q.ans;
  if (correct) quizState.score++;

  feedback.style.display = 'block';
  feedback.className = `quiz-feedback ${correct ? 'correct' : 'wrong'}`;
  feedback.textContent = (correct ? '✓ Correto! ' : '✗ Incorreto. ') + q.exp;

  document.getElementById('quiz-next').style.display = 'inline-flex';
}

function nextQuestion() {
  quizState.current++;
  quizState.answered = false;
  renderQuiz();
}

function resetQuiz() {
  quizState = { current: 0, score: 0, answered: false };
  renderQuiz();
}

// ── THEME TOGGLE ─────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  showToast(document.body.classList.contains('light-mode') ? 'Modo claro ativado' : 'Modo escuro ativado', 'info');
});

// ── CHIP FILTER ──────────────────────────────────────
document.querySelectorAll('.filter-chips').forEach(group => {
  group.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      const container = document.querySelector(group.dataset.target);
      if (!container) return;
      container.querySelectorAll('[data-category]').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
      });
    });
  });
});

// ── AUDIO PLAYER ─────────────────────────────────────
function initAudioPlayer() {
  const audio = document.getElementById('bg-audio');
  if (!audio) return;

  const playBtn  = document.getElementById('audio-play');
  const progress = document.getElementById('audio-progress');
  const timeEl   = document.getElementById('audio-time');

  function updateTime() {
    const cur  = formatTime(audio.currentTime);
    const dur  = formatTime(audio.duration || 0);
    if (timeEl) timeEl.textContent = `${cur} / ${dur}`;
    if (progress) progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  }

  playBtn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      playBtn.innerHTML = '⏸';
    } else {
      audio.pause();
      playBtn.innerHTML = '▶';
    }
  });

  progress?.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
  });

  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('ended', () => playBtn && (playBtn.innerHTML = '▶'));
}

function formatTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

// ── CONTACT FORM ─────────────────────────────────────
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Mensagem enviada com sucesso! 🚀', 'success');
  e.target.reset();
});

// ── NEWSLETTER FORM ──────────────────────────────────
document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Inscrição realizada! Bem-vindo(a) 🎉', 'success');
  e.target.reset();
});

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderQuiz();
  initAudioPlayer();

  // highlight active nav
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});

// Expose globals for inline HTML calls
window.answerQuiz = answerQuiz;
window.nextQuestion = nextQuestion;
window.resetQuiz = resetQuiz;
window.showToast = showToast;