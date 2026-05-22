/**
 * ============================================================
 *  OPTIEVAL — SISTEMA DE PUNTUACIÓN
 *  Archivo: js/scoring.js
 * ============================================================
 *
 *  ¿CÓMO CAMBIAR LOS PUNTAJES?
 *  ───────────────────────────
 *  Cada prueba tiene un objeto de puntuación. Modifica los
 *  valores numéricos según los criterios del consultorio.
 *
 *  Las claves de cada objeto corresponden al valor que el
 *  usuario selecciona, y el valor es el puntaje asignado.
 *
 *  PUNTAJE MÁXIMO TOTAL ACTUAL: 100 puntos
 *  (distribuidos entre las 12 pruebas)
 * ============================================================
 */

window.SCORING = {
  // ============================================================
  // CRITERIOS DE PASA / NO PASA (EDITABLE)
  // ============================================================
  passFail: {
    acuityMinPointsToPass: 6,        // 0-8 por prueba
    phoriasGreenRange: [1.5, 6.5],   // ✅ PASA si Verde (horizontal) está en este rango
    phoriasRedRange: [3.5, 5.5],     // ✅ PASA si Roja (vertical) está en este rango
    stereopsisMinPointsToPass: 10,    // 0-10 por prueba
    campoMinYesToPass: 8,            // ✅ PASA solo si Sí = 8/8
    encandilamientoTimeToPass: 'menos5', // <=5s
  },

  // ============================================================
  // Mapa Snellen (solo para mostrar en resumen)
  // ============================================================
  snellenMap: {
    A_1: '20/20',
    B_1: '20/25',
    C_1: '20/30',
    A_2: '20/40',
    B_2: '20/50',
    C_2: '20/60',
    A_3: '20/70',
    B_3: '20/100',
    C_3: '20/200',
    NR:  'N/R',
  },

  /**
   * PRUEBAS 1, 2, 3 — Agudeza visual lejana (OD, OI, AO)
   * PRUEBAS 8, 9, 10 — Agudeza visual cercana (OD, OI, AO)
   *
   * Formato: "columna_fila" → puntaje
   *   A_1 = columna A, fila 1 (6 dígitos, visión más fina)
   *   A_2 = columna A, fila 2 (intermedio)
   *   A_3 = columna A, fila 3 (pocos dígitos, visión gruesa)
   *
   * Lógica: Fila 1 = mejor agudeza → más puntos
   *         Fila 3 = menor agudeza → menos puntos
   *
   * Puntaje máximo por prueba de agudeza: ~8 pts
   * (6 pruebas × 8 = 48 pts totales de agudeza)
   */
  acuity: {
    A_1: 8,   // Columna A – Fila 1 (6 dígitos, agudeza óptima)
    A_2: 5,   // Columna A – Fila 2 (agudeza media)
    A_3: 2,   // Columna A – Fila 3 (agudeza baja)
    B_1: 7,   // Columna B – Fila 1
    B_2: 4,   // Columna B – Fila 2
    B_3: 1,   // Columna B – Fila 3
    C_1: 6,   // Columna C – Fila 1
    C_2: 3,   // Columna C – Fila 2
    C_3: 0,   // Columna C – Fila 3 (agudeza mínima)
    NR: 0,    // No responde
  },

  /**
   * PRUEBA 4 — Phorias lejanas
   * PRUEBA 11 — Phorias cercanas
   *
   * Puntuación basada en la desviación del punto neutro.
   * En foria normal: línea horizontal verde ≈ 0, vertical roja ≈ 0
   *
   * Formato: valor seleccionado → puntaje
   * Nota: A mayor desviación del 0, menor puntaje.
   *
   * Puntaje máximo por prueba de phorias: 5 pts
   * (2 pruebas × 5 = 10 pts totales de phorias)
   */
  phorias: {
    '0.0': 5,
    '0.5': 5,
    '1.0': 4,
    '1.5': 4,
    '2.0': 3,
    '2.5': 3,
    '3.0': 2,
    '3.5': 2,
    '4.0': 1,
    '4.5': 1,
    '5.0': 0,
    '5.5': 0,
    '6.0': 0,
    '6.5': 0,
    '7.0': 0,
    '7.5': 0,
    '8.0': 0,
    '8.5': 0,
  },

  /**
   * PRUEBA 5 — Estereopsis
   *
   * El candidato selecciona 1 figura por fila (5 filas).
   * La figura correcta depende del set de evaluación utilizado.
   * Por defecto, se asigna el mismo puntaje a cualquier selección
   * que no sea "Ninguna", indicando que el candidato percibe profundidad.
   *
   * correctAnswer: índice (0-4) de la figura correcta en cada fila
   *   (0 = primera figura, 4 = quinta figura, -1 = Ninguna)
   * pointsCorrect: puntos si selecciona la figura correcta
   * pointsAny:    puntos si selecciona cualquier figura (no Ninguna)
   * pointsNone:   puntos si selecciona "Ninguna"
   *
   * Puntaje máximo: 10 pts (2 por fila × 5 filas)
   *
   * ⚠️ IMPORTANTE: Modifica correctAnswer según el protocolo
   *    de evaluación del consultorio.
   */
  stereopsis: {
    correctAnswers: [0, 1, 2, 3, 4], // Índice de figura correcta por fila (0-4)
    pointsCorrect:  2,  // Respuesta exacta
    pointsAny:      1,  // Seleccionó algo pero no la correcta
    pointsNone:     0,  // Seleccionó "Ninguna"
    lineScores: {
      1: 2,
      2: 4,
      3: 6,
      4: 8,
      5: 10,
      NR: 0,
    },
  },

  /**
   * PRUEBA 6 — Discriminación al color
   *
   * Números correctos en los círculos de Ishihara.
   * Si el candidato los identifica = puntaje.
   *
   * totalCircles: cantidad total de círculos
   * pointsPerCircle: puntos por cada número correcto identificado
   *
   * Puntaje máximo: 12 pts (2 × 6 círculos)
   */
  colorDiscrimination: {
    totalCircles: 6,
    pointsPerCircle: 2,
    // Fila 1: círculos 0,1,2 (números 32,79,23) — mínimo 2 correctos
    // Fila 2: círculos 3,4,5 (números 92,56,63) — mínimo 2 correctos
    // PASA solo si: fila1 >= 2 Y fila2 >= 2 (total mínimo 4)
    minPerRow: 2,
    requireAllToPass: false,
  },

  /**
   * PRUEBA 7 — Campo Visual
   *
   * Por cada ángulo donde el candidato responde "Sí" (ve la luz) = puntos.
   * Hay 8 ángulos en total (4 izquierda, 4 derecha).
   *
   * pointsPerYes: puntos por cada "Sí"
   *
   * Puntaje máximo: 8 pts (1 × 8 ángulos)
   */
  campoVisual: {
    pointsPerYes: 1,  // Puntos por ver cada luz periférica
  },

  /**
   * PRUEBA 12 — Encandilamiento
   *
   * Basado en qué fila puede leer y en cuánto tiempo se recupera.
   *
   * filaScores: puntaje según fila leída (1 = mejor)
   * timeScores: puntaje según tiempo de recuperación
   */
  encandilamiento: {
    filaScores: {
      1: 6,  // Lee fila 1 (mejor recuperación)
      2: 3,  // Lee fila 2
      3: 0,  // Solo lee fila 3 (peor)
    },
    timeScores: {
      'menos5': 6,   // 5 o menos segundos (recuperación rápida)
      '6y7':    3,   // 6 y 7 segundos
      'mas8':   0,   // 8 o más segundos (recuperación lenta)
    }
    // Puntaje máximo: 12 pts (6 fila + 6 tiempo)
  },

};

