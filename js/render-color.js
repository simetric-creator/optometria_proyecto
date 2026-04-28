window.OptievalRenderers = window.OptievalRenderers || {};

window.OptievalRenderers.renderColor = function renderColor(test) {
  const answers = test.circles.map((c, i) => `
    <label class="color-answer-item" id="cai-${test.id}-${i}" data-idx="${i}">
      <input type="checkbox" name="color-${test.id}-${i}" value="${c.number}" />
      <div class="color-check">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="color-value">${c.number}</div>
      <div class="color-label">Círculo ${i + 1}</div>
    </label>
  `).join('');

  return `
    <div class="color-circles">
      <img class="ishihara-strip" src="images/ishihara-circles.png" alt="Círculos Ishihara (de izquierda a derecha)" />
    </div>
    <div class="color-answers">${answers}</div>
    <div class="color-other-row">
      <label class="color-toggle" id="color-otro-${test.id}">
        <input type="checkbox" name="color-otro-${test.id}" />
        Otro
      </label>
      <label class="color-toggle" id="color-no-resp-${test.id}">
        <input type="checkbox" name="color-no-resp-${test.id}" />
        No responde
      </label>
    </div>
  `;
};

window.OptievalRenderers.drawIshihara = function drawIshihara() {
  // No-op: ahora los círculos se muestran con imagen fija en /images/
};
