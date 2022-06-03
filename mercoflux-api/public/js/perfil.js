window.onload = () => {
    preencherDadosPessoais();
    listarUsuarios();
    preencherDadosMercado();
    listarMudancas();

    dataMudanca.value = moment().format("YYYY-MM-DD");
}

function preencherDadosPessoais(){
    fetch(`usuarios/pegarDadosPessoais?idUsuario=${sessionStorage.ID_USUARIO}`)
    .then((res) => {
        if(res.ok){
            res.json()
            .then((resposta) => {
                // console.log(resposta);

                nomeUsuarioAdministrador.value = resposta.nome;
                emailUsuarioAdministrador.value = resposta.email;
                senhaUsuarioAdministrador.value = resposta.senha;
                cpfUsuarioAdministrador.value = resposta.cpf;
            });
        }
        else{
            console.error("Nenhum dado encontrado ou erro na API");
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Dados usuário: ${erro.message}`);
    });
}

function listarUsuarios(){
    fetch(`usuarios/listarUsuarios?idMercado=${sessionStorage.ID_MERCADO}`)
    .then((res) => {
        if(res.ok){
            res.json()
            .then((resposta) => {
                // console.log(resposta);

                for (let contador = 0; contador < resposta.length; contador++) {
                    let tr = "";
                    tr += `<tr><td>${resposta[contador].nome}</td><td>${resposta[contador].email}</td>`;

                    if (resposta[contador].administradorPrincipal == 1) {
                        tr += `<td><button><a href=#Dados_P style="color: white;">Alterar usuário</button></td>`;
                    }
                    else {
                        tr += `<td><button onclick="removerUsuario(${resposta[contador].idRepresentante})">Remover usuário</button></td>`;
                    }

                    tr += `</tr>`;
                    tableUsuarios.innerHTML += tr;
                }
                
            })
        }
        else{
            console.error("Nenhum dado encontrado ou erro na API");
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Dados usuário: ${erro.message}`);
    });
}

function preencherDadosMercado(){
    fetch(`usuarios/pegarDadosMercado?idMercado=${sessionStorage.ID_MERCADO}`)
    .then((res) => {
        if(res.ok){
            res.json()
            .then((resposta) => {
                // console.log(resposta);

                nomeMercado.value = resposta.nome;
                cnpjMercado.value = resposta.cnpj;
                cepMercado.value = resposta.cep;
                estadoMercado.value = resposta.estado;
                cidadeMercado.value = resposta.cidade;
                logradouroMercado.value = resposta.logradouro;
                numeroMercado.value = resposta.numero;
                complementoMercado.value = resposta.complemento;
            })
        }
        else{
            console.error("Nenhum dado encontrado ou erro na API");
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Dados usuário: ${erro.message}`);
    });
}

