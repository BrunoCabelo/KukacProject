const fs = require('fs');
const util = require('util');


class Veiculo {
    constructor(modelo, ano, portas, marca){
        this.modelo = modelo;
        this.ano = ano;
        this.portas = portas;
        this.marca = marca;
    }

}

module.exports = Veiculo;