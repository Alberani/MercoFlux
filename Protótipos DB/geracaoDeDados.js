const mercados = [
    {
        nome: 'Extra Liberdade',
        cnpj: '12345678901234',
        cep: '04196521',
        estado: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Rua A',
        numero: 12,
        complemento: '2º andar'
    },
    {
        nome: 'Carrefour Anchieta',
        cnpj: '12345678904321',
        cep: '04196531',
        estado: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Rua B',
        numero: 34,
        complemento: '1º andar'
    },

];

const representantes = [
    {
        nome: 'João Alberto',
        email: 'joao.alberto85@extra.com',
        senha: 'fluflu21',
        administradorPrincipal: true,
        cpf: '12345678901',
        fkMercado: 1
    },
    {
        nome: 'Felipe Cardoso',
        email: 'felipe.cardoso@extra.com',
        senha: 'fefe9932',
        administradorPrincipal: false,
        cpf: '12345678911',
        fkMercado: 1
    },
    {
        nome: 'Fernanda Figma',
        email: 'fernanda.figma@carrefour',
        senha: 'amojogar92',
        administradorPrincipal: true,
        cpf: '12345678988',
        fkMercado: 2
    }
]

const corredores = [
    {
        nomeCorredor: '01',
        produto: 'Sabão em pó',
        fkMercado: 1
    },
    {
        nomeCorredor: '02',
        produto: 'Carvão',
        fkMercado: 1
    },
    {
        nomeCorredor: '03',
        produto: 'Flor',
        fkMercado: 1
    },
    {
        nomeCorredor: '01',
        produto: 'Arroz',
        fkMercado: 2
    },
    {
        nomeCorredor: '02',
        produto: 'Flor',
        fkMercado: 2
    }
]

const sensores = [
    {
        localizacao: 'E1',
        fkCorredor: 1
    },
    {
        localizacao: 'E2',
        fkCorredor: 1
    },
    {
        localizacao: 'I1',
        fkCorredor: 1
    },
    {
        localizacao: 'I2',
        fkCorredor: 1
    },
    {
        localizacao: 'E1',
        fkCorredor: 2
    },
    {
        localizacao: 'E2',
        fkCorredor: 2
    },
    {
        localizacao: 'I1',
        fkCorredor: 2
    },
    {
        localizacao: 'I2',
        fkCorredor: 2
    },
    {
        localizacao: 'E1',
        fkCorredor: 3
    },
    {
        localizacao: 'E2',
        fkCorredor: 3
    },
    {
        localizacao: 'I1',
        fkCorredor: 3
    },
    {
        localizacao: 'I2',
        fkCorredor: 3
    },
    {
        localizacao: 'E1',
        fkCorredor: 4
    },
    {
        localizacao: 'E2',
        fkCorredor: 4
    },
    {
        localizacao: 'I1',
        fkCorredor: 4
    },
    {
        localizacao: 'I2',
        fkCorredor: 4
    },
    {
        localizacao: 'E1',
        fkCorredor: 5
    },
    {
        localizacao: 'E2',
        fkCorredor: 5
    },
    {
        localizacao: 'I1',
        fkCorredor: 5
    },
    {
        localizacao: 'I2',
        fkCorredor: 5
    },
];

function imprimirMercados(){
    console.log(`\n-- Mercados`);
    for (let contador = 0; contador < mercados.length; contador++) {
        let m = mercados[contador];
        console.log(`INSERT INTO mercado (nome, cnpj, cep, estado, cidade, logradouro, numero, complemento) VALUES 
        ('${m.nome}', '${m.cnpj}', '${m.cep}', '${m.estado}', '${m.cidade}', '${m.logradouro}', ${m.numero} , '${m.complemento}');`);
    }
}

function imprimirRepresentantes(){
    console.log(`\n-- Representantes`);
    for (let contador = 0; contador < representantes.length; contador++) {
        let r = representantes[contador];
        console.log(`INSERT INTO representante (nome, email, senha, administradorPrincipal, cpf, fkMercado) VALUES 
        ('${r.nome}', '${r.email}', '${r.senha}', ${r.administradorPrincipal}, '${r.cpf}', ${r.fkMercado});`);
    }
}

function imprimirCorredor(){
    console.log(`\n-- Corredores`);
    for (let contador = 0; contador < corredores.length; contador++) {
        let c = corredores[contador];
        console.log(`INSERT INTO corredor (nomeCorredor, produto, fkMercado) VALUES ('${c.nomeCorredor}', '${c.produto}', ${c.fkMercado});`);
    }
}

function imprimirSensores(){
    console.log(`\n-- Sensores`);
    for (let contador = 0; contador < sensores.length; contador++) {
        let s = sensores[contador];
        console.log(`INSERT INTO sensor (localizacao, fkCorredor) VALUES ('${s.localizacao}', ${s.fkCorredor});`);
    }
}

function gerarNumeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function gerarRegistros(){
    let registros = [];
    for (let numero_registro = 0; numero_registro < 200; numero_registro++) {
        let dia = gerarNumeroAleatorio(28, 30);
        let mes = gerarNumeroAleatorio(1, 13);
        let ano = gerarNumeroAleatorio(2020, 2023);
        let hora = gerarNumeroAleatorio(6, 21);
        let minuto = gerarNumeroAleatorio(0, 60);
        let segundo = gerarNumeroAleatorio(0, 60);
        let fkSensor = gerarNumeroAleatorio(1, sensores.length + 1);

        registros.push({
            momento: `${2022}-${05}-${dia} ${hora}:${minuto}:${segundo}`,
            fkSensor: fkSensor
        });
    }

    return registros;
}

function imprimirRegistros(){
    let registros = gerarRegistros();
    console.log(`\n-- Registros`);
    for (let contador = 0; contador < registros.length; contador++) {
        let r = registros[contador];
        console.log(`INSERT INTO registro (momento, fkSensor) VALUES ('${r.momento}', ${r.fkSensor});`);
    }
}

function imprimirTudo(){
    imprimirMercados();
    imprimirRepresentantes();
    imprimirCorredor();
    imprimirSensores();
    imprimirRegistros();
}

// imprimirTudo();
imprimirRegistros();