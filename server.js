const express = require("express");
const apicache = require("apicache");
const app = express();
const PORT = 3000;

let cache = apicache.middleware;

// Dados
const pessoas = [
  { id: 1, nome: "José" },
  { id: 2, nome: "Roberto" },
  { id: 3, nome: "Maria" },
];

const carros = [
  { id: 1, modelo: "Hb20" },
  { id: 2, modelo: "Gol" },
  { id: 3, modelo: "Palio" },
];

const animais = [
  { id: 1, nome: "Gato" },
  { id: 2, nome: "Sapo" },
  { id: 3, nome: "Papagaio" },
];

// Status API
app.get("/", (req, res) => {
  const status = { status: 200, message: "API On" };
  res.json(status);
});

// Rotas
const router = express.Router();

router.get("/pessoas", (req, res) => {
  res.json(pessoas);
});

router.get("/pessoas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find((p) => p.id === id);
  if (pessoa) {
    res.json(pessoa);
  } else {
    res.json({});
  }
});

router.get("/carros", (req, res) => {
  res.json(carros);
});

router.get("/carros/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const carro = carros.find((c) => c.id === id);
  if (carro) {
    res.json(carro);
  } else {
    res.json({});
  }
});

router.get("/animais", (req, res) => {
  res.json(animais);
});

router.get("/animais/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const animal = animais.find((a) => a.id === id);
  if (animal) {
    res.json(animal);
  } else {
    res.json({});
  }
});

app.use("/api", cache("5 minutes"), router);

// Ouvir Server na Porta 3000
app.listen(PORT, () => {
  console.log("Server Started");
  console.log(`http://localhost:${PORT}`);
  console.log("\nRoutes:\n");
  console.log("/api/pessoas");
  console.log("/api/pessoas/:id");
  console.log("/api/carros");
  console.log("/api/carros/:id");
  console.log("/api/animais");
  console.log("/api/animais/:id");
});
