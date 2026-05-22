/**
 * ============================================================
 *  OPTIEVAL — LÓGICA PRINCIPAL DEL EXAMEN
 *  Archivo: js/exam.js
 * ============================================================
 */

/* ============================================================
   DATOS DE LAS PRUEBAS
   ============================================================ */

/** Agudeza Snellen por celda (columna + fila). Editable en un solo lugar. */
const ACUITY_SNELLEN_BY_CELL = {
  A: { 1: '20/20',  2: '20/40',  3: '20/70' },
  B: { 1: '20/25',  2: '20/50',  3: '20/100' },
  C: { 1: '20/30',  2: '20/60',  3: '20/200' },
};

function buildAcuityColumns(config) {
  const columns = {};
  ['A', 'B', 'C'].forEach(col => {
    columns[col] = config[col].map(({ row, number }) => ({
      row,
      number,
      snellen: ACUITY_SNELLEN_BY_CELL[col][row],
    }));
  });
  return columns;
}

window.getAcuitySnellen = function(col, row) {
  if (col === 'NR' || !row) return 'N/R';
  return ACUITY_SNELLEN_BY_CELL[col]?.[row] || '';
};

const TESTS = [

  // ── PRUEBA 1: Agudeza Visual Lejana – Ojo Derecho ──────────
  {
    id: 1,
    badge: 'Visión Lejana',
    title: 'Agudeza visual lejana — Ojo derecho',
    desc: 'Usted observará números. Por favor indíqueme cuáles ve en este momento. Seleccione la opción que corresponde a lo observado por el candidato.',
    type: 'acuity',
    columns: buildAcuityColumns({
      A: [{ row: 1, number: '547638' }, { row: 2, number: '795823' }, { row: 3, number: '9574' }],
      B: [{ row: 1, number: '428576' }, { row: 2, number: '357248' }, { row: 3, number: '92' }],
      C: [{ row: 1, number: '943852' }, { row: 2, number: '7236'   }, { row: 3, number: '5' }],
    }),
  },

  // ── PRUEBA 2: Agudeza Visual Lejana – Ojo Izquierdo ────────
  {
    id: 2,
    badge: 'Visión Lejana',
    title: 'Agudeza visual lejana — Ojo izquierdo',
    desc: 'Usted observará números. Por favor indíqueme cuáles ve en este momento. Seleccione la opción que corresponde a lo observado por el candidato.',
    type: 'acuity',
    columns: buildAcuityColumns({
      A: [{ row: 1, number: '745932' }, { row: 2, number: '534268' }, { row: 3, number: '8453' }],
      B: [{ row: 1, number: '578236' }, { row: 2, number: '752386' }, { row: 3, number: '85' }],
      C: [{ row: 1, number: '346752' }, { row: 2, number: '6254'   }, { row: 3, number: '3' }],
    }),
  },

  // ── PRUEBA 3: Agudeza Visual Lejana – Ambos Ojos ───────────
  {
    id: 3,
    badge: 'Visión Lejana',
    title: 'Agudeza visual lejana — Ambos ojos',
    desc: 'Usted observará números. Por favor indíqueme cuáles ve en este momento. Seleccione la opción que corresponde a lo observado por el candidato.',
    type: 'acuity',
    columns: buildAcuityColumns({
      A: [{ row: 1, number: '857432' }, { row: 2, number: '563472' }, { row: 3, number: '2978' }],
      B: [{ row: 1, number: '674235' }, { row: 2, number: '859423' }, { row: 3, number: '43' }],
      C: [{ row: 1, number: '382457' }, { row: 2, number: '8927'   }, { row: 3, number: '9' }],
    }),
  },

  // ── PRUEBA 4: Phorias Lejanas ───────────────────────────────
  {
    id: 4,
    badge: 'Binocularidad',
    title: 'Phorias lejanas',
    desc: 'Usted observará dos líneas que se cruzan (roja y verde). Indique en qué punto se interceptan las dos líneas. Seleccione los puntos donde se cruzan.',
    type: 'phorias',
  },

  // ── PRUEBA 5: Estereopsis ───────────────────────────────────
  {
    id: 5,
    badge: 'Visión 3D',
    title: 'Estereopsis',
    desc: 'A continuación, usted verá 5 filas enumeradas del 1 al 5. En cada fila existe una figura que resalta entre las demás. La figura puede estar cercana o lejana. Identifique en cada fila cuál es.',
    type: 'stereopsis',
    figureLevels: [
      { line: 1, percent: 10, shape: 'square', label: 'L-1. 10% Cuadrado' },
      { line: 2, percent: 30, shape: 'heart', label: 'L-2. 30% Corazon' },
      { line: 3, percent: 60, shape: 'plus', label: 'L-3. 60% Cruz' },
      { line: 4, percent: 75, shape: 'star', label: 'L-4. 75% Estrella' },
      { line: 5, percent: 85, shape: 'plus', label: 'L-5. 85% Cruz' },
    ],
  },

  // ── PRUEBA 6: Discriminación al Color ──────────────────────
  {
    id: 6,
    badge: 'Percepción Cromática',
    title: 'Discriminación al color',
    desc: 'De izquierda a derecha, indique qué números ve dentro de cada círculo o cuadrado según corresponda.',
    type: 'color',
    circles: [
      { bg: 'green-red', number: '32' },
      { bg: 'orange',    number: '79' },
      { bg: 'green-red', number: '23' },
      { bg: 'purple',    number: '92' },
      { bg: 'purple',    number: '56' },
      { bg: 'purple',    number: '63' },
    ]
  },

  // ── PRUEBA 7: Campo Visual ──────────────────────────────────
  {
    id: 7,
    badge: 'Visión Periférica',
    title: 'Campo Visual',
    desc: 'A continuación se encenderán luces en la parte exterior del equipo. Cada vez que se encienda una luz, indique si la ve en la parte superior, inferior, cerca o lejos de la nariz.',
    type: 'campo',
    angles: {
      izquierda: [85, 70, 55, 45],
      derecha:   [85, 70, 55, 45],
    }
  },

  // ── PRUEBA 8: Agudeza Visual Cercana – Ojo Derecho ─────────
  {
    id: 8,
    badge: 'Visión Cercana',
    title: 'Agudeza visual cercana — Ojo derecho',
    desc: 'Usted observará números. Por favor indíqueme cuáles ve en este momento. Seleccione la opción que corresponde a lo observado por el candidato.',
    type: 'acuity',
    columns: buildAcuityColumns({
      A: [{ row: 1, number: '547638' }, { row: 2, number: '795823' }, { row: 3, number: '9574' }],
      B: [{ row: 1, number: '428576' }, { row: 2, number: '357248' }, { row: 3, number: '92' }],
      C: [{ row: 1, number: '943852' }, { row: 2, number: '7236'   }, { row: 3, number: '5' }],
    }),
  },

  // ── PRUEBA 9: Agudeza Visual Cercana – Ojo Izquierdo ───────
  {
    id: 9,
    badge: 'Visión Cercana',
    title: 'Agudeza visual cercana — Ojo izquierdo',
    desc: 'Usted observará números. Por favor indíqueme cuáles ve en este momento. Seleccione la opción que corresponde a lo observado por el candidato.',
    type: 'acuity',
    columns: buildAcuityColumns({
      A: [{ row: 1, number: '745932' }, { row: 2, number: '534268' }, { row: 3, number: '8453' }],
      B: [{ row: 1, number: '578236' }, { row: 2, number: '752386' }, { row: 3, number: '85' }],
      C: [{ row: 1, number: '346752' }, { row: 2, number: '6254'   }, { row: 3, number: '3' }],
    }),
  },

  // ── PRUEBA 10: Agudeza Visual Cercana – Ambos Ojos ─────────
  {
    id: 10,
    badge: 'Visión Cercana',
    title: 'Agudeza visual cercana — Ambos ojos',
    desc: 'Usted observará números. Por favor indíqueme cuáles ve en este momento. Seleccione la opción que corresponde a lo observado por el candidato.',
    type: 'acuity',
    columns: buildAcuityColumns({
      A: [{ row: 1, number: '857432' }, { row: 2, number: '563472' }, { row: 3, number: '2978' }],
      B: [{ row: 1, number: '674235' }, { row: 2, number: '859423' }, { row: 3, number: '43' }],
      C: [{ row: 1, number: '382457' }, { row: 2, number: '8927'   }, { row: 3, number: '9' }],
    }),
  },

  // ── PRUEBA 11: Phorias Cercanas ────────────────────────────
  {
    id: 11,
    badge: 'Binocularidad',
    title: 'Phorias cercanas',
    desc: 'Usted observará dos líneas que se cruzan (roja y verde). Indique en qué punto se interceptan las dos líneas. Seleccione los puntos donde se cruzan.',
    type: 'phorias',
  },

  // ── PRUEBA 12: Encandilamiento ─────────────────────────────
  {
    id: 12,
    badge: 'Recuperación Visual',
    title: 'Encandilamiento AV — Recuperación al encandilamiento',
    desc: 'A continuación verá 3 filas. Observará una luz; cuando la luz se apague, indíqueme la línea 1. Si no ve la línea 1, indíqueme la línea 2. Si no ve la línea 2, indíqueme la línea 3. Indique también cuántos segundos tardó el aspirante en leer la línea.',
    type: 'encandilamiento',
    filas: [
      { num: 1, number: '2651439' },
      { num: 2, number: '8294635' },
      { num: 3, number: '6395274' },
    ]
  },

];

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
let currentStep    = 0;
let goingBack      = false;
const answers      = {};
const completed    = new Array(TESTS.length).fill(false);

