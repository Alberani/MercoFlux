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
        // console.log(erro);
        // console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
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
        // console.log(erro);
        // console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterMediaSemanas(req, res){
    const idMercado = req.query.idMercado;
    registroModel.obterMediaSemanas(idMercado)
    .then((resultado) => {
        if(resultado.length == 0){
            res.status(403).send("Nenhum dado registrado!");
        }
        else{
            res.json(resultado);
        }
    })
    .catch((erro) => {
        // console.log(erro);
        // console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterPassagensHoje(req, res){
    const idMercado = req.query.idMercado;
    registroModel.obterPassagensHoje(idMercado)
    .then((resultado) => {
        console.log(resultado);
        res.json(resultado);
    })
    .catch((erro) => {
        // console.log(erro);
        // console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterMudancas(req, res){
    const idMercado = req.query.idMercado;
    const limite = req.query.limite;
    registroModel.obterMudancas(idMercado, limite)
    .then((resultado) => {
        res.json(resultado);
    })
    .catch((erro) => {
        // console.log(erro);
        // console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterPassagensPeriodo(req, res){
    const idMercado = req.query.idMercado;
    const corredor1 = req.query.corredor1;
    const corredor2 = req.query.corredor2;
    const dataInicio = req.query.inicio;
    const dataFim = req.query.fim;
    registroModel.obterPassagensPeriodo(idMercado, corredor1, corredor2, dataInicio, dataFim)
    .then((resultado) => {
        res.json(resultado);
    })
    .catch((erro) => {
        // console.log(erro);
        // console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterPassagensPeriodoMes(req, res){
    const idMercado = req.query.idMercado;
    const corredor1 = req.query.corredor1;
    const corredor2 = req.query.corredor2;
    registroModel.obterPassagensPeriodoMes(idMercado, corredor1, corredor2)
    .then((resultado) => {
        res.json(resultado);
    })
    .catch((erro) => {
        // console.log(erro);
        // console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    obterCorredores,
    obterPassagensUltimaSemana,
    obterMediaSemanas,
    obterPassagensHoje,
    obterMudancas,
    obterPassagensPeriodo,
    obterPassagensPeriodoMes,
}