const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fc = require('./PalindromosFunctios');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.post('/palindromos', (req, res) => {
    var inter1 = req.body.inter1;
    var inter2 = req.body.inter2;

    var arr = fc.verifyPalindromos(inter1, inter2);
    res.status(200);
    console.log(arr)
    res.json(arr);
})

module.exports = router;