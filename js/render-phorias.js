window.OptievalRenderers = window.OptievalRenderers || {};

window.OptievalRenderers.renderPhorias = function renderPhorias(test) {
  const phoriaValues = ['0.0','0.5','1.0','1.5','2.0','2.5','3.0','3.5','4.0','4.5','5.0','5.5','6.0','6.5','7.0','7.5','8.0','8.5'];
  const genOptions = (name) => phoriaValues.map(v => `
    <label id="lbl-ph-${name}-${v.replace('.','_')}">
      <input type="radio" name="phoria-${test.id}-${name}" value="${v}" />
      ${v}
    </label>
  `).join('');

  return `
    <div class="phorias-visual">
      <div class="phorias-img-box">
        <img class="phorias-reference" src="images/phorias-diagram.png" alt="Referencia de líneas (verde y roja) para phorias" />
      </div>
    </div>
    <div class="phorias-grid">
      <div class="phorias-group green">
        <h3>Línea horizontal verde</h3>
        <div class="phorias-values" id="ph-green-${test.id}">
          ${genOptions('horizontal')}
        </div>
      </div>
      <div class="phorias-group red">
        <h3>Línea vertical roja</h3>
        <div class="phorias-values" id="ph-red-${test.id}">
          ${genOptions('vertical')}
        </div>
      </div>
    </div>
  `;
};