/**
 * ============================================================
 *  FUNCIÓN GLOBAL: calcularPuntajeTotal()
 *  Calcula el puntaje total a partir de las respuestas.
 *  Devuelve: { total, maxTotal, breakdown[] }
 * ============================================================
 */
window.calcularPuntajeTotal = function(answers) {
  const S   = window.SCORING;
  let total = 0;
  let maxTotal = 0;
  const breakdown = [];

  const pruebasAcuity = [
    { id: 1, label: 'Prueba 1 – AV Lejana OD' },
    { id: 2, label: 'Prueba 2 – AV Lejana OI' },
    { id: 3, label: 'Prueba 3 – AV Lejana AO' },
    { id: 8, label: 'Prueba 8 – AV Cercana OD' },
    { id: 9, label: 'Prueba 9 – AV Cercana OI' },
    { id: 10, label: 'Prueba 10 – AV Cercana AO' },
  ];

  pruebasAcuity.forEach(({ id, label }) => {
    const ans = answers[id];
    let pts = 0;
    if (ans) {
      const key = (ans.noResponse || ans.col === 'NR') ? 'NR' : `${ans.col}_${ans.row}`;
      pts = S.acuity[key] ?? 0;
    }
    total += pts;
    maxTotal += 8;
    breakdown.push({ name: label, score: pts, max: 8 });
  });

  // Phorias (prueba 4)
  {
    const ans = answers[4];
    let pts = 0;
    if (ans) {
      const hScore = S.phorias[ans.horizontal] ?? 0;
      const vScore = S.phorias[ans.vertical]   ?? 0;
      pts = Math.round((hScore + vScore) / 2);
    }
    total += pts;
    maxTotal += 5;
    breakdown.push({ name: 'Prueba 4 – Phorias Lejanas', score: pts, max: 5 });
  }

  // Estereopsis (prueba 5)
  {
    const ans = answers[5];
    let pts = 0;
    if (ans) {
      if (Array.isArray(ans)) {
        // Backward compatibility with old per-row model
        ans.forEach((sel, rowIdx) => {
          const correct = S.stereopsis.correctAnswers[rowIdx];
          if (sel === -1) pts += S.stereopsis.pointsNone;
          else if (sel === correct) pts += S.stereopsis.pointsCorrect;
          else pts += S.stereopsis.pointsAny;
        });
      } else {
        const key = (ans.noResponse || ans.line === 0) ? 'NR' : String(ans.line);
        pts = S.stereopsis.lineScores[key] ?? 0;
      }
    }
    total += pts;
    maxTotal += 10;
    breakdown.push({ name: 'Prueba 5 – Estereopsis', score: pts, max: 10 });
  }

  // Discriminación al color (prueba 6)
  {
    const ans = answers[6];
    let pts = 0;
    if (ans) {
      const model = Array.isArray(ans) ? { seen: ans, other: false, noResponse: false } : ans;
      const identified = (model.seen || []).filter(v => v === true).length;
      const hasOther = !!model.other;
      const hasNoResp = !!model.noResponse;

      const fila1 = [model.seen[0], model.seen[1], model.seen[2]].filter(Boolean).length;
      const fila2 = [model.seen[3], model.seen[4], model.seen[5]].filter(Boolean).length;
      const passColor = fila1 >= S.colorDiscrimination.minPerRow && fila2 >= S.colorDiscrimination.minPerRow;
      pts = passColor ? (S.colorDiscrimination.totalCircles * S.colorDiscrimination.pointsPerCircle) : 0;
    }
    total += pts;
    maxTotal += 12;
    breakdown.push({ name: 'Prueba 6 – Discriminación Color', score: pts, max: 12 });
  }

  // Campo Visual (prueba 7)
  {
    const ans = answers[7];
    let pts = 0;
    if (ans) {
      if (Array.isArray(ans)) {
        // Backward compatibility with old data model
        ans.forEach(resp => { if (resp === 'si') pts += S.campoVisual.pointsPerYes; });
      } else {
        ['izquierda', 'derecha'].forEach(side => {
          const sideAnswers = ans[side] || {};
          Object.values(sideAnswers).forEach(resp => {
            if (resp === 'si') pts += S.campoVisual.pointsPerYes;
          });
        });
      }
    }
    total += pts;
    maxTotal += 8;
    breakdown.push({ name: 'Prueba 7 – Campo Visual', score: pts, max: 8 });
  }

  // Phorias cercanas (prueba 11)
  {
    const ans = answers[11];
    let pts = 0;
    if (ans) {
      const hScore = S.phorias[ans.horizontal] ?? 0;
      const vScore = S.phorias[ans.vertical]   ?? 0;
      pts = Math.round((hScore + vScore) / 2);
    }
    total += pts;
    maxTotal += 5;
    breakdown.push({ name: 'Prueba 11 – Phorias Cercanas', score: pts, max: 5 });
  }

  // Encandilamiento (prueba 12)
  {
    const ans = answers[12];
    let pts = 0;
    if (ans) {
      pts += S.encandilamiento.filaScores[ans.fila]  ?? 0;
      pts += S.encandilamiento.timeScores[ans.tiempo] ?? 0;
    }
    total += pts;
    maxTotal += 12;
    breakdown.push({ name: 'Prueba 12 – Encandilamiento', score: pts, max: 12 });
  }

  return { total, maxTotal, breakdown };
};

