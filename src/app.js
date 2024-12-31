const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

//Rotas
app.use('/api', routes);

//Inicilaizar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});