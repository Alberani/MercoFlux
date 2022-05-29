// Tempo de atualização - 1 minuto
const tempoAtualizacao = 1 *60 * 1000;

// Pegando informações do banco de dados
window.onload = () => {
    nomeMercado.innerHTML += sessionStorage.NOME_MERCADO;

    preencherKPIS();

    obterPassagensHoje();

    obterMudancas();

    obterPassagensPeriodo();
};

function preencherKPIS(){
    obterCorredores();

    obterPassagensUltimaSemana();

    obterMediaSemanas();
}

var corredores = [];

function obterCorredores(){
    fetch(`registros/obterCorredores?idMercado=${sessionStorage.ID_MERCADO}`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                for(let corredor = 0; corredor < resposta.length; corredor++) {
                    corredores.push(resposta[corredor].nomeCorredor);
                }

                kpiTotalCorredores.innerHTML = resposta.length;
            });
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Quantidade corredores (KPI): ${erro.message}`);
    });
}

var totalPassagensSemana = 0;
function obterPassagensUltimaSemana(){
    fetch(`registros/obterPassagensUltimaSemana?idMercado=${sessionStorage.ID_MERCADO}`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                let maxPassagens = 0;
                let minPassagens = 0;
                let corredorMaisPopular;
                let corredorMenosPopular;

                for (let index = 0; index < resposta.length; index++) {
                    if(index == 0){
                        maxPassagens = resposta[index].qtdPassagens;
                        corredorMaisPopular = resposta[index].nomeCorredor;
                        
                        minPassagens = resposta[index].qtdPassagens;
                        corredorMenosPopular = resposta[index].nomeCorredor;
                    }

                    if(maxPassagens < resposta[index].qtdPassagens){
                        maxPassagens = resposta[index].qtdPassagens;
                        corredorMaisPopular = resposta[index].nomeCorredor;
                    }

                    if(minPassagens > resposta[index].qtdPassagens){
                        minPassagens = resposta[index].qtdPassagens;
                        corredorMenosPopular = resposta[index].nomeCorredor;
                    }

                    totalPassagensSemana += Number(resposta[index].qtdPassagens);
                }

                kpiMaisPopular.innerHTML = corredorMaisPopular;
                kpiMenosPopular.innerHTML = corredorMenosPopular;
            });
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Popularidade (KPI): ${erro.message}`);
    });
}

function obterMediaSemanas(){
    fetch(`registros/obterMediaSemanas?idMercado=${sessionStorage.ID_MERCADO}`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                let media = resposta[0].media;

                if(totalPassagensSemana >= media){
                    kpiFluxo.innerHTML = "Bom";
                }
                else{
                    kpiFluxo.innerHTML = "Baixo";
                }
            })
        }
    })
}

var proximaAtualizacao;
var totalPassagensHoje = 0;
function obterPassagensHoje(){
    if(proximaAtualizacao != undefined){
        clearTimeout(proximaAtualizacao);
    }

    fetch(`registros/obterPassagensHoje?idMercado=${sessionStorage.ID_MERCADO}`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for(let corredor = 0; corredor < resposta.length; corredor++){
                    totalPassagensHoje += Number(resposta[corredor].passagens);
                }

                plotarGraficoHoje(resposta);
            });
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);
        }
    })
    .catch((erro) => {
        console.log(`Erro na obtenção dos dados - Quantidade corredores: ${erro.message}`);
    });
}

function plotarGraficoHoje(resposta){
    let dados = {
        labels: corredores,
        datasets: [
            {
                yAxisID: 'y-passagens',
                label: 'Passagens',
                backgroundColor: [],
                data: []
            }
        ]
    };

    let media = totalPassagensHoje / corredores.length;
    dados.datasets[0].backgroundColor = [];

    for(let cont = 0; cont < resposta.length; cont++){
        let quantidade = resposta[cont].passagens;
        dados.datasets[0].data.push(quantidade);

        if(quantidade < (1 / 4 * totalPassagensHoje)){
            dados.datasets[0].backgroundColor.push("#6FA8DC");
        }
        else if(quantidade < media){
            dados.datasets[0].backgroundColor.push("#FFD966");
        }
        else if(quantidade < (3 / 4 * totalPassagensHoje)){
            dados.datasets[0].backgroundColor.push("#83EF83");
        }
        else{
            dados.datasets[0].backgroundColor.push("#E06666");
        }
    }

    const configDiaAtual = {
        type: "bar",
        data: dados,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };
    
    const contextoDiaAtual = document.getElementById("graficoDiaAtual").getContext("2d");

    contextoDiaAtual.canvas.height = 40;

    window.grafico_diaAtual = new Chart(contextoDiaAtual, configDiaAtual);

    setTimeout(() => {
        atualizarGrafico(contextoDiaAtual, dados)
    }, tempoAtualizacao);
}

