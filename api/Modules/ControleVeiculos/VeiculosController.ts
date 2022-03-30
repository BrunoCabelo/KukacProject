import express from "express";
const router = express.Router();

router.post('/veiculos', (req, res) => {
    res.json('hello Word');
})