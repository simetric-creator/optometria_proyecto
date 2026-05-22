window.OptievalRenderers = window.OptievalRenderers || {};

window.OptievalRenderers.renderEncandilamiento = function renderEncandilamiento(test) {
  const filas = test.filas.map(f => `
    <label class="encandil-fila" id="ef-${test.id}-${f.num}" data-fila="${f.num}">
      <input type="radio" name="encandil-fila-${test.id}" value="${f.num}" />
      <div class="encandil-fila-num"><span>Fila</span>${f.num}</div>
      <div class="encandil-fila-number">${f.number}</div>
    </label>
  `).join('');

  const times = [
    { value: 'menos5', label: '5 o menos segundos' },
    { value: '6y7', label: '6 y 7 segundos' },
    { value: 'mas8', label: '8 o más segundos' },
  ].map(t => `
    <label id="et-${test.id}-${t.value}">
      <input type="radio" name="encandil-time-${test.id}" value="${t.value}" />
      <span class="time-dot"></span>
      ${t.label}
    </label>
  `).join('');

  return `
    <div class="encandil-grid">
      <div>
        <h3 class="encandil-section-title">Fila seleccionada</h3>
        <div class="encandil-filas">${filas}</div>
      </div>
      <div class="encandil-time">
        <h3>Tiempo de Prueba</h3>
        <div class="encandil-time-options">${times}</div>
      </div>
    </div>
  `;
};
