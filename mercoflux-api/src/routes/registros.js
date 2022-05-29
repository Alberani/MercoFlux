const express = require('express');
const router = express.Router();

const registroController = require("../controllers/registroController");

router.get('/obterCorredores', function(req, res){
    registroController.obterCorredores(req, res);
});

router.get('/obterPassagensUltimaSemana', function(req, res){
    registroController.obterPassagensUltimaSemana(req, res);
});

router.get('/obterPassagensHoje', function(req, res){
    registroController.obterPassagensHoje(req, res);
})

module.exports = router;