window.OptievalRenderers = window.OptievalRenderers || {};

const SHAPES = ['star', 'circle', 'heart', 'square', 'plus'];
const SHAPE_SVG = {
  star:   `<svg width="22" height="22" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#1a2433"/></svg>`,
  circle: `<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1a2433"/></svg>`,
  heart:  `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#1a2433"/></svg>`,
  square: `<svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#1a2433"/></svg>`,
  plus:   `<svg width="22" height="22" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="#1a2433"/><rect x="9" y="2" width="6" height="20" rx="2" fill="#1a2433"/></svg>`,
};

window.OptievalRenderers.renderStereopsis = function renderStereopsis() {
  const baseOrder = ['star', 'circle', 'heart', 'square', 'plus'];

  const rows = [1, 2, 3, 4, 5].map(rowNum => {
    // Rotate order per row (keeps layout consistent and readable)
    const shapeOrder = [...baseOrder];
    for (let i = 0; i < rowNum - 1; i++) shapeOrder.push(shapeOrder.shift());

    const cells = shapeOrder.map((shape, idx) => `
      <td>
        <label class="stereo-option" data-row="${rowNum}" data-idx="${idx}">
          <input type="radio" name="stereo-row-${rowNum}" value="${idx}" />
          <span class="shape-wrapper" id="sw-${rowNum}-${idx}">
            ${SHAPE_SVG[shape]}
          </span>
        </label>
      </td>
    `).join('');

    return `
      <tr>
        <td class="row-label">Fila ${rowNum}</td>
        ${cells}
        <td>
          <label class="none-option" id="none-${rowNum}">
            <input type="radio" name="stereo-row-${rowNum}" value="-1" />
            Ninguna
          </label>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <table class="stereo-table">
      <thead>
        <tr>
          <th></th>
          <th></th><th></th><th></th><th></th><th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
};