function atualizarGrafico(grafico, dados){
    fetch(`/registros/obterPassagensHoje?idMercado=${sessionStorage.ID_MERCADO}`, {cache: 'no-store'}).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                console.log("Atualizando gráfico hoje!");
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // console.log(`Dados atuais do gráfico: ${dados}`);
                
                totalPassagensHoje = 0;
                for(let corredor = 0; corredor < resposta.length; corredor++){
                    totalPassagensHoje += Number(resposta[corredor].passagens);
                }

                let media = totalPassagensHoje / corredores.length;
                dados.datasets[0].data = [];
                dados.datasets[0].backgroundColor = [];
                
                for (let contador = 0; contador < resposta.length; contador++) {
                    let quantidade = resposta[contador].passagens;
                    dados.datasets[0].data.push(quantidade);

                    if(quantidade < (1 / 4 * totalPassagensHoje)){
                        dados.datasets[0].backgroundColor.push("#6FA8DC");
                    }
                    else if(quantidade < media){
                        dados.datasets[0].backgroundColor.push("#FFD966");
                    }
                    else if(quantidade < (3 / 4 * totalPassagensHoje)){
                        dados.datasets[0].backgroundColor.push("#83EF83");
                    }
                    else{
                        dados.datasets[0].backgroundColor.push("#E06666");
                    }
                }

                obterPassagensUltimaSemana();

                window.grafico_diaAtual.update();

                proximaAtualizacao = setTimeout(() => {
                    atualizarGrafico(grafico, dados)
                }, tempoAtualizacao);
            });
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);

            proximaAtualizacao = setTimeout(() => {
                atualizarGrafico(grafico, dados)
            }, tempoAtualizacao);
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados para o gráfico de hoje: ${erro.message}`);
    });
}

function obterMudancas(){
    fetch(`registros/obterMudancas?idMercado=${sessionStorage.ID_MERCADO}&limite=4`).then(function(res){
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

function obterPassagensPeriodo(){
    let data_inicio = inicio.value;
    const data_fim = fim.value;

    if(data_inicio == ""){
        abrirModal("A data do início do período é inválida!");
        return false;
    }

    if(data_fim == ""){
        abrirModal("A data do final do período é inválida!");
        return false;
    }

    if(moment(data_fim).diff(moment(data_inicio), 'days') + 1 >= 61){
        abrirModal(`O período deve ser menor ou igual a 60 dias.<br>Mínimo: ${moment(data_fim).subtract(59, 'days').format('DD/MM/YYYY')}`);
        inicio.focus();
        return false;
    }

    const corredor1 = corredor1Fluxo.value;
    const corredor2 = corredor2Fluxo.value;

    fetch(`registros/obterPassagensPeriodo?idMercado=${sessionStorage.ID_MERCADO}&corredor1=${corredor1}&corredor2=${corredor2}&inicio=${data_inicio}&fim=${data_fim}`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                plotarGraficoPeriodoDia(resposta, corredor1, corredor2);
            });
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Obter passagens período: ${erro.message}`);
    });
}

