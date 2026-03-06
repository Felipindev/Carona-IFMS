const express = require('express');
const db = require('./firebase');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const usuariosRotas = require('./routes/usuariosRotas');
app.use('/usuarios', usuariosRotas);

const caronasRotas = require('./routes/CaronasRotas');
app.use('/caronas', caronasRotas);

const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em: http://localhost:${porta} `);
})