window.OptievalRenderers = window.OptievalRenderers || {};

window.OptievalRenderers.renderAcuity = function renderAcuity(test) {
  const cols = Object.keys(test.columns);
  let rows = `
    <div class="acuity-grid">
      <div class="acuity-col-header"></div>
  `;

  cols.forEach(col => {
    rows += `<div class="acuity-col-header col-letter"><div class="letter-badge">${col}</div></div>`;
  });

  [1, 2, 3].forEach(rowNum => {
    rows += `<div class="acuity-row-num acuity-row-${rowNum}">${rowNum}</div>`;
    cols.forEach(col => {
      const item = test.columns[col].find(r => r.row === rowNum);
      const value = item ? item.number : '';
      rows += `
        <div class="acuity-cell acuity-row-${rowNum}">
          <label id="lbl-${test.id}-${col}-${rowNum}">
            <input type="radio" name="acuity-${test.id}" value="${col}_${rowNum}" data-col="${col}" data-row="${rowNum}" />
            <span class="radio-dot"></span>
            <span class="acuity-number">${value}</span>
          </label>
        </div>
      `;
    });
  });

  rows += `</div>
    <div class="acuity-no-response">
      <label class="none-option" id="lbl-${test.id}-noresp">
        <input type="radio" name="acuity-${test.id}" value="NR" data-col="NR" data-row="0" />
        No responde
      </label>
    </div>
    <p class="acuity-note">Criterio de pase: identificar al menos 5 de 6 caracteres por bloque (segun protocolo).</p>
  `;
  return rows;
};
