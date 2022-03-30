const express = require("express");
const router = express.Router();
const fc = require('./CepFunctions');

router.post('/ceps', (req, res) => {
    arr = req.body.ceps;
    async function main(){
        var array = await fc.reqCep(arr);
        console.log(array);
        res.status(200);
        res.json(array);
    }
    main();
});

module.exports = router;