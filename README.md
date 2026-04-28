# OptiEval — Sistema de Evaluación Visual
### Manual de Instalación y Configuración

---

## 📁 Estructura del Proyecto

```
examen-visual/
├── index.html          ← Archivo principal (abrir en el navegador)
├── css/
│   └── styles.css      ← Estilos visuales
├── js/
│   ├── scoring.js              ← Reglas de puntaje
│   ├── render-acuity.js        ← Render de pruebas de agudeza
│   ├── render-phorias.js       ← Render de pruebas de phorias
│   ├── render-stereopsis.js    ← Render de estereopsis
│   ├── render-color.js         ← Render de color + Ishihara
│   ├── render-campo.js         ← Render de campo visual
│   ├── render-encandilamiento.js ← Render de encandilamiento
│   ├── logic-bindings.js       ← Eventos y restauración de respuestas
│   └── exam.js                 ← Orquestador principal
├── ARCHITECTURE.md     ← Estándares de estructura y mantenimiento
└── README.md           ← Este archivo
```

---

## 🚀 Instalación

### Opción A — Uso local (sin servidor web)
1. Extraiga el archivo `.rar` en cualquier carpeta.
2. Abra el archivo `index.html` con cualquier navegador moderno
   (Google Chrome, Firefox, Edge, Safari).
3. ¡Listo! No requiere instalación adicional.

### Opción B — En un servidor web (recomendado para uso en consultorio)
1. Copie la carpeta completa al servidor web.
   - En Apache: `/var/www/html/examen-visual/`
   - En XAMPP (Windows): `C:\xampp\htdocs\examen-visual\`
   - En WAMP: `C:\wamp64\www\examen-visual\`
   - En hosting cPanel: suba la carpeta al directorio `public_html/`
2. Acceda desde el navegador en: `http://localhost/examen-visual/`
   o `https://su-dominio.com/examen-visual/`

> **Nota PHP:** El sistema no utiliza PHP. Es 100% HTML + CSS + JavaScript
> del lado del cliente. No requiere base de datos ni configuración de servidor.

---

## 🎯 Las 12 Pruebas

| # | Nombre | Tipo |
|---|--------|------|
| 1 | Agudeza Visual Lejana – Ojo Derecho | Selección de fila/columna |
| 2 | Agudeza Visual Lejana – Ojo Izquierdo | Selección de fila/columna |
| 3 | Agudeza Visual Lejana – Ambos Ojos | Selección de fila/columna |
| 4 | Phorias Lejanas | Punto de cruce verde/rojo |
| 5 | Estereopsis | Figura destacada por fila |
| 6 | Discriminación al Color | Números en círculos Ishihara |
| 7 | Campo Visual | Sí/No por ángulo periférico |
| 8 | Agudeza Visual Cercana – Ojo Derecho | Selección de fila/columna |
| 9 | Agudeza Visual Cercana – Ojo Izquierdo | Selección de fila/columna |
| 10 | Agudeza Visual Cercana – Ambos Ojos | Selección de fila/columna |
| 11 | Phorias Cercanas | Punto de cruce verde/rojo |
| 12 | Encandilamiento AV | Fila leída + tiempo de recuperación |

---

## ✏️ Cómo Cambiar los Puntajes

> **Archivo a editar:** `js/scoring.js`

Abra el archivo con cualquier editor de texto (Bloc de Notas, VSCode, Notepad++).

### 1. Puntajes de Agudeza Visual (Pruebas 1, 2, 3, 8, 9, 10)

Busque el bloque `acuity:` dentro de `window.SCORING`:

```javascript
acuity: {
  A_1: 8,   // Columna A – Fila 1 (6 dígitos, mejor visión) ← CAMBIE AQUÍ
  A_2: 5,   // Columna A – Fila 2
  A_3: 2,   // Columna A – Fila 3 (peor visión)
  B_1: 7,   // Columna B – Fila 1
  ...
}
```

**Lógica:**
- Fila 1 = el candidato ve los números más pequeños = **mejor agudeza** → asignar más puntos
- Fila 3 = solo ve los números grandes = **menor agudeza** → menos puntos
- Columna A/B/C representan diferentes conjuntos de optotipos

### 2. Puntajes de Phorias (Pruebas 4 y 11)

Busque el bloque `phorias:`. Los valores van de `'0.0'` a `'8.5'`.

```javascript
phorias: {
  '0.0': 5,  // Sin desviación = máximo puntaje
  '0.5': 5,
  '1.0': 4,
  ...
  '5.0': 0,  // Mayor desviación = 0 puntos
}
```

El puntaje de cada prueba de phorias se calcula como el promedio
de la línea horizontal y la línea vertical.

