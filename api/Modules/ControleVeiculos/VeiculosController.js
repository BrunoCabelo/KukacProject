const express = require('express');
const router = express.Router();
const fs = require('fs');
const fc = require('./Functions/VeiculosFunctions')

//Classes
const Veiculo = require('./Class/VeiculoClass');
const { json } = require('body-parser');

router.get('/veiculos', (req, res) => {
    async function main(){
        var data = await fc.getVeiculos();
        if(data == false){
            res.status(404);
            res.json('erro');
        }else{
            res.status(200);
            var json = JSON.parse(data);

            var teste = await fc.createVeiculos(json);
            console.log(teste);
            res.json(json);    
        }
    }
    main();
    
});

router.post('/veiculo', (req, res) => {
    var {tipo, modelo, ano, portas, marca} = req.body;

    var obj ={ tipo, modelo, ano, portas, marca}
    fc.saveVeiculo(obj)

});

module.exports = router;