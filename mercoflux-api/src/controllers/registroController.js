const registroModel = require("../models/registroModel");

function obterCorredores(req, res){
    const idMercado = req.query.idMercado;
    registroModel.obterCorredores(idMercado)
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

function obterPassagensUltimaSemana(req, res){
    const idMercado = req.query.idMercado;
    registroModel.obterPassagensUltimaSemana(idMercado)
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

function obterPassagensHoje(req, res){
    const idMercado = req.query.idMercado;
    registroModel.obterPassagensHoje(idMercado)
    .then((resultado) => {
        res.json(resultado);
    })
    .catch((erro) => {
        console.log(erro);
        console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    obterCorredores,
    obterPassagensUltimaSemana,
    obterPassagensHoje,
}