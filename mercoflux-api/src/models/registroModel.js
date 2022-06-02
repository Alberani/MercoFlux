const database = require("../database/config");

function obterCorredores(idMercado){
    const comando = `SELECT nomeCorredor FROM corredor WHERE fkMercado = ${idMercado}`;

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensUltimaSemana(idMercado){
    let comando;
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        comando = `SELECT nomeCorredor, COUNT(*) AS 'qtdPassagens' FROM registro
        INNER JOIN sensor ON idSensor = fkSensor
        INNER JOIN corredor ON fkCorredor = idCorredor
        INNER JOIN mercado ON fkMercado = idMercado
        WHERE fkMercado = ${idMercado} AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 7 DAY) AND CURRENT_DATE
        GROUP BY idCorredor`;
    }
    else{
        comando = `SELECT nomeCorredor, COUNT(*) AS 'qtdPassagens' FROM registro
        INNER JOIN sensor ON idSensor = fkSensor
        INNER JOIN corredor ON fkCorredor = idCorredor
        INNER JOIN mercado ON fkMercado = idMercado
        WHERE fkMercado = ${idMercado} AND momento <= GETDATE() AND momento >= DATEADD(DAY, -7, GETDATE())
        GROUP BY nomeCorredor`;
    }

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterMediaSemanas(idMercado){
    let comando;
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        comando = `SELECT TRUNCATE(AVG(qtdPassagens), 2) AS 'media' FROM (
            SELECT COUNT(*) AS 'qtdPassagens' FROM registro
            INNER JOIN sensor ON idSensor = fkSensor
            INNER JOIN corredor ON fkCorredor = idCorredor
            INNER JOIN mercado ON fkMercado = idMercado
            WHERE fkMercado = ${idMercado} AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 1 YEAR) AND CURRENT_DATE
            GROUP BY idCorredor, WEEK(momento)
        ) AS resultado`;
    }
    else{
        comando = `SELECT ROUND(AVG(qtdPassagens), 2) AS 'media' FROM (
            SELECT COUNT(*) AS 'qtdPassagens' FROM registro
            INNER JOIN sensor ON idSensor = fkSensor
            INNER JOIN corredor ON fkCorredor = idCorredor
            INNER JOIN mercado ON fkMercado = idMercado
            WHERE fkMercado = ${idMercado} AND momento <= GETDATE() AND momento >= DATEADD(YEAR, -1, GETDATE())
            GROUP BY idCorredor, MONTH(momento)
        ) AS resultado`;
    }

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensHoje(idMercado){
    let comando;
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        comando = `SELECT nomeCorredor, COUNT(idRegistro) AS 'passagens' FROM corredor
            JOIN sensor ON idCorredor = fkCorredor
            LEFT JOIN registro ON idSensor = fkSensor AND DATE(momento) = CURRENT_DATE
            JOIN mercado ON idMercado = fkMercado AND idMercado = ${idMercado}
            GROUP BY idCorredor`;
    }
    else{
        comando = `SELECT nomeCorredor, COUNT(idRegistro) AS 'passagens' FROM corredor
        JOIN sensor ON idCorredor = fkCorredor
        LEFT JOIN registro ON idSensor = fkSensor AND CONVERT(DATE, momento) = CONVERT(DATE, GETDATE())
        JOIN mercado ON idMercado = fkMercado AND idMercado = ${idMercado}
        GROUP BY nomeCorredor`;
    }

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterMudancas(idMercado, limite){
    let comando;
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        comando = `SELECT dataMudanca, localizacao, descricao FROM mudanca INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} ORDER BY dataMudanca DESC, idMudanca DESC LIMIT ${limite}`;
    }
    else{
        comando = `SELECT TOP ${limite} dataMudanca, localizacao, descricao
        FROM mudanca INNER JOIN mercado ON fkMercado = idMercado
        WHERE fkMercado = ${idMercado}
        ORDER BY dataMudanca DESC, idMudanca DESC`;
    }

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensPeriodo(idMercado, corredor1, corredor2, dataInicio, dataFim){
    let comando;
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        comando = `SELECT nomeCorredor, DATE(momento) AS 'data', COUNT(idRegistro) AS 'passagens' FROM corredor
        JOIN sensor ON idCorredor = fkCorredor
        JOIN registro ON idSensor = fkSensor AND DATE(momento) BETWEEN '${dataInicio}' AND '${dataFim}'
        JOIN mercado ON idMercado = fkMercado AND idMercado = ${idMercado}
        WHERE nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}'
        GROUP BY idCorredor, DATE(momento)
        ORDER BY DATE(momento)`;
    }
    else{
        comando = `SELECT nomeCorredor, CONVERT(DATE, momento) AS 'data', COUNT(idRegistro) AS 'passagens' FROM corredor
        JOIN sensor ON idCorredor = fkCorredor
        JOIN registro ON idSensor = fkSensor AND momento <= '${dataFim}' AND momento >= '${dataInicio}'
        JOIN mercado ON idMercado = fkMercado AND idMercado = ${idMercado}
        WHERE nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}'
        GROUP BY nomeCorredor, CONVERT(DATE, momento)
        ORDER BY CONVERT(DATE, momento)`;
    }

    console.log(`Executando a instrução SQL: \n${comando}\n`);
    return database.executar(comando);
}

function obterPassagensPeriodoMes(idMercado, corredor1, corredor2){
    let comando;
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        comando = `SELECT MONTH(momento) AS 'mes', nomeCorredor, COUNT(*) AS 'passagens'  FROM registro
            INNER JOIN sensor ON idSensor = fkSensor
            INNER JOIN corredor ON fkCorredor = idCorredor
            INNER JOIN mercado ON fkMercado = idMercado WHERE fkMercado = ${idMercado} AND (nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}') AND DATE(momento) BETWEEN (CURRENT_DATE - INTERVAL 1 YEAR) AND (CURRENT_DATE)
            GROUP BY idCorredor, MONTH(momento)
            ORDER BY mes`;
    }
    else{
        comando = `SELECT MONTH(momento) AS 'mes', nomeCorredor, COUNT(*) AS 'passagens'  FROM registro
        INNER JOIN sensor ON idSensor = fkSensor AND momento <= GETDATE() AND momento >= DATEADD(YEAR, -1, GETDATE())
        INNER JOIN corredor ON fkCorredor = idCorredor
        INNER JOIN mercado ON fkMercado = idMercado AND idMercado = ${idMercado}
        WHERE nomeCorredor = '${corredor1}' OR nomeCorredor = '${corredor2}'
        GROUP BY nomeCorredor, MONTH(momento)
        ORDER BY mes;`;
    }

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