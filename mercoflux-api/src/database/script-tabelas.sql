-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE Mercoflux;

USE Mercoflux;

CREATE TABLE Mercado(
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

CREATE TABLE Representante(
	idRepresentante INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    cpf CHAR(10) NOT NULL,
    fkMercado INT,
    FOREIGN KEY (fkMercado) REFERENCES Mercado(idMercado)
);

CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    localizacao VARCHAR(4),
    produto VARCHAR(30),
    fkMercado INT,
    FOREIGN KEY (fkMercado) REFERENCES Mercado(idMercado)
);

CREATE TABLE Registro(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    momento DATETIME NOT NULL,
    fkSensor INT,
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

/* para sql server - remoto - produção */
CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);


