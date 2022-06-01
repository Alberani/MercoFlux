-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
DROP DATABASE mercoflux;
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

INSERT INTO mercado VALUES (NULL, 'Extra', '12345678901234', '04180150', 'SP', 'São Paulo', 'Rua Maria Teresa Gaudino', 255, 'Apto 122');

INSERT INTO representante VALUES (NULL, 'Agda Taniguchi', 'agda.taniguchi@extra.com', '123456', '38999392805', 1);

INSERT INTO corredor VALUES (NULL, '01', 'Sabão em pó', 1);
INSERT INTO corredor VALUES (NULL, '02', 'Miojo', 1);
INSERT INTO corredor VALUES (NULL, '03', 'Bebidas', 1);

INSERT INTO sensor VALUES (NULL, 'E1', 1);
INSERT INTO sensor VALUES (NULL, 'I1', 1);
INSERT INTO sensor VALUES (NULL, 'E2', 1);
INSERT INTO sensor VALUES (NULL, 'I2', 1);
INSERT INTO sensor VALUES (NULL, 'E1', 2);
INSERT INTO sensor VALUES (NULL, 'I1', 2);
INSERT INTO sensor VALUES (NULL, 'E2', 2);
INSERT INTO sensor VALUES (NULL, 'I2', 2);

INSERT INTO registro VALUES (NULL, NOW(), 1);
INSERT INTO registro VALUES (NULL, NOW(), 2);
INSERT INTO registro VALUES (NULL, NOW(), 5);
INSERT INTO registro VALUES (NULL, NOW(), 6);

SELECT registro.* FROM registro
INNER JOIN sensor ON fkSensor = idSensor
INNER JOIN corredor ON fkCorredor = idCorredor
INNER JOIN mercado ON fkMercado = idMercado;

-- Fluxo hoje - Dia todo
SELECT nomeCorredor, COUNT(*) AS 'quantidade' FROM registro
RIGHT JOIN sensor ON fkSensor = idSensor
RIGHT JOIN corredor ON fkCorredor = idCorredor
RIGHT JOIN mercado ON fkMercado = idMercado
WHERE DATE(momento) = CURRENT_DATE() AND idMercado = 1
GROUP BY nomeCorredor;

-- Fluxo de pessoas por corredor
SELECT nomeCorredor, COUNT(*) FROM registro
INNER JOIN sensor ON fkSensor = idSensor
INNER JOIN corredor ON fkCorredor = idCorredor
INNER JOIN mercado ON fkMercado = idMercado
WHERE DATE(momento) BETWEEN '2022-03-10' AND '2022-05-25' AND idMercado = 1
GROUP BY nomeCorredor;

-- Quantidade de corredor (KPI)
SELECT COUNT(*) AS 'quantidade' FROM corredor WHERE fkMercado = 1;

-- Corredor mais popular (KPI)

-- Representante e mercado
SELECT idRepresentante, r.nome, r.email, idMercado, m.nome AS 'mercado' FROM representante r
INNER JOIN mercado m ON fkMercado = idMercado;

/* para sql server - remoto - produção */
CREATE TABLE mercado(
    idMercado INT PRIMARY KEY IDENTITY(1, 1),
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
    idRepresentante INT PRIMARY KEY IDENTITY(1, 1),
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    administradorPrincipal BIT,
    cpf CHAR(11) NOT NULL,
    fkMercado INT,
    FOREIGN KEY (fkMercado) REFERENCES mercado(idMercado)
);

CREATE TABLE corredor(
    idCorredor INT PRIMARY KEY IDENTITY(1, 1),
    nomeCorredor CHAR(2),
    produto VARCHAR(30),
    fkMercado INT,
    FOREIGN KEY (fkMercado) REFERENCES mercado(idMercado)
);

CREATE TABLE sensor(
    idSensor INT PRIMARY KEY IDENTITY(1, 1),
    localizacao CHAR(2), -- E1, E2, I1, I2
    fkCorredor INT,
    FOREIGN KEY (fkCorredor) REFERENCES corredor(idCorredor)
);

CREATE TABLE registro(
    idRegistro INT PRIMARY KEY IDENTITY(1, 1),
    momento DATETIME NOT NULL,
    fkSensor INT,
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE mudanca(
    idMudanca INT PRIMARY KEY IDENTITY(1, 1),
    dataMudanca DATE,
    localizacao VARCHAR(30),
    descricao VARCHAR(80),
    fkMercado INT,
    FOREIGN KEY (fkMercado) REFERENCES Mercado(idMercado)
);

-- Mercados
INSERT INTO mercado (nome, cnpj, cep, estado, cidade, logradouro, numero, complemento) VALUES
        ('Extra Liberdade', '12345678901234', '04196521', 'SP', 'São Paulo', 'Rua A', 12 , '2º andar');   
INSERT INTO mercado (nome, cnpj, cep, estado, cidade, logradouro, numero, complemento) VALUES
        ('Carrefour Anchieta', '12345678904321', '04196531', 'SP', 'São Paulo', 'Rua B', 34 , '1º andar');

-- Representantes
INSERT INTO representante (nome, email, senha, administradorPrincipal, cpf, fkMercado) VALUES
        ('João Alberto', 'joao.alberto85@extra.com', 'fluflu21', 1, '12345678901', 1);
INSERT INTO representante (nome, email, senha, administradorPrincipal, cpf, fkMercado) VALUES
        ('Felipe Cardoso', 'felipe.cardoso@extra.com', 'fefe9932', 0, '12345678911', 1);
INSERT INTO representante (nome, email, senha, administradorPrincipal, cpf, fkMercado) VALUES
        ('Fernanda Figma', 'fernanda.figma@carrefour', 'amojogar92', 1, '12345678988', 2);

-- Corredores
INSERT INTO corredor (nomeCorredor, produto, fkMercado) VALUES ('01', 'Sabão em pó', 1);
INSERT INTO corredor (nomeCorredor, produto, fkMercado) VALUES ('02', 'Carvão', 1);
INSERT INTO corredor (nomeCorredor, produto, fkMercado) VALUES ('03', 'Flor', 1);
INSERT INTO corredor (nomeCorredor, produto, fkMercado) VALUES ('01', 'Arroz', 2);
INSERT INTO corredor (nomeCorredor, produto, fkMercado) VALUES ('02', 'Flor', 2);

-- Sensores
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E1', 1);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E2', 1);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I1', 1);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I2', 1);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E1', 2);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E2', 2);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I1', 2);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I2', 2);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E1', 3);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E2', 3);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I1', 3);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I2', 3);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E1', 4);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E2', 4);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I1', 4);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I2', 4);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E1', 5);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('E2', 5);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I1', 5);
INSERT INTO sensor (localizacao, fkCorredor) VALUES ('I2', 5);