CREATE DATABASE MercoFlux;
USE Mercoflux;

CREATE TABLE Mercado(
	idMercado INT PRIMARY KEY AUTO_INCREMENT,
    nomeMercado VARCHAR(50),
	login VARCHAR(50),
    senha VARCHAR(50),
    fkEndereco INT
);
CREATE TABLE representante(
	idRep INT PRIMARY KEY AUTO_INCREMENT,
    nomeRep VARCHAR(50),
    cpf CHAR(10),
    fkMercadoRep INT
);
CREATE TABLE Endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(40),
    bairro VARCHAR(40),
    numero INT,
    referencia VARCHAR(50),
    complemento VARCHAR(15),
    CEP CHAR(9)
);
CREATE TABLE Registro(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    ativacao DATETIME,
    acao CHAR(1),
    fkSensor INT,
    fkMercadoR INT
);
CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    localizacao CHAR(4),
    produto VARCHAR(30),
    fkMercadoS INT
);

ALTER TABLE Mercado ADD FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco);
ALTER TABLE Registro ADD FOREIGN KEY(fkSensor) REFERENCES Sensor(idSensor);
ALTER TABLE Registro ADD FOREIGN KEY(fkMercadoR) REFERENCES Mercado(idMercado);
ALTER TABLE Sensor ADD FOREIGN KEY(fkMercadoS) REFERENCES Mercado(idMercado);
ALTER TABLE Representante ADD FOREIGN KEY(fkMercadoRep) REFERENCES Mercado(idMercado);