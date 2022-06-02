window.onload = () => {
    preencherDadosPessoais();
    listarUsuarios();
    preencherDadosMercado();
    listarMudancas();
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
                    tabelaMudancas.innerHTML += `<tr><td>${moment(mudanca.dataMudanca).format('DD/MM/YYYY')}</td><td>${mudanca.localizacao}</td><td>${mudanca.descricao}</td></tr>`;
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
                resposta.json().then(json => {
                    console.log(json);
                    alertar(alertaNovoUsuario, "Cadastro realizado com sucesso!");
                    window.location = "perfil.html#LISTARUSER";
                });
            }
            else{
                console.log("Houve um erro ao tentar realizar o cadastro de um novo usuário!");
    
                resposta.text().then((texto) => {
                    console.error(texto);
                    alertar(alertaNovoUsuario, texto);
                });
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
    }, 5000);
}