window.onload = () => {
    preencherDadosPessoais();
    listarUsuarios();
    // preencherDadosMercado();
    // listarMudancas();
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

function listarUsuarios(){
    fetch(`usuarios/listarUsuarios?idMercado=${sessionStorage.ID_MERCADO}`)
    .then((res) => {
        if(res.ok){
            res.json()
            .then((resposta) => {
                // console.log(resposta);

                for (let contador = 0; contador < resposta.length; contador++) {
                    tableUsuarios.innerHTML += `<tr>
                        <td>${resposta[contador].nome}</td>
                        <td>${resposta[contador].email}</td>`;

                    if (resposta[contador].administradorPrincial == 1) {
                        tableUsuarios.innerHTML += `<td><button><a href=#Dados_P>Alterar usuário</button></td>`;
                    }
                    else {
                        tableUsuarios.innerHTML += `<td><button onclick="removerUsuario(${resposta[contador].idRepresentante})">Remover usuário</button></td>`;
                    }

                    tableUsuarios.innerHTML += `</tr>`;
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