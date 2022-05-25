const registroModel = require("../models/registroModel");

function listar(req, res){
    registroModel.listar()
    .then((resultado) => {
        if(resultado.length == 0){
            res.status(403).send("Nenhum dado registrado!");
        }
        else{
            res.json(resultado);
        }
    })
    .catch((erro) => {
        console.log(erro);
        console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function quantidadeCorredores(req, res){
    registroModel.quantidadeCorredores()
    .then((resultado) => {
        if(resultado.length == 0){
            res.status(403).send("Nenhum dado registrado!");
        }
        else{
            res.json(resultado);
        }
    })
    .catch((erro) => {
        console.log(erro);
        console.log(`Houve um erro ao pegar a quantidade de corredores! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listar,
    quantidadeCorredores
}