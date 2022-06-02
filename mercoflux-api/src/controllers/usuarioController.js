var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res){
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res){
    usuarioModel.listar()
        .then(function (resultado){
            if (resultado.length > 0){
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro){
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res){
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if(email == undefined){
        res.status(400).send("Seu email está undefined!");
    }
    else if(senha == undefined){
        res.status(400).send("Sua senha está indefinida!");
    }
    else{
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado){
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1){
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0){
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            )
            .catch(
                function (erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
        );
    }

}

function cadastrar(req, res){
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    var nomeMercado = req.body.nomeMercadoServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    // Faça as validações dos valores
    if(nome == undefined){
        res.status(400).send("Seu nome está undefined!");
    }
    else if(email == undefined){
        res.status(400).send("Seu email está undefined!");
    }
    else if(cpf == undefined){
        res.status(400).send("Seu cpf está undefined!");
    }
    else if(senha == undefined){
        res.status(400).send("Seu senha está undefined!");
    }
    else if(nomeMercado == undefined){
        res.status(400).send("Seu nomeMercado está undefined!");
    }
    else if(cnpj == undefined){
        res.status(400).send("Seu cnpj está undefined!");
    }
    else if(cep == undefined){
        res.status(400).send("Seu cep está undefined!");
    }
    else if(estado == undefined){
        res.status(400).send("Seu estado está undefined!");
    }
    else if(cidade == undefined){
        res.status(400).send("Seu cidade está undefined!");
    }
    else if(logradouro == undefined){
        res.status(400).send("Seu logradouro está undefined!");
    }
    else if(numero == undefined){
        res.status(400).send("Seu numero está undefined!");
    }
    else if(complemento == undefined){
        res.status(400).send("Seu complemento está undefined!");
    }
    else{
        usuarioModel.cadastrarMercado(nomeMercado, cnpj, cep, estado, cidade, logradouro, numero, complemento)
        .then(
            function (resultado){
                usuarioModel.cadastrarUsuario(nome, email, senha, cpf, resultado[0].idMercado)
                .then((resultado2) => {
                    res.json(resultado2);
                })
                .catch((erro) => {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                })
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function adicionarUsuario(req, res){
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const fkMercado = req.body.fkMercado;

    if(nome == undefined){
        res.status(400).send("O nome está undefined!");
    }
    else if(email == undefined){
        res.status(400).send("O e-mail está undefined!");
    }
    else if(senha == undefined){
        res.status(400).send("A senha está undefined!");
    }
    else if(cpf == undefined){
        res.status(400).send("O CPF está undefined!");
    }
    else if(fkMercado == undefined){
        res.status(400).send("A fkMercado está undefined!");
    }
    else{
        usuarioModel.adicionarUsuario(nome, email, senha, cpf, fkMercado)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log(`Houve um erro ao adicionar o usuário! Erro: ${erro.sqlMessage}`);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function atualizarUsuario(req, res){
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const idUsuario = req.body.idUsuario;

    if(nome == undefined){
        res.status(400).send("O nome está undefined!");
    }
    else if(email == undefined){
        res.status(400).send("O e-mail está undefined!");
    }
    else if(senha == undefined){
        res.status(400).send("A senha está undefined!");
    }
    else if(cpf == undefined){
        res.status(400).send("O CPF está undefined!");
    }
    else if(idUsuario == undefined){
        res.status(400).send("O ID do usuário está undefined!");
    }
    else{
        usuarioModel.atualizarUsuario(nome, email, senha, cpf, idUsuario)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log(`Houve um erro ao adicionar o usuário! Erro: ${erro.sqlMessage}`);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function pegarDadosPessoais(req, res){
    const idUsuario = req.query.idUsuario;
    usuarioModel.pegarDadosPessoais(idUsuario)
    .then((resultado) => {
        if(resultado.length == 0){
            res.status(403).send("Dados pessoais não encontrados!");
        }
        else{
            res.json(resultado[0]);
        }
    })
    .catch((erro) => {
        console.log(erro);
        console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarDadosMercado(req, res){
    const idMercado = req.query.idMercado;
    usuarioModel.pegarDadosMercado(idMercado)
    .then((resultado) => {
        if(resultado.length == 0){
            res.status(403).send("Dados do mercado não encontrados!");
        }
        else{
            res.json(resultado[0]);
        }
    })
    .catch((erro) => {
        console.log(erro);
        console.log(`Houve um erro ao listar os dados! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarUsuarios(req, res){
    const idMercado = req.query.idMercado;
    usuarioModel.listarUsuarios(idMercado)
    .then((resultado) => {
        if(resultado.length == 0){
            res.status(403).send("ERRO: nenhum usuário encontrado!");
        }
        else{
            res.json(resultado);
        }
    })
}

module.exports = {
    entrar,
    cadastrar,
    adicionarUsuario,
    atualizarUsuario,
    listar,
    testar,
    pegarDadosPessoais,
    pegarDadosMercado,
    listarUsuarios,
}