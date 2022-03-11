CREATE DATABASE projeto_sensores;

USE projeto_sensores;

CREATE TABLE sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    localizacao CHAR(3),							-- 01A / 01B
    idMercado INT, 									-- Chave estrangeira depois
    idCorredor INT
);

CREATE TABLE corredor(
	idCorredor INT PRIMARY KEY AUTO_INCREMENT,
    idMercado int,									-- Chave estrangeira
    tipoProduto VARCHAR(30)
);

CREATE TABLE registro(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    acao CHAR(1),									-- E/S
    diaEntrada DATE,								-- 2022-03-11
    horarioEntrada VARCHAR(8),						-- 02:10:23
    idSensor INT									-- Chave estrangeira
);

CREATE TABLE mercado(
	idMercado INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    cnpj CHAR(15),
    email VARCHAR(50),
    senha VARCHAR(255),
    endereco VARCHAR(255)
);

INSERT INTO mercado VALUES (null, 'Dois irmãos', 'doisirmaos@gmail.com', 'sorvetinho', 'Rua A, 30');

INSERT INTO sensor VALUES (null, '01A', 1),
						  (null, '01B', 1),
                          (null, '02A', 1),
                          (null, '02B', 1),
                          (null, '03A', 1),
                          (null, '03B', 1),
                          (null, '04A', 1),
                          (null, '04B', 1),
                          (null, '05A', 1),
                          (null, '05B', 1);
                          
INSERT INTO registro VALUES (null, '2022-03-11', '12:30:35', 1),
							(null, '2022-03-11', '12:35:40', 1),
                            (null, '2022-03-11', '12:38:01', 3),
                            (null, '2022-03-11', '12:38:35', 4),
                            (null, '2022-03-11', '12:41:40', 5),
                            (null, '2022-03-11', '12:42:43', 5);