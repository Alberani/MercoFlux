-- inserção de E S ao mesmo tempo para corredores intermediarios
-- não precisa de FK se for uma tabela para cada mercado
-- discutir a necessidade de uma tabela de produtos por corredor para melhor organização na analise de dados

create database supermercado;
use supermercado;

create table mercado(
	id int primary key auto_increment,
    nomeMercado varchar(50),
    qtdSensor int,
    email varchar(50),
    senha varchar(20),
    endereco varchar(255)
);
create table registro(
	id int primary key auto_increment,
    sensor varchar(4),
    dataHora datetime,
    acao char(1), -- s ou e
    mercado int ,
    foreign key (mercado) references mercado(id)
);
insert into mercado values
	(null,'Mercadinho Dois Irmãos', 25,'doisirmaos@gmail.com','F3wSf25@','Rua das Flores, 2'),
    (null,'Preço & Cia Vila Matilde', 30,'precoecia@hotmail.com','A9S@Oo)','Alameda dos Anjos, 291')
;

insert into registro(sensor,dataHora,acao,mercado) values
	("01a","2022-03-11 10:13:00","E",1),
    ("01b","2022-03-11 10:13:28","S",1),
    ("02a","2022-03-11 10:13:37","E",1),
    ("02b","2022-03-11 10:14:28","S",1),
    ("01a","2022-03-11 10:13:00","E",2),
    ("01b","2022-03-11 10:13:54","S",2),
    ("01b","2022-03-11 10:13:59","E",2),
    ("01a","2022-03-11 10:15:12","S",2),
	("03a","2022-03-11 14:13:00","E",1),
    ("03a","2022-03-11 14:18:32","S",1),
	("01a","2022-03-11 17:10:21","E",1),
    ("01a","2022-03-11 17:11:58","S",1),
    ("01a","2022-03-11 16:13:00","E",1),
    ("01a","2022-03-11 16:13:24","S",1),
	("01a","2022-03-12 10:13:05","E",1),
    ("01b","2022-03-12 10:13:30","S",1),
    ("01a","2022-03-13 12:56:01","E",1),
    ("01b","2022-03-13 13:03:12","S",1)
    
;

select * from mercado;
select * from registro;
select * from registro where mercado = 1;
select * from registro where mercado = 1 order by dataHora;
select * from registro where mercado = 1 and sensor = "01a" or mercado = 1 and sensor = "01b" order by dataHora;
select * from registro where mercado = 2 and sensor = "01a" or mercado = 2 and sensor = "01b" order by dataHora;