/* ============================================================
   DOM REFS
   ============================================================ */
const slideContainer = document.getElementById('slideContainer');
const stepsIndicator = document.getElementById('stepsIndicator');
const headerSteps    = document.getElementById('headerSteps');
const progressBar    = document.getElementById('progressBar');
const btnPrev        = document.getElementById('btnPrev');
const btnNext        = document.getElementById('btnNext');
const btnConfirm     = document.getElementById('btnConfirm');
const btnCancel      = document.getElementById('btnCancel');
const modalResult    = document.getElementById('modalResult');
const modalCancel    = document.getElementById('modalCancel');

/* ============================================================
   INIT
   ============================================================ */
bootstrap();

function bootstrap() {
  if (!hasRequiredDependencies()) {
    slideContainer.innerHTML = '<div class="slide">Error de configuración: faltan módulos requeridos.</div>';
    btnNext.disabled = true;
    btnPrev.disabled = true;
    btnConfirm.disabled = true;
    return;
  }
  buildStepIndicators();
  renderSlide(0);
  updateNav();
}

function hasRequiredDependencies() {
  const renderers = window.OptievalRenderers || {};
  const logic = window.OptievalLogic || {};
  const requiredRenderers = [
    'renderAcuity',
    'renderPhorias',
    'renderStereopsis',
    'renderColor',
    'renderCampo',
    'renderEncandilamiento',
    'drawIshihara',
  ];
  const hasRenderers = requiredRenderers.every(name => typeof renderers[name] === 'function');
  const hasLogic = typeof logic.bindEvents === 'function' && typeof logic.restoreAnswer === 'function';
  const hasScoring = typeof window.calcularPuntajeTotal === 'function';
  return hasRenderers && hasLogic && hasScoring;
}

