const database = require("../database/config");

function obterCorredores(idMercado){
    const comando = `SELECT nomeCorredor FROM corredor WHERE fkMercado = ${idMercado}`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensUltimaSemana(idMercado){
    const comando = `SELECT nomeCorredor, COUNT(*) AS 'qtdPassagens' FROM registro INNER JOIN sensor ON idSensor = fkSensor INNER JOIN corredor ON fkCorredor = idCorredor INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND MONTH(momento) >= MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(momento) >= MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND YEAR(momento) >= YEAR(CURRENT_DATE - INTERVAL 1 MONTH) GROUP BY idCorredor`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensHoje(idMercado){
    const comando = `SELECT nomeCorredor, COUNT(*) AS 'passagens' FROM registro INNER JOIN sensor ON idSensor = fkSensor INNER JOIN corredor ON fkCorredor = idCorredor INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND DATE(momento) = CURRENT_DATE GROUP BY idCorredor`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

module.exports = {
    obterCorredores,
    obterPassagensUltimaSemana,
    obterPassagensHoje,
}