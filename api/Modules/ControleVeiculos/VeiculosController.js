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

            var arrCarrs = await fc.createVeiculos(json);
            
            res.json({items: arrCarrs});    
        }
    }
    main();
    
});

router.post('/veiculo', (req, res) => {
    var {tipo, modelo, ano, portas, marca, passageiros} = req.body;

    var obj ={ tipo, modelo, ano, portas, marca, passageiros}
    fc.saveVeiculo(obj)
    res.status(200);
    res.json('ok')

});

module.exports = router;