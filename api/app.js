const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Modules
const palindromos = require('./Modules/Palindromos/PalindromosController');
const controleCaixa = require('./Modules/ControleCaixa/CaixaController');
const ceps = require('./Modules/Ceps/CepController');
const veiculos = require('./Modules/ControleVeiculos/VeiculosController');

app.use('/', veiculos);
app.use('/', palindromos);
app.use('/', controleCaixa);
app.use('/', ceps);


app.listen(8080, () => {
    console.log('App rodando');
})