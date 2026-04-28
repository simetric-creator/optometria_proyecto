window.OptievalLogic = window.OptievalLogic || {};

(function registerLogicBindings(logic) {
  function setLabelClass(inputEl, className, enabled = true) {
    if (!inputEl) return;
    const label = inputEl.closest('label');
    if (label) label.classList.toggle(className, enabled);
  }

  function syncLabelStateByInputName(inputName, className) {
    document.querySelectorAll(`input[name="${inputName}"]`).forEach(inputEl => {
      setLabelClass(inputEl, className, inputEl.checked);
    });
  }

  function createCampoAnswerModel(test) {
    return {
      izquierda: Object.fromEntries(test.angles.izquierda.map(angle => [String(angle), null])),
      derecha: Object.fromEntries(test.angles.derecha.map(angle => [String(angle), null])),
    };
  }

  function getTotalCampoGroups(test) {
    return test.angles.izquierda.length + test.angles.derecha.length;
  }

  function getAnsweredCampoGroups(campoAnswer) {
    return ['izquierda', 'derecha'].reduce((count, side) => {
      if (!campoAnswer[side]) return count;
      return count + Object.values(campoAnswer[side]).filter(v => v === 'si' || v === 'no').length;
    }, 0);
  }

  function checkColorComplete(test, answers, markComplete, getCurrentStep) {
    if (!answers[test.id] || Array.isArray(answers[test.id])) {
      answers[test.id] = { seen: new Array(test.circles.length).fill(false), other: false, noResponse: false };
    }
    const model = answers[test.id];
    const anyChecked = (model.seen || []).some(v => v === true) || model.other || model.noResponse;
    const noResp = document.getElementById(`color-no-resp-${test.id}`);
    if (anyChecked || (noResp && noResp.classList.contains('checked'))) {
      markComplete(getCurrentStep());
    }
  }

  function checkEncandilComplete(test, answers, markComplete, getCurrentStep) {
    if (answers[test.id] && answers[test.id].fila && answers[test.id].tiempo) {
      markComplete(getCurrentStep());
    }
  }

  logic.bindEvents = function bindEvents(test, deps) {
    const { answers, markComplete, getCurrentStep } = deps;

    switch (test.type) {
      case 'acuity':
        document.querySelectorAll(`input[name="acuity-${test.id}"]`).forEach(inp => {
          inp.addEventListener('change', () => {
            syncLabelStateByInputName(`acuity-${test.id}`, 'selected');
            const isNoResponse = inp.value === 'NR';
            answers[test.id] = isNoResponse
              ? { col: 'NR', row: 0, noResponse: true }
              : { col: inp.dataset.col, row: parseInt(inp.dataset.row, 10), noResponse: false };
            markComplete(getCurrentStep());
          });
        });
        break;

      case 'phorias':
        ['horizontal', 'vertical'].forEach(name => {
          document.querySelectorAll(`input[name="phoria-${test.id}-${name}"]`).forEach(inp => {
            inp.addEventListener('change', () => {
              syncLabelStateByInputName(`phoria-${test.id}-${name}`, 'selected');
              if (!answers[test.id]) answers[test.id] = {};
              answers[test.id][name] = inp.value;
              if (answers[test.id].horizontal && answers[test.id].vertical) {
                markComplete(getCurrentStep());
              }
            });
          });
        });
        break;

      case 'stereopsis':
        [1, 2, 3, 4, 5].forEach(rowNum => {
          document.querySelectorAll(`input[name="stereo-row-${rowNum}"]`).forEach(inp => {
            inp.addEventListener('change', () => {
              // Update styles for this row
              document.querySelectorAll(`input[name="stereo-row-${rowNum}"]`).forEach(r => {
                const val = r.value;
                if (val === '-1') {
                  const lbl = document.getElementById(`none-${rowNum}`);
                  if (lbl) lbl.classList.toggle('selected', r.checked);
                } else {
                  const sw = document.getElementById(`sw-${rowNum}-${val}`);
                  if (sw) sw.classList.toggle('selected', r.checked);
                }
              });

              if (!answers[test.id] || !Array.isArray(answers[test.id])) {
                answers[test.id] = [-1, -1, -1, -1, -1];
              }
              answers[test.id][rowNum - 1] = parseInt(inp.value, 10);

              const allFilled = [1, 2, 3, 4, 5].every(rn =>
                document.querySelector(`input[name="stereo-row-${rn}"]:checked`) !== null
              );
              if (allFilled) markComplete(getCurrentStep());
            });
          });
        });
        break;

      case 'color':
        test.circles.forEach((_, i) => {
          const lbl = document.getElementById(`cai-${test.id}-${i}`);
          if (!lbl) return;
          lbl.addEventListener('click', () => {
            const inp = lbl.querySelector('input');
            inp.checked = !inp.checked;
            lbl.classList.toggle('checked', inp.checked);
            if (!answers[test.id] || Array.isArray(answers[test.id])) {
              answers[test.id] = { seen: new Array(test.circles.length).fill(false), other: false, noResponse: false };
            }
            answers[test.id].seen[i] = inp.checked;
            checkColorComplete(test, answers, markComplete, getCurrentStep);
          });
        });

        document.getElementById(`color-otro-${test.id}`).addEventListener('click', function() {
          this.classList.toggle('checked');
          if (!answers[test.id] || Array.isArray(answers[test.id])) {
            answers[test.id] = { seen: new Array(test.circles.length).fill(false), other: false, noResponse: false };
          }
          answers[test.id].other = this.classList.contains('checked');
        });
        document.getElementById(`color-no-resp-${test.id}`).addEventListener('click', function() {
          this.classList.toggle('checked');
          if (!answers[test.id] || Array.isArray(answers[test.id])) {
            answers[test.id] = { seen: new Array(test.circles.length).fill(false), other: false, noResponse: false };
          }
          answers[test.id].noResponse = this.classList.contains('checked');
          if (this.classList.contains('checked')) {
            markComplete(getCurrentStep());
          }
        });
        break;

      case 'campo':
        document.querySelectorAll(`[name^="campo-${test.id}"]`).forEach(inp => {
          inp.addEventListener('change', () => {
            const allInputs = document.querySelectorAll(`[name^="campo-${test.id}"]`);
            const campoAnswer = createCampoAnswerModel(test);

            allInputs.forEach(r => {
              const lbl = r.closest('label');
              if (!lbl) return;
              lbl.classList.remove('selected-si', 'selected-no');
              if (r.checked) {
                lbl.classList.add(r.value === 'si' ? 'selected-si' : 'selected-no');
              }
            });

            document.querySelectorAll(`[name^="campo-${test.id}"]:checked`).forEach(r => {
              const side = r.dataset.side;
              const angle = r.dataset.angle;
              if (side && angle) {
                campoAnswer[side][angle] = r.value;
              }
            });
            answers[test.id] = campoAnswer;

            const totalGroups = getTotalCampoGroups(test);
            const answered = getAnsweredCampoGroups(campoAnswer);
            if (answered === totalGroups) markComplete(getCurrentStep());
          });
        });
        break;

      case 'encandilamiento':
        document.querySelectorAll(`input[name="encandil-fila-${test.id}"]`).forEach(inp => {
          inp.addEventListener('change', () => {
            document.querySelectorAll(`[id^="ef-${test.id}-"]`).forEach(el => {
              el.classList.remove('selected');
            });
            setLabelClass(inp, 'selected');

            if (!answers[test.id]) answers[test.id] = {};
            answers[test.id].fila = parseInt(inp.value, 10);
            checkEncandilComplete(test, answers, markComplete, getCurrentStep);
          });
        });

        document.querySelectorAll(`input[name="encandil-time-${test.id}"]`).forEach(inp => {
          inp.addEventListener('change', () => {
            document.querySelectorAll(`[id^="et-${test.id}-"]`).forEach(el => {
              el.classList.remove('selected');
            });
            setLabelClass(inp, 'selected');

            if (!answers[test.id]) answers[test.id] = {};
            answers[test.id].tiempo = inp.value;
            checkEncandilComplete(test, answers, markComplete, getCurrentStep);
          });
        });
        break;
    }
  };

  logic.restoreAnswer = function restoreAnswer(test, answers) {
    const ans = answers[test.id];
    if (!ans) return;

    switch (test.type) {
      case 'acuity': {
        const key = `acuity-${test.id}`;
        const value = (ans.noResponse || ans.col === 'NR') ? 'NR' : `${ans.col}_${ans.row}`;
        const inp = document.querySelector(`input[name="${key}"][value="${value}"]`);
        if (inp) {
          inp.checked = true;
          setLabelClass(inp, 'selected');
        }
        break;
      }
      case 'phorias': {
        ['horizontal', 'vertical'].forEach(name => {
          const val = ans[name];
          if (!val) return;
          const inp = document.querySelector(`input[name="phoria-${test.id}-${name}"][value="${val}"]`);
          if (inp) {
            inp.checked = true;
            setLabelClass(inp, 'selected');
          }
        });
        break;
      }
      case 'stereopsis': {
        if (!Array.isArray(ans)) break;
        ans.forEach((sel, rowIdx) => {
          const rowNum = rowIdx + 1;
          if (sel === -1) {
            const inp = document.querySelector(`input[name="stereo-row-${rowNum}"][value="-1"]`);
            if (inp) {
              inp.checked = true;
              const lbl = document.getElementById(`none-${rowNum}`);
              if (lbl) lbl.classList.add('selected');
            }
          } else if (sel !== null && sel !== undefined) {
            const inp = document.querySelector(`input[name="stereo-row-${rowNum}"][value="${sel}"]`);
            if (inp) {
              inp.checked = true;
              const sw = document.getElementById(`sw-${rowNum}-${sel}`);
              if (sw) sw.classList.add('selected');
            }
          }
        });
        break;
      }
      case 'color': {
        // Backward compatibility: old model was boolean[]
        const model = Array.isArray(ans) ? { seen: ans, other: false, noResponse: false } : ans;

        (model.seen || []).forEach((checked, i) => {
          if (!checked) return;
          const lbl = document.getElementById(`cai-${test.id}-${i}`);
          if (!lbl) return;
          lbl.classList.add('checked');
          const inp = lbl.querySelector('input');
          if (inp) inp.checked = true;
        });

        const otherEl = document.getElementById(`color-otro-${test.id}`);
        if (otherEl && model.other) otherEl.classList.add('checked');
        const noRespEl = document.getElementById(`color-no-resp-${test.id}`);
        if (noRespEl && model.noResponse) noRespEl.classList.add('checked');
        break;
      }
      case 'campo': {
        document.querySelectorAll(`[name^="campo-${test.id}"]`).forEach(r => {
          const lbl = r.closest('label');
          if (lbl) lbl.classList.remove('selected-si', 'selected-no');
        });

        ['izquierda', 'derecha'].forEach(side => {
          const sideAnswers = ans[side] || {};
          Object.entries(sideAnswers).forEach(([angle, value]) => {
            if (value !== 'si' && value !== 'no') return;
            const selector = `input[name="campo-${test.id}-${side}-${angle}"][value="${value}"]`;
            const inp = document.querySelector(selector);
            if (!inp) return;
            inp.checked = true;
            const lbl = inp.closest('label');
            if (lbl) lbl.classList.add(value === 'si' ? 'selected-si' : 'selected-no');
          });
        });
        break;
      }
      case 'encandilamiento': {
        if (ans.fila) {
          const inp = document.querySelector(`input[name="encandil-fila-${test.id}"][value="${ans.fila}"]`);
          if (inp) {
            inp.checked = true;
            setLabelClass(inp, 'selected');
          }
        }
        if (ans.tiempo) {
          const inp = document.querySelector(`input[name="encandil-time-${test.id}"][value="${ans.tiempo}"]`);
          if (inp) {
            inp.checked = true;
            setLabelClass(inp, 'selected');
          }
        }
        break;
      }
    }
  };
})(window.OptievalLogic);
