const express = require('express');
const router = express.Router();

const registroController = require("../controllers/registroController");

router.get('/listar', function(req, res){
    registroController.listar(req, res);
});

router.get('/quantidadeCorredores', function(req, res){
    registroController.quantidadeCorredores(req, res);
});

module.exports = router;