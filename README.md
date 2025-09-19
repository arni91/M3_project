# ⏱️ M3 Project – Control de Fichajes

Aplicación CRUD para gestionar fichajes de trabajadores (check-in / check-out) con frontend en **React + Vite** y backend en **Supabase** (PostgreSQL gestionado).

---

## 🚀 Funcionalidades

- **Fichajes de trabajadores**: check-in y check-out múltiples por día.
- **Roles**: trabajador y administrador.  
  - Trabajador: solo puede ver sus fichajes y registrar entrada/salida.  
  - Administrador: puede ver todos los fichajes.
- **Vista de horas trabajadas**: cálculo de horas diarias por trabajador.
- **Conexión Supabase**: consulta real a base de datos.
- **Frontend en React**:  
  - Listado de fichajes.  
  - Formulario check-in / check-out.  
  - Vista de horas trabajadas.  
  - Botón "Probar conexión" (`/api/health`).

---

## 🛠️ Tecnologías

- **Frontend**: React (Vite, React Router, Hooks).  
- **Backend**: Supabase (PostgreSQL + REST API).  
- **ORM**: consultas SQL directas a través de Supabase client.  

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


## 🗄️ Base de datos (Supabase)

```bash
create table fichajes (
  id bigint generated always as identity primary key,
  trabajador text not null,
  rol text check (rol in ('cocinero','camarero')) not null,
  checkin timestamp not null default now(),
  checkout timestamp,
  created_at timestamp not null default now()
);
```
```bash 
create or replace view horas_trabajadas as
select 
  trabajador,
  rol,
  date(checkin) as dia,
  sum(extract(epoch from (checkout - checkin)) / 3600) as horas_trabajadas
from fichajes
where checkout is not null
group by trabajador, rol, date(checkin)
order by trabajador, dia;
```

---

## 📜 Scripts disponibles

En /frontend:

- npm run dev → arranca en modo desarrollo.
- npm run build → compila el proyecto para producción.
- npm run preview → sirve el build generado.

## ✅ Conclusión

- 
- 

---

## 👤 Autor

Proyecto realizado por Arni dentro del módulo 3 de Fullstack.

---

