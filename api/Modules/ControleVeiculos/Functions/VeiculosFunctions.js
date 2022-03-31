const { configs } = require('@typescript-eslint/eslint-plugin');
const { json } = require('body-parser');
const fs = require('fs');
const Veiculo = require('../Class/VeiculoClass');
const Carro = require('../Class/CarroClass');
const Moto = require('../Class/MotoClass');

async function getVeiculos(){
    return new Promise((resolve, reject) => {
        fs.readFile('./Modules/ControleVeiculos/json/nosql.json',{encoding: 'utf-8'}, (erro, data) => {
            if(erro){
                reject(false)
            }else{
                resolve(data);
            }
        });
    })
}

async function saveVeiculo(obj){
    var db = await getVeiculos();
    var size = db.length;
    var stringDB = db.slice(0, -1);
    
    var tipo = obj.tipo;
    var modelo = obj.modelo;
    var ano = obj.ano;
    var portas = obj.portas;
    var marca = obj.marca;
    var passageiros = obj.passageiros;
    var d = Date.now();
    var data = d.toString();
    
    if(tipo == 'moto'){
        var newobj = `,"${data}": {"tipo": "${tipo}", "modelo": "${modelo}", "ano": "${ano}", "passageiros": "${passageiros}", "marca": "${marca}"}}`;
    }else{
        var newobj = `,"${data}": {"tipo": "${tipo}", "modelo": "${modelo}", "ano": "${ano}", "portas": "${portas}", "marca": "${marca}"}}`;
    }

    
    
    stringDB += newobj;
    var jsn = JSON.parse(stringDB);
    var content = JSON.stringify(jsn);

    fs.writeFile('./Modules/ControleVeiculos/json/nosql.json', content, (err)=>{
        if(err){
            return false;
        }else{
            return true;
        }
    })
   
}

async function createVeiculos(jsn){
    arr = Object.keys(jsn).map(i => jsn[Number(i)]);
    var objArr = [];
    for(let i = 0; i < arr.length; i++){
        obj = arr[i];
        tipo = obj.tipo;

        switch(tipo){
            case 'carro':
                var car = new Carro(obj.tipo, obj.modelo, obj.ano, obj.portas, obj.marca);
                objArr.push(car);
                break;
            case 'moto': 
                var mot = new Moto(obj.tipo, obj.modelo, obj.ano, obj.portas, obj.marca, obj.passageiros);
                objArr.push(mot);
                break;
        }
    }
 
    return objArr;
}

module.exports = {getVeiculos, saveVeiculo,createVeiculos};