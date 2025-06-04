import routes from "./routes";

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const cors = require('cors');
const { conf } = require('./conf');
app.use(cors());

app.use('/api', routes);

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend!' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en ${conf.host}:${PORT}`);
});