// ============================================================
// RESUMEN FINAL: detalle + PASA/NO PASA por prueba
// ============================================================
window.calcularResumenFinal = function(answers) {
  const S = window.SCORING;
  const { breakdown } = window.calcularPuntajeTotal(answers);

  const out = breakdown.map(item => {
    // Normalizamos nombre/id desde label (no perfecto, pero estable en este proyecto)
    return { ...item, status: 'N/A', detail: '' };
  });

  const find = (prefix) => out.find(x => x.name.startsWith(prefix));

  // Acuity (1,2,3,8,9,10) — muestra Snellen exacto: (20/20), (20/25), etc.
  [
    ['Prueba 1', 1], ['Prueba 2', 2], ['Prueba 3', 3],
    ['Prueba 8', 8], ['Prueba 9', 9], ['Prueba 10', 10],
  ].forEach(([p, id]) => {
    const row = out.find(x => x.name.startsWith(`${p} –`));
    if (!row) return;
    const ans = answers[id];
    const key = ans ? ((ans.noResponse || ans.col === 'NR') ? 'NR' : `${ans.col}_${ans.row}`) : 'NR';
    const snellen = (ans && ans.snellen)
      || S.snellenMap[key]
      || (typeof window.getAcuitySnellen === 'function' ? window.getAcuitySnellen(ans?.col, ans?.row) : '')
      || '';
    row.snellen = snellen;
    row.detail = snellen ? `(${snellen})` : '';
    row.isAcuity = true;
    row.status = row.score >= S.passFail.acuityMinPointsToPass ? 'PASA' : 'NO PASA';
  });

  // Phorias 4 y 11
  [['Prueba 4', 4], ['Prueba 11', 11]].forEach(([p, id]) => {
    const row = out.find(x => x.name.startsWith(`${p} –`));
    if (!row) return;
    const ans = answers[id] || {};
    if (ans.horizontal || ans.vertical) row.detail = `H:${ans.horizontal || '—'} V:${ans.vertical || '—'}`;
    const h = typeof ans.horizontal === 'string' ? parseFloat(ans.horizontal) : NaN;
    const v = typeof ans.vertical === 'string' ? parseFloat(ans.vertical) : NaN;
    const [hMin, hMax] = S.passFail.phoriasGreenRange;
    const [vMin, vMax] = S.passFail.phoriasRedRange;
    const okH = Number.isFinite(h) && h >= hMin && h <= hMax;
    const okV = Number.isFinite(v) && v >= vMin && v <= vMax;
    row.status = (okH && okV) ? 'PASA' : 'NO PASA';
  });

  // Estereopsis 5
  {
    const row = find('Prueba 5');
    if (row) row.status = row.score >= S.passFail.stereopsisMinPointsToPass ? 'PASA' : 'NO PASA';
  }

  // Color 6 (binario ya aplicado)
  {
    const row = find('Prueba 6');
    if (row) row.status = row.score > 0 ? 'PASA' : 'NO PASA';
  }

  // Campo 7 (conteo de sí)
  {
    const row = find('Prueba 7');
    if (row) {
      const ans = answers[7];
      const yesCount = Array.isArray(ans)
        ? ans.filter(v => v === 'si').length
        : ['izquierda','derecha'].reduce((acc, side) => {
            const sideAnswers = (ans && ans[side]) ? Object.values(ans[side]) : [];
            return acc + sideAnswers.filter(v => v === 'si').length;
          }, 0);
      row.detail = `(Sí: ${yesCount}/8)`;
      row.status = yesCount >= S.passFail.campoMinYesToPass ? 'PASA' : 'NO PASA';
    }
  }

  // Encandilamiento 12 (por estándar solicitado: pasa solo si <=5s)
  {
    const row = find('Prueba 12');
    if (row) {
      const ans = answers[12] || {};
      row.detail = `Fila:${ans.fila || '—'} Tiempo:${ans.tiempo || '—'}`;
      row.status = ans.tiempo === S.passFail.encandilamientoTimeToPass ? 'PASA' : 'NO PASA';
    }
  }

  // Ordenar siempre por número de prueba (1..12)
  const getTestNumber = (name) => {
    const m = /^Prueba\s+(\d+)/.exec(name || '');
    return m ? parseInt(m[1], 10) : Number.POSITIVE_INFINITY;
  };
  out.sort((a, b) => getTestNumber(a.name) - getTestNumber(b.name));
  return out;
};
