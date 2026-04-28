# Arquitectura y Estándares — OptiEval

Este documento define cómo organizar el código para mantener el proyecto simple, consistente y fácil de extender.

## Objetivo

- Separar presentación, lógica y orquestación.
- Evitar duplicación de reglas de negocio.
- Hacer que cada archivo tenga una responsabilidad clara.

## Estructura actual recomendada

- `index.html`: estructura base de la app y carga de scripts.
- `css/styles.css`: todos los estilos visuales (sin estilos inline).
- `js/render-*.js`: renderizadores de UI por tipo de prueba.
- `js/logic-bindings.js`: eventos, restauración de respuestas y helpers de interacción.
- `js/exam.js`: orquestador (estado global, navegación, progreso, modales, reset y flujo general).
- `js/scoring.js`: reglas de puntuación y cálculo total.

## Reglas de diseño

- **Una responsabilidad por módulo**
  - Render: solo generar HTML/canvas.
  - Logic: solo bind/restore y estado de controles.
  - Orquestador: solo coordinar flujo y estado global.
  - Scoring: solo puntuar.

- **Sin estilos inline**
  - Cualquier estilo nuevo debe vivir en `css/styles.css`.

- **Compatibilidad con navegador sin bundler**
  - Usar `window.*` como namespace explícito:
    - `window.OptievalRenderers`
    - `window.OptievalLogic`
    - `window.SCORING` / `window.calcularPuntajeTotal`

- **Convenciones de datos**
  - `answers` guarda respuestas por `test.id`.
  - Campo visual debe usar modelo fuerte:
    - `{ izquierda: { "85": "si|no|null", ... }, derecha: { ... } }`

## Orden de carga en `index.html`

1. `js/scoring.js`
2. `js/render-*.js`
3. `js/logic-bindings.js`
4. `js/exam.js`

`exam.js` asume que render y lógica ya están registrados.

## Checklist para cambios futuros

- ¿El cambio toca UI? -> `render-*.js` y/o `styles.css`.
- ¿El cambio toca comportamiento de inputs? -> `logic-bindings.js`.
- ¿El cambio toca navegación/progreso/modales? -> `exam.js`.
- ¿El cambio toca puntos o criterios? -> `scoring.js`.
- ¿Se agregaron estilos inline por error? -> mover a `styles.css`.
- ¿Se introdujo duplicación? -> extraer helper.

## Qué evitar

- Mezclar render + lógica de eventos en el mismo archivo.
- Repetir selectores y reglas de clase en múltiples lugares.
- Agregar dependencias de build si el proyecto seguirá siendo estático.
