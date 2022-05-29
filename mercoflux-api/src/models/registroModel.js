const database = require("../database/config");

function obterCorredores(idMercado){
    const comando = `SELECT nomeCorredor FROM corredor WHERE fkMercado = ${idMercado}`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensUltimaSemana(idMercado){
    const comando = `SELECT nomeCorredor, COUNT(*) AS 'qtdPassagens' FROM registro INNER JOIN sensor ON idSensor = fkSensor INNER JOIN corredor ON fkCorredor = idCorredor INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 7 DAY) AND CURRENT_DATE GROUP BY idCorredor`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterMediaSemanas(idMercado){
    const comando = `SELECT TRUNCATE(AVG(qtdPassagens), 2) AS 'media' FROM (
        SELECT COUNT(*) AS 'qtdPassagens' FROM registro
        INNER JOIN sensor ON idSensor = fkSensor
        INNER JOIN corredor ON fkCorredor = idCorredor
        INNER JOIN mercado ON fkMercado = idMercado
        WHERE fkMercado = ${idMercado} AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 1 YEAR) AND CURRENT_DATE
        GROUP BY idCorredor, WEEK(momento)
    ) AS resultado`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensHoje(idMercado){
    const comando = `SELECT nomeCorredor, COUNT(*) AS 'passagens' FROM registro INNER JOIN sensor ON idSensor = fkSensor INNER JOIN corredor ON fkCorredor = idCorredor INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND DATE(momento) = CURRENT_DATE GROUP BY idCorredor`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterMudancas(idMercado, limite){
    const comando = `SELECT dataMudanca, localizacao, descricao FROM mudanca INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} ORDER BY dataMudanca DESC, idMudanca DESC LIMIT ${limite}`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensPeriodo(idMercado, corredor1, corredor2, dataInicio, dataFim){
    const comando = `SELECT nomeCorredor, DATE(momento) AS 'data', COUNT(*) AS 'passagens' FROM registro INNER JOIN sensor ON idSensor = fkSensor INNER JOIN corredor ON fkCorredor = idCorredor INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND (nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}') AND DATE(momento) BETWEEN '${dataInicio}' AND '${dataFim}' GROUP BY idCorredor, DATE(momento) ORDER BY DATE(momento)`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensPeriodoMes(idMercado, corredor1, corredor2){
    const comando = `SELECT MONTH(momento) AS 'mes', nomeCorredor, COUNT(*) AS 'passagens'  FROM registro INNER JOIN sensor ON idSensor = fkSensor INNER JOIN corredor ON fkCorredor = idCorredor INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND (nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}') AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 1 YEAR) AND (CURRENT_DATE) GROUP BY idCorredor, MONTH(momento) ORDER BY mes`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
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