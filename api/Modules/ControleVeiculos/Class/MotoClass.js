const Veiculo = require('./VeiculoClass');

class Moto extends Veiculo{
    constructor(tipo, modelo, ano, portas, marca, passageiros){
        super(tipo, modelo, ano, portas, marca);
        this.passageiros = passageiros;
    }

}

module.exports = Moto;