function listarMudancas(){
    fetch(`registros/obterMudancas?idMercado=${sessionStorage.ID_MERCADO}&limite=10`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                if(resposta.length == 0){
                    tabelaMudancas.innerHTML += `<tr><td colspan="100%">Nenhuma mudança foi registrada</td></tr>`;
                }

                for (let contador = 0; contador < resposta.length; contador++) {
                    mudanca = resposta[contador];
                    tabelaMudancas.innerHTML += `<tr><td>${moment(mudanca.dataMudanca).add(1, 'day').format('DD/MM/YYYY')}</td><td>${mudanca.localizacao}</td><td>${mudanca.descricao}</td></tr>`;
                }
            });
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Obter mudanças: ${erro.message}`);
    });
}

// Funções ativadas por botões
function adicionarUsuario(){
    let nome = nomeUsuarioNovo.value;
    let email = emailUsuarioNovo.value;
    let senha = senhaUsuarioNovo.value;
    let cpf = cpfUsuarioNovo.value;

    if(nome == "" || email == "" || senha == "" || cpf == ""){
        alertar(alertaNovoUsuario, "Todos os campos devem estar preenchidos!");
    }
    else if(nome.length < 5){
        alertar(alertaNovoUsuario, "O campo nome está muito pequeno! (Mínimo 5 caracteres)");
    }
    else if(nome.length > 50){
        alertar(alertaNovoUsuario, "O campo nome está muito grande! (Máximo 50 caracteres)");
    }
    else if(email.length < 3){
        alertar(alertaNovoUsuario, "O campo e-mail está muito pequeno! (Mínimo 3 caracteres)");
    }
    else if(email.length > 50){
        alertar(alertaNovoUsuario, "O campo e-mail está muito grande! (Máximo 50 caracteres)");
    }
    else if(senha.length < 4){
        alertar(alertaNovoUsuario, "O campo senha está muito pequeno! (Mínimo 4 caracteres)");
    }
    else if(senha.length > 30){
        alertar(alertaNovoUsuario, "O campo senha está muito grande! (Máximo 30 caracteres)");
    }
    else if(cpf.length != 11){
        alertar(alertaNovoUsuario, "O campo CPF deve conter 11 números!");
    }
    else if(email.indexOf("@") == -1){
        alertar(alertaNovoUsuario, "Ops, e-mail inválido! Verifique e tente novamente.");
    }
    else{
        fetch("/usuarios/adicionarUsuario", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf,
                fkMercado: sessionStorage.ID_MERCADO,
            })
        })
        .then(function (resposta){
            if(resposta.ok){
                alertar(alertaNovoUsuario, "Cadastro realizado com sucesso! Recarregue a página, caso queira ver as alterações!");
            }
            else{
                console.log("Houve um erro ao tentar realizar o cadastro de um novo usuário!");
    
                alertar(alertaNovoUsuario, "Houve um erro ao tentar realizar o cadastro de um novo usuário!");
            }
        })
        .catch(function (erro){
            console.log(erro);
        });
    }
}

function atualizarUsuario(){
    let nome = nomeUsuarioAdministrador.value;
    let email = emailUsuarioAdministrador.value;
    let senha = senhaUsuarioAdministrador.value;
    let cpf = cpfUsuarioAdministrador.value;

    if(nome == "" || email == "" || senha == "" || cpf == ""){
        alertar(alertaUsuarioAdm, "Todos os campos devem estar preenchidos!");
    }
    else if(nome.length < 5){
        alertar(alertaUsuarioAdm, "O campo nome está muito pequeno! (Mínimo 5 caracteres)");
    }
    else if(nome.length > 50){
        alertar(alertaUsuarioAdm, "O campo nome está muito grande! (Máximo 50 caracteres)");
    }
    else if(email.length < 3){
        alertar(alertaUsuarioAdm, "O campo e-mail está muito pequeno! (Mínimo 3 caracteres)");
    }
    else if(email.length > 50){
        alertar(alertaUsuarioAdm, "O campo e-mail está muito grande! (Máximo 50 caracteres)");
    }
    else if(senha.length < 4){
        alertar(alertaUsuarioAdm, "O campo senha está muito pequeno! (Mínimo 4 caracteres)");
    }
    else if(senha.length > 30){
        alertar(alertaUsuarioAdm, "O campo senha está muito grande! (Máximo 30 caracteres)");
    }
    else if(cpf.length != 11){
        alertar(alertaUsuarioAdm, "O campo CPF deve conter 11 números!");
    }
    else if(email.indexOf("@") == -1){
        alertar(alertaUsuarioAdm, "Ops, e-mail inválido! Verifique e tente novamente.");
    }
    else{
        fetch("/usuarios/atualizarUsuario", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf,
                idUsuario: sessionStorage.ID_USUARIO,
            })
        })
        .then(function (resposta){
            if(resposta.ok){
                alertar(alertaUsuarioAdm, "Usuário atualizado com sucesso! Recarregue a página, caso queira ver as alterações!");
            }
            else{
                console.log("Houve um erro ao tentar realizar a atualização do usuário!");
    
                alertar(alertaUsuarioAdm, "Houve um erro ao tentar realizar a atualização do usuário!");
            }
        })
        .catch(function (erro){
            console.log(erro);
        });
    }
}

function removerUsuario(idUsuario){
    fetch(`usuarios/removerUsuario?idUsuario=${idUsuario}`).then(function(res){
        if(res.ok){
            alertar(alertaListaUsuarios, "Usuário removido com sucesso! Recarregue a página, caso queira ver as alterações!");
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Remover usuário: ${erro.message}`);
    });
}

function adicionarMudanca(){
    let data = dataMudanca.value;
    let localizacao = localizacaoMudanca.value;
    let descricao = descricaoMudanca.value;
    let fkMercado = sessionStorage.ID_MERCADO;

    if(data == "" || localizacao == "" || descricao == ""){
        alertar(alertaMudanca, "Todos os campos devem estar preenchidos!");
    }
    else if(descricao.length > 80){
        alertar(alertaMudanca, `A descrição está muito grande! (${descricao.length}/80)`);
    }
    else if(localizacao.length > 30){
        alertar(alertaMudanca, `A localização está muito grande! (${localizacao.length}/30)`);
    }
    else{
        fetch("/usuarios/adicionarMudanca", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                data: data,
                localizacao: localizacao,
                descricao: descricao,
                fkMercado: fkMercado
            })
        })
        .then(function (resposta){
            console.log("resposta:");
            console.log(resposta);
            if(resposta.ok){
                alertar(alertaMudanca, "Mudança adicionada com sucesso! Recarregue a página, caso queira ver as alterações!");
            }
            else{
                console.log("Houve um erro ao tentar adicionar uma mudança!");
    
                alertar(alertaMudanca, "Houve um erro ao tentar adicionar uma mudança!");
            }
        })
        .catch(function (erro){
            console.log(erro);
        });
    }
}

var tempoAlerta;
function alertar(idAlerta, mensagem){
    clearTimeout(tempoAlerta);

    idAlerta.style.display = "block";
    idAlerta.innerHTML = mensagem;

    tempoAlerta = setTimeout(() => {
        idAlerta.style.display = "none";
    }, 7000);
}