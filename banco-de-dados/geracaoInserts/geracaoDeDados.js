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

function momentRandom(end = moment(), start) {
    const endTime = +moment(end);
    const randomNumber = (to, from = 0) =>
      Math.floor(Math.random() * (to - from) + from);
  
    if (start) {
      const startTime = +moment(start);
      if (startTime > endTime) {
        throw new Error('End date is before start date!');
      }
      return moment(randomNumber(endTime, startTime));
    }
    return moment(randomNumber(endTime));
  }

function gerarRegistros(dados){
    let registros = [];
    for (let numero_registro = 0; numero_registro < dados.quantidade; numero_registro++) {
        let data = moment(momentRandom(dados.dataFim, dados.dataInicio)._d).format('YYYY-MM-DD HH:mm:ss');
        let fkSensor = gerarNumeroAleatorio(dados.sensorInicio, dados.sensorFim + 1);

        registros.push({
            momento: `${moment().format(data, "YYYY-MM-DD HH:mm:ss")}`,
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

function imprimirCriacao() {
    console.log(`
        CREATE DATABASE mercoflux;

        USE mercoflux;

        CREATE TABLE mercado(
            idMercado INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(50) NOT NULL,
            cnpj CHAR(14) NOT NULL,
            cep CHAR(8) NOT NULL,
            estado CHAR(2),
            cidade VARCHAR(50) NOT NULL,
            logradouro VARCHAR(50) NOT NULL,
            numero INT NOT NULL,
            complemento VARCHAR(50)
        );

        CREATE TABLE representante(
            idRepresentante INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            senha VARCHAR(30) NOT NULL,
            administradorPrincipal BOOLEAN,
            cpf CHAR(11) NOT NULL,
            fkMercado INT,
            FOREIGN KEY (fkMercado) REFERENCES mercado(idMercado)
        );

        CREATE TABLE corredor(
            idCorredor INT PRIMARY KEY AUTO_INCREMENT,
            nomeCorredor CHAR(2),
            produto VARCHAR(30),
            fkMercado INT,
            FOREIGN KEY (fkMercado) REFERENCES mercado(idMercado)
        );

        CREATE TABLE sensor(
            idSensor INT PRIMARY KEY AUTO_INCREMENT,
            localizacao CHAR(2), -- E1, E2, I1, I2
            fkCorredor INT,
            FOREIGN KEY (fkCorredor) REFERENCES corredor(idCorredor)
        );

        CREATE TABLE registro(
            idRegistro INT PRIMARY KEY AUTO_INCREMENT,
            momento DATETIME NOT NULL,
            fkSensor INT,
            FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
        );

        CREATE TABLE mudanca(
            idMudanca INT PRIMARY KEY AUTO_INCREMENT,
            dataMudanca DATE,
            localizacao VARCHAR(30),
            descricao VARCHAR(80),
            fkMercado INT,
            FOREIGN KEY (fkMercado) REFERENCES Mercado(idMercado)
        );
    `);
}

function imprimirTudo() {
    imprimirCriacao();
    imprimirMercados();
    imprimirRepresentantes();
    imprimirCorredor();
    imprimirSensores();
}

imprimirTudo();