function plotarGraficoPeriodoDia(resposta, corredor1, corredor2){
    if(window.grafico_periodo != null){
        window.grafico_periodo.destroy();
    }

    let periodo = [];
    
    let dados = {
        labels: periodo,
        datasets: [
            {
                label: `Passagens no corredor ${corredor1}`,
                yAxisID: 'y-passagens',
                backgroundColor: "#ED182D",
                borderColor: "#ED182D",
                data: []
            },
            {
                label: `Passagens no corredor ${corredor2}`,
                yAxisID: 'y-passagens',
                backgroundColor: "#134B90",
                borderColor: "#134B90",
                data: []
            }
        ]
    };

    for(let cont = 0; cont < resposta.length; cont++){
        let data = moment(resposta[cont].data).format('DD/MM/YYYY');
        if(periodo.indexOf(data) == -1){
            periodo.push(data);
        }

        if(resposta[cont].nomeCorredor == corredor1){
            dados.datasets[0].data.push(resposta[cont].passagens);
        }
        else{
            dados.datasets[1].data.push(resposta[cont].passagens);
        }
    }

    if(corredor1 == corredor2){
        abrirModal("AVISO: Os dois corredores do gráfico de fluxo de pessoas por corredor são iguais!");
    }
    else if(dados.datasets[0].data.length == 0){
        abrirModal(`Nenhum registro encontrado no corredor ${corredor1}! Verifique se o nome do corredor e o perído estão corretos.`);
        return false;
    }
    else if(dados.datasets[1].data.length == 0){
        abrirModal(`Nenhum registro encontrado no corredor ${corredor2}! Verifique se o nome do corredor e o perído estão corretos.`);
        return false;
    }

    const configDiaAtual = {
        type: "line",
        data: dados,
        options: {}
    };
    
    const contextoPeriodo = document.getElementById("graficoPeriodoDia").getContext("2d");

    window.grafico_periodo = new Chart(contextoPeriodo, configDiaAtual);
}

function obterPassagensPeriodoMes(){
    const corredor1 = corredor1FluxoMes.value;
    const corredor2 = corredor2FluxoMes.value;

    fetch(`registros/obterPassagensPeriodoMes?idMercado=${sessionStorage.ID_MERCADO}&corredor1=${corredor1}&corredor2=${corredor2}`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                plotarGraficoPeriodoMes(resposta, corredor1, corredor2);
            });
        }
        else{
            console.error(`Nenhum dado encontrado ou erro na API`);
        }
    })
    .catch((erro) => {
        console.error(`Erro na obtenção dos dados - Obter passagens período mês: ${erro.message}`);
    });
}

function plotarGraficoPeriodoMes(resposta, corredor1, corredor2){
    if(window.grafico_periodoMes != null){
        window.grafico_periodoMes.destroy();
    }

    let meses = [];
    
    let dados = {
        labels: meses,
        datasets: [
            {
                label: `Passagens no corredor ${corredor1}`,
                yAxisID: 'y-passagens',
                backgroundColor: "#ED182D",
                borderColor: "#ED182D",
                data: []
            },
            {
                label: `Passagens no corredor ${corredor2}`,
                yAxisID: 'y-passagens',
                backgroundColor: "#134B90",
                borderColor: "#134B90",
                data: []
            }
        ]
    };

    for(let cont = 0; cont < resposta.length; cont++){
        if(meses.indexOf(resposta[cont].mes) == -1){
            meses.push(resposta[cont].mes);
        }

        if(resposta[cont].nomeCorredor == corredor1){
            dados.datasets[0].data.push(resposta[cont].passagens);
        }
        else{
            dados.datasets[1].data.push(resposta[cont].passagens);
        }
    }

    if(corredor1 == corredor2){
        abrirModal("AVISO: Os dois corredores do gráfico de fluxo de pessoas por corredor são iguais!");
    }
    else if(dados.datasets[0].data.length == 0){
        abrirModal(`Nenhum registro encontrado no corredor ${corredor1}! Verifique se o nome do corredor está correto.`);
        return false;
    }
    else if(dados.datasets[1].data.length == 0){
        abrirModal(`Nenhum registro encontrado no corredor ${corredor2}! Verifique se o nome do corredor está correto.`);
        return false;
    }

    const configPeriodoMes = {
        type: "line",
        data: dados,
        options: {}
    };
    
    const contextoPeriodoMes = document.getElementById("graficoPeriodoMes").getContext("2d");

    window.grafico_periodoMes = new Chart(contextoPeriodoMes, configPeriodoMes);
}

function abrirModal(mensagem){
    avisoMensagem.innerHTML = mensagem;
    alertaDash.style.display = "block";
}

function fecharModal(){
    alertaDash.style.display = "none";
}

function mudarFluxoPeriodo(){
    let opcao = mostrarPor.value;

    if(opcao == "dia"){
        graficoPeriodoDia.style.display = "block";
        graficoPeriodoMes.style.display = "none";
        parametrosDia.style.display = "flex";
        parametrosMes.style.display = "none";
    }
    else{    
        obterPassagensPeriodoMes();

        graficoPeriodoDia.style.display = "none";
        graficoPeriodoMes.style.display = "block";
        parametrosDia.style.display = "none";
        parametrosMes.style.display = "flex";
    }
}