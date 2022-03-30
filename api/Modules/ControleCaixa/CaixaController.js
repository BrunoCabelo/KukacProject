const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fc = require('./CaixaFunctions');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/calculoTroco', (req, res) => {
    val1 = req.body.val1;
    val2 = req.body.val2;
    
    val1 = parseInt(val1);
    val2 = parseInt(val2);

    var objres = fc.calculoTroco(val1, val2);
    resposta = objres.resp;
    if(resposta != false){
        res.status(200);
        res.json(objres.data);
    }else{
        res.status(400);
        res.json({err: 'Erro ao realizar o calculo'});
    }
});

module.exports = router;