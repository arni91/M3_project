# 🎵 Proyecto React Form - Canciones

Este proyecto es una práctica de **React** en la que se construye un formulario de contacto con validaciones y estilos aplicados mediante **CSS Modules**.

## 📌 Objetivos del ejercicio

- Crear un **formulario de contacto** en React.
- Aplicar **validaciones nativas de HTML5** (campos requeridos, patrones, rangos, etc.).
- Estilizar el formulario utilizando **CSS**.
- Mantener una estructura de proyecto clara y modular.

## 📂 Estructura



```bash
react_form/
├─ public/
│ └─ canciones.json # Datos de canciones de ejemplo
├─ src/
│ ├─ components/
│ │ └─ ContactForm/
│ │ ├─ ContactForm.jsx # Formulario de contacto
│ │ └─ ContactForm.module.css # Estilos del formulario
│ ├─ routes/
│ │ └─ AppRouter.jsx # Rutas principales (incluye formulario)
│ ├─ App.jsx
│ ├─ main.jsx
│ ├─ index.css
│ └─ App.css
└─ package.json
```
---

## 🖼️ Captura

![Preview de la App](public/images/screenshot.png)

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/arni91/react_form.git

2. Instalar dependencias:

    ```bash
    npm install
    ```
3. Ejecutar en modo desarrollo:
    ```bash
    npm run dev
    ```
El proyecto se abrirá en http://localhost:5173/.

---

## 🎯 Resultado esperado

- Al entrar en /form, aparece un formulario con:
    - Campos de nombre, apellidos, email, teléfono, usuario, etc.
    - Selectores, checkboxes, radios, textarea y validaciones.
    - Botones de Reset y Enviar.
- El formulario está validado y estilizado con CSS.

---