### 3. Puntajes de Estereopsis (Prueba 5)

```javascript
stereopsis: {
  correctAnswers: [0, 2, 4, 1, 3], // ← índice de figura correcta por fila
  pointsCorrect:  2,   // Respuesta exacta
  pointsAny:      1,   // Seleccionó algo pero no la correcta
  pointsNone:     0,   // Seleccionó "Ninguna"
}
```

**`correctAnswers`:** Es un array de 5 valores (uno por fila).
- Cada valor es el índice de la figura correcta: `0` = primera figura, `1` = segunda, ..., `4` = quinta.
- Ejemplo: `[0, 2, 4, 1, 3]` significa:
  - Fila 1: la figura correcta es la 1ª (índice 0)
  - Fila 2: la figura correcta es la 3ª (índice 2)
  - etc.

> ⚠️ **Importante:** Ajuste `correctAnswers` según el protocolo de evaluación del consultorio.

### 4. Discriminación al Color (Prueba 6)

```javascript
colorDiscrimination: {
  totalCircles:    6,  // Cantidad de círculos
  pointsPerCircle: 2,  // Puntos por cada número identificado
}
```

### 5. Campo Visual (Prueba 7)

```javascript
campoVisual: {
  pointsPerYes: 1,  // Puntos por cada luz periférica vista
}
```
Hay 8 ángulos en total → puntaje máximo = 8.

### 6. Encandilamiento (Prueba 12)

```javascript
encandilamiento: {
  filaScores: {
    1: 6,  // Lee fila 1 = mejor recuperación
    2: 3,  // Lee fila 2
    3: 0,  // Solo lee fila 3
  },
  timeScores: {
    'menos5': 6,  // 5 o menos segundos
    '6y7':    3,  // 6 y 7 segundos
    'mas8':   0,  // 8 o más segundos
  }
}
```

---

## 📊 Puntaje Total Máximo Actual

| Prueba | Máximo |
|--------|--------|
| Prueba 1 – AV Lejana OD | 8 |
| Prueba 2 – AV Lejana OI | 8 |
| Prueba 3 – AV Lejana AO | 8 |
| Prueba 4 – Phorias Lejanas | 5 |
| Prueba 5 – Estereopsis | 10 |
| Prueba 6 – Discriminación Color | 12 |
| Prueba 7 – Campo Visual | 8 |
| Prueba 8 – AV Cercana OD | 8 |
| Prueba 9 – AV Cercana OI | 8 |
| Prueba 10 – AV Cercana AO | 8 |
| Prueba 11 – Phorias Cercanas | 5 |
| Prueba 12 – Encandilamiento | 12 |
| **TOTAL** | **100** |

---

## 🔧 Cómo Cambiar los Números de las Pruebas de Agudeza

Si necesita cambiar los números que aparecen en las pruebas 1, 2, 3, 8, 9, 10:

1. Abra `js/exam.js`
2. Busque el array `const TESTS = [...]`
3. Localice la prueba deseada (e.g., `id: 1`)
4. Modifique los valores en `columns`:

```javascript
{
  id: 1,
  ...
  columns: {
    A: [
      { row: 1, number: '547638' },  // ← Cambie este número
      { row: 2, number: '795823' },
      { row: 3, number: '9574'   },
    ],
    B: [...],
    C: [...],
  }
}
```

---

## 🖨️ Imprimir Resultados

Al finalizar el examen, haga clic en **"Imprimir Reporte"** en la ventana de resultados.
Esto abrirá el diálogo de impresión del navegador con el resumen de puntajes.

---

## 🌐 Compatibilidad de Navegadores

| Navegador | Compatible |
|-----------|-----------|
| Google Chrome 90+ | ✅ |
| Mozilla Firefox 88+ | ✅ |
| Microsoft Edge 90+ | ✅ |
| Safari 14+ | ✅ |
| Internet Explorer | ❌ No compatible |

---

## ❓ Preguntas Frecuentes

**¿Se guardan los datos del candidato?**
No. Los datos existen solo mientras el navegador está abierto. Al cerrar o recargar, se borran. Si necesita persistencia, se requeriría integración con PHP + base de datos (consultar con el equipo de desarrollo).

**¿Se puede usar en tableta o celular?**
Sí. El diseño es responsivo y funciona en pantallas pequeñas, aunque se recomienda uso en computador para mejor experiencia del evaluador.

**¿Puedo cambiar el logo o nombre "OptiEval"?**
Sí. En `index.html`, busque `<span class="brand-name">OptiEval</span>` y cambie el texto. El logo SVG también puede reemplazarse por una imagen con `<img src="logo.png" width="32" height="32" />`.

---

*Versión 1.0 — Desarrollado para uso en consultorio oftalmológico*
