// Pegando informações do banco de dados
window.onload = () => {
    nomeMercado.innerHTML += sessionStorage.NOME_MERCADO;

    preencherKPIS();

    obterPassagensHoje();
};

function preencherKPIS(){
    obterCorredores();

    obterPassagensUltimaSemana();

    // obterFluxoMetrica();
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

let proximaAtualizacao;
function obterPassagensHoje(){
    if(proximaAtualizacao != undefined){
        clearTimeout(proximaAtualizacao);
    }

    fetch(`registros/obterPassagensHoje?idMercado=${sessionStorage.ID_MERCADO}`).then(function(res){
        if(res.ok){
            res.json().then(function(resposta){
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

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
                backgroundColor: '#4c4c4c',
                data: []
                // backgroundColor: ["#83EF83", "#83EF83", "#6FA8DC", "#FFD966", "#E06666", "#83EF83", "#83EF83", "#6FA8DC", "#83EF83", "#FFD966", "#6FA8DC", "#6FA8DC", "#E06666", "#83EF83", "#83EF83", "#FFD966", "#E06666", "#83EF83", "#E06666", "#FFD966"],
                // data: [59, 87, 18, 32, 111, 99, 95, 15, 93, 37, 15, 2, 141, 89, 69, 30, 130, 96, 134, 38],
            }
        ]
    };

    for(let cont = 0; cont < resposta.length; cont++){
        dados.datasets[0].data.push(resposta[cont].passagens);
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

    const diaAtual = new Chart(contextoDiaAtual, configDiaAtual);

    setTimeout(() => {
        atualizarGrafico(grafico, dados)
    }, 60 * 1000);
}