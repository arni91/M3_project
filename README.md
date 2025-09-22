# Proyecto de Fichajes - InOut

Aplicación de fichajes para un restaurante con roles de **cocinero** y **camarero**, desarrollada con **React** (frontend) y **Supabase** (backend).

## 🚀 Requisitos
- Node.js >= 18
- Cuenta y proyecto en [Supabase](https://supabase.com)

---

## ⚙️ Variables de entorno
Crea un archivo `.env` en la raíz del proyecto con:

VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>


Estas claves las obtienes en **Supabase > Project settings > API**.

---

## ▶️ Arranque del proyecto
Instalar dependencias y ejecutar el servidor de desarrollo:

```bash
npm install
npm run dev
```

La aplicación se abrirá en:
👉 http://localhost:5173

## 📂 Rutas del frontend

- /fichajes → listado con búsqueda, enlaces a detalle y opción de borrar.

- /fichajes/:id → detalle de un fichaje concreto.

- /nuevo → formulario de checkin y checkout.

- /salud → prueba de conexión con la base de datos.

---

## 🗄️ Backend (Supabase)
Tablas y lógica

- Tabla fichajes
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
- Vista horas_trabajadas
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
- Función get_horas_trabajadas()
```bash
create or replace function get_horas_trabajadas()
returns setof horas_trabajadas
language sql
security definer
as $$
  select * from horas_trabajadas;
$$;
```
---

## ✅ Pruebas básicas de backend

El proyecto incluye un test de integración del CRUD con Node.js.

📂 Ubicación

```bash 
/tests/crud.test.js
```
▶️ Ejecución

1. Instalar dependencia:

```bash
npm install node-fetch
```
2. Exportar las variables de entorno en la terminal:

```bash
export VITE_SUPABASE_URL="https://<your-project>.supabase.co"
export VITE_SUPABASE_ANON_KEY="<your-anon-key>"
```
3. Ejecutar las pruebas:

```bash 
node tests/crud.test.js
```
📋 Qué valida

- Crear fichaje

- Leer fichaje

- Actualizar checkout

- Borrar fichaje

Salida esperada:

```bash
🔎 Iniciando pruebas CRUD contra Supabase...
✅ Insertado: { ... }
✅ Leido: [ ... ]
✅ Actualizado: [ ... ]
✅ Borrado: OK
🎉 Pruebas CRUD finalizadas
```
---
## 📌 Control de versiones

Repositorio público con commits pequeños con revisiones .revXX y mensajes claros.

---
✍️ Autor: Arni
