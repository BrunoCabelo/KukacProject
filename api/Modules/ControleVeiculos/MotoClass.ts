import Veiculo from "./VeiculoClass";

class Moto extends Veiculo {
    public rodas: number = 2;
    public passageiros: number;

    constructor(model: string, year: string, doors: number, brand: string, passangers: number) {
        super(model, year, doors, brand);
        this.passageiros = passangers;
    }
}

export default Moto;