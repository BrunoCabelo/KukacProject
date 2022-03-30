class Veiculo {
    public modelo: string;
    public ano: string;
    public portas: number;
    public marca: string;

    constructor(model: string, year: string, doors: number, brand: string) {
        this.modelo = model;
        this.ano = year;
        this.portas = doors;
        this.marca = brand;
    }

}

export default Veiculo;