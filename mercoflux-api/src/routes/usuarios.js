var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/pegarDadosPessoais", function(req, res){
    usuarioController.pegarDadosPessoais(req, res);
});

router.get("/pegarDadosMercado", function(req, res){
    usuarioController.pegarDadosMercado(req, res);
});

router.get("/listarUsuarios", function(req, res){
    usuarioController.listarUsuarios(req, res);
});

router.get("/removerUsuario", function(req, res){
    usuarioController.removerUsuario(req, res);
});


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/adicionarUsuario", function (req, res) {
    usuarioController.adicionarUsuario(req, res);
});

router.post("/atualizarUsuario", function (req, res) {
    usuarioController.atualizarUsuario(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/adicionarMudanca", function(req, res){
    usuarioController.adicionarMudanca(req, res);
});

module.exports = router;