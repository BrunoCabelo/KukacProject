const fs = require('fs');
const util = require('util');


class Veiculo {
    constructor(tipo, modelo, ano, portas, marca){
        this.tipo = tipo;
        this.modelo = modelo;
        this.ano = ano;
        this.portas = portas;
        this.marca = marca;
    }

}

module.exports = Veiculo;