import fetch from "node-fetch";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  "Content-Type": "application/json",
  apiKey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

// helper para leer JSON solo si existe
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function runTests() {
  console.log("🔎 Iniciando pruebas CRUD contra Supabase...");

  // 1. Crear fichaje
  let res = await fetch(`${SUPABASE_URL}/rest/v1/fichajes`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation", // fuerza que devuelva el registro insertado
    },
    body: JSON.stringify({ trabajador: "TestUser", rol: "cocinero" }),
  });
  let data = await safeJson(res);
  const inserted = data?.[0];
  console.log("✅ Insertado:", inserted);

  // 2. Leer fichaje
  res = await fetch(`${SUPABASE_URL}/rest/v1/fichajes?id=eq.${inserted.id}`, {
    headers,
  });
  data = await safeJson(res);
  console.log("✅ Leído:", data);

  // 3. Actualizar fichaje (checkout)
  res = await fetch(`${SUPABASE_URL}/rest/v1/fichajes?id=eq.${inserted.id}`, {
    method: "PATCH",
    headers: {
      ...headers,
      Prefer: "return=representation", // recibir el registro actualizado
    },
    body: JSON.stringify({ checkout: new Date().toISOString() }),
  });
  data = await safeJson(res);
  console.log("✅ Actualizado:", data);

  // 4. Borrar fichaje
  res = await fetch(`${SUPABASE_URL}/rest/v1/fichajes?id=eq.${inserted.id}`, {
    method: "DELETE",
    headers,
  });
  console.log("✅ Borrado:", res.status === 204 ? "OK" : "Fallo");

  console.log("🎉 Pruebas CRUD finalizadas");
}

runTests().catch((err) => console.error("❌ Error en pruebas:", err));
