const express = require('express');
const router = express.Router();

const registroController = require("../controllers/registroController");

router.get('/obterCorredores', function(req, res){
    registroController.obterCorredores(req, res);
});

router.get('/obterPassagensUltimaSemana', function(req, res){
    registroController.obterPassagensUltimaSemana(req, res);
});

router.get('/obterMediaSemanas', function(req, res){
    registroController.obterMediaSemanas(req, res);
});

router.get('/obterPassagensHoje', function(req, res){
    registroController.obterPassagensHoje(req, res);
});

router.get('/obterMudancas', function(req, res){
    registroController.obterMudancas(req, res);
});

router.get('/obterPassagensPeriodo', function(req, res){
    registroController.obterPassagensPeriodo(req, res);
});

router.get('/obterPassagensPeriodoMes', function(req, res){
    registroController.obterPassagensPeriodoMes(req, res);
});

module.exports = router;