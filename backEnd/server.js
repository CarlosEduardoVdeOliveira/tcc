const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// /api-apiario
// ├── src/
// │   ├── config/
// │   │   └── database.js
// │   ├── controllers/
// │   │   ├── produtorController.js
// │   │   ├── colmeiaController.js
// │   │   ├── atividadeController.js
// │   │   ├── producaoMelController.js
// │   │   ├── temperaturaUmidadeController.js
// │   │   ├── alimentacaoController.js
// │   │   └── enfermiadeController.js
// │   ├── models/
// │   │   ├── index.js
// │   │   ├── Produtor.js
// │   │   ├── Colmeia.js
// │   │   ├── Atividade.js
// │   │   ├── ProducaoMel.js
// │   │   ├── TemperaturaUmidade.js
// │   │   ├── Alimentacao.js
// │   │   └── Enfermidade.js
// │   ├── routes/
// │   │   ├── index.js
// │   │   ├── produtorRoutes.js
// │   │   ├── colmeiaRoutes.js
// │   │   ├── atividadeRoutes.js
// │   │   ├── producaoMelRoutes.js
// │   │   ├── temperaturaUmidadeRoutes.js
// │   │   ├── alimentacaoRoutes.js
// │   │   └── enfermidadeRoutes.js
// │   ├── middleware/
// │   │   └── auth.js
// │   └── app.js
// ├── .env
// ├── package.json
// └── server.js
