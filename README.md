# 🎵 Proyecto React – Canciones (CRUD con API)

## 📌 Enunciado del ejercicio

1. Conéctate con la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts).  

2. Implementa un **CRUD completo**:
   - **Leer** datos al cargar el componente.  
   - **Crear** datos nuevos con un botón “Crear”.  
   - **Actualizar** datos con un botón “Actualizar”.  
   - **Borrar** datos tras confirmación con un botón “Borrar”.  

---

## 🚀 Tecnologías utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/) para la navegación
- **Hooks** de React (`useState`, `useEffect`, `useMemo`)
- **CSS Modules** para estilos aislados

---

## 📂 Estructura del proyecto

```bash
src/
├── components/
│ └── ApiCancionCRUD/ 
├── routes/
│ └── AppRouter.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📋 Funcionalidades principales

### 🔹 CRUD con JSONPlaceholder
- Conexión a `https://jsonplaceholder.typicode.com/posts`.
- **Leer**: al cargar el componente.  
- **Crear**: formulario con botón *Crear*.  
- **Actualizar**: botón *Editar* → formulario editable → *Guardar cambios*.  
- **Borrar**: confirmación con `confirm()` antes de eliminar.  
- Los cambios se reflejan en la UI, aunque la API no guarda nada de forma persistente.

---

## 🖥️ Ejecución del proyecto

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/arni91/crud_base.git
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

## ✅ Conclusión

- Conexión a  API externa (JSONPlaceholder).
- Un CRUD completo que cumple con los requisitos del enunciado

---
