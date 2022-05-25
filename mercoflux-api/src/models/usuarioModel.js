var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idRepresentante, r.nome, r.email, idMercado, m.nome AS 'mercado' FROM representante r
        INNER JOIN mercado m ON fkMercado = idMercado WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
async function cadastrar(nome, email, cpf, senha, nomeMercado, cnpj, cep, estado, cidade, logradouro, numero, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf, senha, nomeMercado, cnpj, cep, estado, cidade, logradouro, numero, complemento);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var inserirMercado = `INSERT INTO mercado (nome, cnpj, cep, estado, cidade, logradouro, numero, complemento) VALUES ('${nomeMercado}', '${cnpj}', '${cep}', '${estado}', '${cidade}', '${logradouro}', '${numero}', '${complemento}');`;

    await database.executar(inserirMercado);
    
    // Mudar depois o valor inserido do fkMercado
    var inserirRepresentante = `INSERT INTO representante (nome, email, senha, cpf, fkMercado) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', 1);`;
    
    console.log("Inserindo os dados de cadastro no MySQL");
    
    return database.executar(inserirRepresentante);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};

// testar amanhã no pc da escola, após testar testar novamente em casa, caso aconteça algo de diferente verificar quais componentes necessito instalar.