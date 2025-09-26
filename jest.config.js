export default {
  testEnvironment: "node", // 👈 no hace falta jsdom, aquí no usamos React
  transform: {},           // no necesitamos Babel para tests de Node simples
}
