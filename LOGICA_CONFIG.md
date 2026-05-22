## Configuración rápida de lógica (sin tocar HTML/CSS)

Este archivo te dice **dónde cambiar** las respuestas correctas y los criterios de “pasa / no pasa”.

---

### 1) Estereopsis (Figuras) — Respuesta correcta por fila

**Archivo:** `js/scoring.js`  
**Sección:** `window.SCORING.stereopsis.correctAnswers`

Es un arreglo de 5 posiciones (una por fila):

- **Fila 1** -> `correctAnswers[0]`
- **Fila 2** -> `correctAnswers[1]`
- **Fila 3** -> `correctAnswers[2]`
- **Fila 4** -> `correctAnswers[3]`
- **Fila 5** -> `correctAnswers[4]`

Cada valor es el **índice** (0 a 4) de la figura correcta en esa fila.

Ejemplo:

```js
stereopsis: {
  correctAnswers: [0, 2, 4, 1, 3],
  // ...
}
```

Notas:
- `-1` significa “Ninguna”.
- La UI muestra 5 figuras por fila (con radios). El índice depende del orden de figuras en esa fila.

---

### 2) Discriminación al color (Ishihara) — Pasa con 5 o más

**Archivo:** `js/scoring.js`  
**Sección:** `window.SCORING.colorDiscrimination.requireAllToPass`

```js
colorDiscrimination: {
  totalCircles: 6,
  pointsPerCircle: 2,
  requireAllToPass: true,
}
```

Regla aplicada:
- Si marca **“Otro”** o **“No responde”** -> puntaje = 0.
- Si `requireAllToPass: true` -> **PASA solo si marca las 6**.
- Si no marca las 6 -> NO PASA.

---

### 3) Encandilamiento — criterio de PASA / NO PASA por tiempo

**Archivo:** `js/scoring.js`  
**Sección:** `window.SCORING.passFail.encandilamientoTimeToPass`

Por estándar actual:
- **PASA** solo si el tiempo seleccionado es **`menos5`** (5 segundos o menos).

Si quieres cambiarlo:

```js
passFail: {
  encandilamientoTimeToPass: 'menos5', // o '6y7' / 'mas8'
}
```

---

### 4) Umbrales PASA/NO PASA por prueba (editable)

**Archivo:** `js/scoring.js`  
**Sección:** `window.SCORING.passFail`

Aquí ajustas los mínimos para que una prueba quede como **PASA** o **NO PASA** en el resumen final.

Nota:
- **Campo Visual**: actualmente está configurado para **PASA solo si Sí = 8/8** (`campoMinYesToPass: 8`).

---

### 5) Agudeza visual — Valores Snellen en el resumen (20/20, 20/25, etc.)

**Archivo:** `js/exam.js`  
**Sección:** `ACUITY_SNELLEN_BY_CELL`

Cada celda del tablero (columna A/B/C + fila 1/2/3) tiene su valor Snellen. Al finalizar, las pruebas **AV Lejana** y **AV Cercana** muestran ese valor, por ejemplo `(20/25)`, y a la derecha **PASA** o **NO PASA**.

```js
const ACUITY_SNELLEN_BY_CELL = {
  A: { 1: '20/20',  2: '20/40',  3: '20/70' },
  B: { 1: '20/25',  2: '20/50',  3: '20/100' },
  C: { 1: '20/30',  2: '20/60',  3: '20/200' },
};
```

Si su protocolo usa otro valor (por ejemplo `20/35`), cámbielo aquí en la fila/columna correspondiente.

---

### 6) Phorias — Rangos de PASA (verde y rojo)

**Archivo:** `js/scoring.js`  
**Sección:** `window.SCORING.passFail.phoriasGreenRange` y `phoriasRedRange`

Regla aplicada:
- **Verde horizontal PASA** si está entre **1.5 y 6.5**
- **Roja vertical PASA** si está entre **3.5 y 5.5**

```js
passFail: {
  phoriasGreenRange: [1.5, 6.5],
  phoriasRedRange: [3.5, 5.5],
}
```

---

### 3) Imágenes usadas (carpeta `images/`)

Las pruebas usan imágenes desde:

- `images/phorias-diagram.png`
- `images/ishihara-circles.png`

Si reemplazas los archivos por otras imágenes (mismo nombre), la UI las mostrará automáticamente.

