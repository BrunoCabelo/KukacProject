const express = require("express");

function calculoTroco(val1, val2){
    var compra = val1;
    var valor = val2;

    var notas100 = 0;
    var notas10 = 0;
    var notas1 = 0;

    if(compra <= valor){
        var trocoTotal = valor - compra;
        var troco = valor - compra;

        while(troco > 0){
            if(troco >= 100){
                var obj100 = maior100(troco);
                troco = obj100.valor
                notas100 = obj100.notas;
            }else if(troco >= 10){
                var obj10 = maior10(troco);
                troco = obj10.valor;
                notas10 = obj10.notas;
            }else if(troco > 1){
                var obj1 = maior1(troco);
                troco = obj1.valor;
                notas1 = obj1.notas;
            }
        }

        objFinal = {
            data:{
            compra,
            trocoTotal,
            notas100,
            notas10,
            notas1
            },
            resp: true
        }
        return objFinal;
    }else{

        objFinalerr = {resp: false}
        return objFinalerr;
    }
}

function maior100(val){
    var notas = 0
    var valor = val
    while(valor >= 100){
        valor = valor - 100;
        notas++
    }
    var obj = {
        valor,
        notas
    }
    return obj;
}

function maior10(val){
    var notas = 0
    var valor = val
    while(valor >= 10){
        valor = valor - 10;
        notas++
    }
    var obj = {
        valor,
        notas
    }
    return obj;
}

function maior1(val){
  
    var notas = 0
    var valor = val

    while(valor >= 1){
        valor = valor - 1;
        notas++
    }
    var obj = {
        valor,
        notas
    }
    return obj;
}


module.exports = {calculoTroco};