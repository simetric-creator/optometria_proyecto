window.OptievalRenderers = window.OptievalRenderers || {};

window.OptievalRenderers.renderCampo = function renderCampo(test) {
  const genAngles = (side) => test.angles[side].map(angle => `
    <div class="campo-angle-item">
      <div class="campo-angle-label">${angle}°</div>
      <div class="campo-options">
        <label id="lbl-campo-${test.id}-${side}-${angle}-si">
          <input type="radio" name="campo-${test.id}-${side}-${angle}" value="si" data-side="${side}" data-angle="${angle}" data-resp="si"/>
          Sí
        </label>
        <label id="lbl-campo-${test.id}-${side}-${angle}-no">
          <input type="radio" name="campo-${test.id}-${side}-${angle}" value="no" data-side="${side}" data-angle="${angle}" data-resp="no"/>
          No
        </label>
      </div>
    </div>
  `).join('');

  return `
    <div class="campo-grid">
      <div class="campo-group">
        <div class="campo-group-title"><span>Izquierda</span></div>
        <div class="campo-angles">${genAngles('izquierda')}</div>
      </div>
      <div class="campo-group">
        <div class="campo-group-title"><span>Derecha</span></div>
        <div class="campo-angles">${genAngles('derecha')}</div>
      </div>
    </div>
  `;
};
