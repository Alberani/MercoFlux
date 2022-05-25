const database = require("../database/config");

function listar(){
    const comando = `SELECT registro.* FROM registro INNER JOIN sensor ON fkSensor = idSensor INNER JOIN corredor ON fkCorredor = idCorredor INNER JOIN mercado ON fkMercado = idMercado`;

    console.log(`Executando a instrução SQL: ${comando}`);
    return database.executar(comando);
}

function quantidadeCorredores(){
    const comando = `SELECT COUNT(*) AS 'quantidade' FROM corredor WHERE fkMercado = 1`;

    console.log(`Executando a instrução SQL: ${comando}`);
    return database.executar(comando);
}

module.exports = {
    listar,
    quantidadeCorredores
}