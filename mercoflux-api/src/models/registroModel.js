const database = require("../database/config");

function obterCorredores(idMercado){
    const comando = `SELECT nomeCorredor FROM corredor WHERE fkMercado = ${idMercado}`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensUltimaSemana(idMercado){
    // const comando = `SELECT nomeCorredor, COUNT(*) AS 'qtdPassagens' FROM registro
    //     INNER JOIN sensor ON idSensor = fkSensor
    //     INNER JOIN corredor ON fkCorredor = idCorredor
    //     INNER JOIN mercado ON fkMercado = idMercado
    //     WHERE fkMercado = ${idMercado} AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 7 DAY) AND CURRENT_DATE
    //     GROUP BY idCorredor`;

    const comando = `SELECT nomeCorredor, COUNT(*) AS 'qtdPassagens' FROM registro
        INNER JOIN sensor ON idSensor = fkSensor
        INNER JOIN corredor ON fkCorredor = idCorredor
        INNER JOIN mercado ON fkMercado = idMercado
        WHERE fkMercado = ${idMercado} AND CONVERT(DATE, momento) BETWEEN GETDATE() AND DATEADD(DAY, -7, GETDATE())
        GROUP BY nomeCorredor`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterMediaSemanas(idMercado){
    // const comando = `SELECT TRUNCATE(AVG(qtdPassagens), 2) AS 'media' FROM (
    //     SELECT COUNT(*) AS 'qtdPassagens' FROM registro
    //     INNER JOIN sensor ON idSensor = fkSensor
    //     INNER JOIN corredor ON fkCorredor = idCorredor
    //     INNER JOIN mercado ON fkMercado = idMercado
    //     WHERE fkMercado = ${idMercado} AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 1 YEAR) AND CURRENT_DATE
    //     GROUP BY idCorredor, WEEK(momento)
    // ) AS resultado`;
    
    const comando = `SELECT ROUND(AVG(qtdPassagens), 2) AS 'media' FROM (
        SELECT COUNT(*) AS 'qtdPassagens' FROM registro
        INNER JOIN sensor ON idSensor = fkSensor
        INNER JOIN corredor ON fkCorredor = idCorredor
        INNER JOIN mercado ON fkMercado = idMercado
        WHERE fkMercado = ${idMercado} AND CONVERT(DATE, momento) BETWEEN (CONVERT(DATE, GETDATE()) - INTERVAL 1 YEAR) AND CONVERT(DATE, GETDATE())
        GROUP BY idCorredor, WEEK(momento)
    ) AS resultado`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensHoje(idMercado){
    // const comando = `SELECT nomeCorredor, COUNT(idRegistro) AS 'passagens' FROM corredor
    //     JOIN sensor ON idCorredor = fkCorredor
    //     LEFT JOIN registro ON idSensor = fkSensor AND DATE(momento) = CURRENT_DATE
    //     JOIN mercado ON idMercado = fkMercado AND idMercado = ${idMercado}
    //     GROUP BY idCorredor`;

    const comando = `SELECT nomeCorredor, COUNT(idRegistro) AS 'passagens' FROM corredor
    JOIN sensor ON idCorredor = fkCorredor
    LEFT JOIN registro ON idSensor = fkSensor AND CONVERT(DATE, momento) = GETDATE()
    JOIN mercado ON idMercado = fkMercado AND idMercado = ${idMercado}
    GROUP BY idCorredor`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterMudancas(idMercado, limite){
    // const comando = `SELECT dataMudanca, localizacao, descricao FROM mudanca INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} ORDER BY dataMudanca DESC, idMudanca DESC LIMIT ${limite}`;
    const comando = `SELECT TOP ${limite} dataMudanca, localizacao, descricao FROM mudanca INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} ORDER BY dataMudanca DESC, idMudanca DESC`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensPeriodo(idMercado, corredor1, corredor2, dataInicio, dataFim){
    // const comando = `SELECT nomeCorredor, DATE(momento) AS 'data', COUNT(idRegistro) AS 'passagens' FROM corredor
    //     JOIN sensor ON idCorredor = fkCorredor
    //     JOIN registro ON idSensor = fkSensor AND DATE(momento) BETWEEN '${dataInicio}' AND '${dataFim}'
    //     JOIN mercado ON idMercado = fkMercado AND idMercado = ${idMercado}
    //     WHERE nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}'
    //     GROUP BY idCorredor, DATE(momento)
    //     ORDER BY DATE(momento)`;
    const comando = `SELECT nomeCorredor, CONVERT(DATE, momento) AS 'data', COUNT(idRegistro) AS 'passagens' FROM corredor
    JOIN sensor ON idCorredor = fkCorredor
    JOIN registro ON idSensor = fkSensor AND CONVERT(DATE, momento) BETWEEN '2022-01-02' AND '2022-01-04'
    JOIN mercado ON idMercado = fkMercado AND idMercado = 1
    WHERE nomeCorredor = '01' OR nomeCorredor = '02'
    GROUP BY idCorredor, CONVERT(DATE, momento)
    ORDER BY CONVERT(DATE, momento)`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensPeriodoMes(idMercado, corredor1, corredor2){
    // const comando = `SELECT MONTH(momento) AS 'mes', nomeCorredor, COUNT(*) AS 'passagens'  FROM registro
    //     INNER JOIN sensor ON idSensor = fkSensor
    //     INNER JOIN corredor ON fkCorredor = idCorredor
    //     INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND (nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}') AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 1 YEAR) AND (CURRENT_DATE)
    //     GROUP BY idCorredor, MONTH(momento)
    //     ORDER BY mes`;
    const comando = `SELECT MONTH(momento) AS 'mes', nomeCorredor, COUNT(*) AS 'passagens'  FROM registro
        INNER JOIN sensor ON idSensor = fkSensor
        INNER JOIN corredor ON fkCorredor = idCorredor
        INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = 1 AND (nomeCorredor = '01' OR nomeCorredor = '02') AND CONVERT(DATE, momento) BETWEEN (CONVERT(DATE, GETDATE()) - INTERVAL 1 YEAR) AND (CONVERT(DATE, GETDATE()))
        GROUP BY idCorredor, MONTH(momento)
        ORDER BY mes`;

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