/* ============================================================
   STEP INDICATORS
   ============================================================ */
function buildStepIndicators() {
  stepsIndicator.innerHTML = '';
  TESTS.forEach((test, idx) => {
    const dot = document.createElement('div');
    dot.className = 'step-dot' + (idx === 0 ? ' active' : '');
    dot.id = `dot-${idx}`;
    dot.textContent = idx + 1;
    stepsIndicator.appendChild(dot);

    if (idx < TESTS.length - 1) {
      const conn = document.createElement('div');
      conn.className = 'step-connector';
      conn.id = `conn-${idx}`;
      stepsIndicator.appendChild(conn);
    }
  });
}

function updateStepIndicators() {
  TESTS.forEach((_, idx) => {
    const dot  = document.getElementById(`dot-${idx}`);
    const conn = document.getElementById(`conn-${idx}`);

    dot.className = 'step-dot';
    if (idx === currentStep)  dot.classList.add('active');
    if (completed[idx]) {
      dot.classList.add('completed');
      dot.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else {
      dot.textContent = idx + 1;
    }

    if (conn) {
      conn.className = 'step-connector' + (completed[idx] ? ' completed' : '');
    }
  });
}

/* ============================================================
   RENDER SLIDE
   ============================================================ */
function renderSlide(idx) {
  const test = TESTS[idx];
  const renderers = window.OptievalRenderers || {};
  let html = '';

  switch (test.type) {
    case 'acuity':          html = renderers.renderAcuity(test); break;
    case 'phorias':         html = renderers.renderPhorias(test); break;
    case 'stereopsis':      html = renderers.renderStereopsis(test); break;
    case 'color':           html = renderers.renderColor(test); break;
    case 'campo':           html = renderers.renderCampo(test); break;
    case 'encandilamiento': html = renderers.renderEncandilamiento(test); break;
    default:                html = '';
  }

  if (!html) {
    slideContainer.innerHTML = '<div class="slide">No se pudo renderizar esta prueba.</div>';
    return;
  }

  const slideClass = `slide${goingBack ? ' going-back' : ''}`;
  slideContainer.innerHTML = `
    <div class="${slideClass}" id="currentSlide">
      <div class="slide-header">
        <div class="slide-badge">${test.badge}</div>
        <h1 class="slide-title">${test.title}</h1>
        <p class="slide-desc">${test.desc}</p>
      </div>
      ${html}
    </div>
  `;

  // Restore saved answer
  const logic = window.OptievalLogic || {};
  if (typeof logic.restoreAnswer === 'function') {
    logic.restoreAnswer(test, answers);
  }

  // Bind events
  if (typeof logic.bindEvents === 'function') {
    logic.bindEvents(test, {
      answers,
      markComplete,
      getCurrentStep: () => currentStep,
    });
  }

  // Post-render (canvas, etc)
  if (test.type === 'color' && typeof renderers.drawIshihara === 'function') {
    renderers.drawIshihara();
  }
}

/* ============================================================
   MARK COMPLETE
   ============================================================ */
function markComplete(idx) {
  completed[idx] = true;
  updateStepIndicators();
  updateNav();
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function updateNav() {
  const isFirst = currentStep === 0;
  const isLast  = currentStep === TESTS.length - 1;
  const allDone = completed.every(Boolean);

  btnPrev.disabled = isFirst;

  if (isLast) {
    btnNext.classList.add('hidden');
    btnConfirm.classList.remove('hidden');
    btnConfirm.disabled = !allDone;
  } else {
    btnNext.classList.remove('hidden');
    btnConfirm.classList.add('hidden');
    btnConfirm.disabled = true;
  }

  const pct = (completed.filter(Boolean).length / TESTS.length) * 100;
  progressBar.style.width = pct + '%';
  headerSteps.textContent = `Prueba ${currentStep + 1} de ${TESTS.length}`;
}

btnNext.addEventListener('click', () => {
  if (!completed[currentStep]) {
    showRequiredMsg(); return;
  }
  goToStep(currentStep + 1, false);
});

btnPrev.addEventListener('click', () => {
  goToStep(currentStep - 1, true);
});

btnConfirm.addEventListener('click', () => {
  if (!completed.every(Boolean)) { showRequiredMsg(); return; }
  finalizeExam();
});

/* ============================================================
   REQUIRED MSG
   ============================================================ */
function showRequiredMsg() {
  const old = document.querySelector('.required-msg');
  if (old) old.remove();
  const msg = document.createElement('div');
  msg.className = 'required-msg';
  msg.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    Complete todos los campos antes de continuar.
  `;
  document.querySelector('.nav-actions').insertAdjacentElement('beforebegin', msg);
  setTimeout(() => msg.remove(), 3000);
}

/* ============================================================
   RESULT MODAL
   ============================================================ */
async function finalizeExam() {
  // Map answers to scoring format
  const scoringAnswers = { ...answers };

  const breakdown = typeof window.calcularResumenFinal === 'function'
    ? window.calcularResumenFinal(scoringAnswers)
    : (window.calcularPuntajeTotal(scoringAnswers).breakdown || []).map(x => ({ ...x, status: 'N/A', detail: '' }));

  // Guardar en 1 archivo (servidor local XAMPP) o fallback a descarga
  await saveResultFile({ answers: scoringAnswers, breakdown, completedAt: new Date().toISOString() });

  const bd = document.getElementById('resultBreakdown');
  bd.innerHTML = breakdown.map(item => {
    const statusClass = item.status === 'PASA' ? 'status-pasa' : (item.status === 'NO PASA' ? 'status-nopasa' : '');
    // Pruebas 1,2,3,8,9,10: Snellen en columna central | PASA alineado a la derecha
    if (item.isAcuity) {
      const snellen = item.snellen || (item.detail || '').replace(/^\(|\)$/g, '');
      return `
    <div class="breakdown-item breakdown-item--acuity">
      <span class="b-col-name">${item.name}</span>
      <span class="b-col-mid b-col-snellen">${snellen ? `(${snellen})` : ''}</span>
      <span class="b-col-status ${statusClass}">${item.status}</span>
    </div>`;
    }
    const midHtml = item.detail
      ? `<span class="b-col-mid b-col-detail">${item.detail}</span>`
      : `<span class="b-col-mid"></span>`;
    return `
    <div class="breakdown-item">
      <span class="b-col-name">${item.name}</span>
      ${midHtml}
      <span class="b-col-status ${statusClass}">${item.status}</span>
    </div>`;
  }).join('');

  modalResult.classList.remove('hidden');
}

async function saveResultFile(payload) {
  // 1) Intento: guardar en carpeta interna vía PHP (XAMPP)
  try {
    const res = await fetch('save_result.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json && json.ok) return true;
  } catch (_) {
    // ignore and fallback
  }

  // 2) Fallback: descarga automática (si el navegador lo permite)
  try {
    const text = `OptiEval - Resultado\nFecha: ${new Date().toISOString()}\nDATA_JSON=${JSON.stringify(payload)}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `optieval_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  } catch (_) {
    return false;
  }
}

function animateNumber(id, target) {
  const el = document.getElementById(id);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 40);
}

/* ============================================================
   CANCEL
   ============================================================ */
btnCancel.addEventListener('click', () => {
  modalCancel.classList.remove('hidden');
});

document.getElementById('btnCancelNo').addEventListener('click', () => {
  modalCancel.classList.add('hidden');
});

document.getElementById('btnCancelYes').addEventListener('click', () => {
  modalCancel.classList.add('hidden');
  resetExam();
});

/* ============================================================
   PRINT
   ============================================================ */
document.getElementById('btnPrint').addEventListener('click', () => {
  window.print();
});

/* ============================================================
   NEW EXAM
   ============================================================ */
document.getElementById('btnNewExam').addEventListener('click', () => {
  modalResult.classList.add('hidden');
  resetExam();
});

function resetExam() {
  currentStep = 0;
  goingBack   = false;
  Object.keys(answers).forEach(k => delete answers[k]);
  completed.fill(false);
  buildStepIndicators();
  renderSlide(0);
  updateNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToStep(targetStep, isGoingBack) {
  if (targetStep < 0 || targetStep >= TESTS.length) return;
  goingBack = isGoingBack;
  currentStep = targetStep;
  renderSlide(currentStep);
  updateStepIndicators();
  updateNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   CLOSE MODALS ON OVERLAY CLICK
   ============================================================ */
[modalResult, modalCancel].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});
