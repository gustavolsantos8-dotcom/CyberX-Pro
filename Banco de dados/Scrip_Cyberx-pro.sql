CREATE DATABASE CYBERX_PRO;
GO
USE CYBERX_PRO;
GO

/* Lógico_CyberX-Pro: */

CREATE TABLE Cliente (
    Id INTEGER PRIMARY KEY,
    Nome VARCHAR(40),
    Email VARCHAR(40),
    Senha VARCHAR(20)
);

CREATE TABLE Produtos (
    Id INTEGER PRIMARY KEY,
    Nome VARCHAR(40),
    Valor_Do_Produto DECIMAL
);

CREATE TABLE Setores (
    Identificador INTEGER PRIMARY KEY,
    Nome_de_Setor VARCHAR(40)
);

CREATE TABLE Funcionarios (
    Id INTEGER PRIMARY KEY,
    Email VARCHAR(40),
    Nome VARCHAR(40),
    Tipo VARCHAR(30),
    fk_Setores_Identificador INTEGER,
    Cpf VARCHAR(12),
    Senha VARCHAR(20),
    Data_Nascimento DATE
);

CREATE TABLE Pedido (
    Id INTEGER PRIMARY KEY,
    Valor DECIMAL,
    fk_Cliente_Cpf INTEGER,
    fk_Setores_Identificador INTEGER
);

CREATE TABLE Funcionarios_Do_Pedido (
    fk_Funcionarios_Id INTEGER,
    fk_Pedido_Id INTEGER
);

CREATE TABLE Produtos_Do_Pedido (
    fk_Produtos_Id INTEGER,
    fk_Pedido_Id INTEGER,
    Quantidade INTEGER
);
 
ALTER TABLE Funcionarios ADD CONSTRAINT FK_Funcionarios_2
    FOREIGN KEY (fk_Setores_Identificador)
    REFERENCES Setores (Identificador)
    ON DELETE RESTRICT;
 
ALTER TABLE Pedido ADD CONSTRAINT FK_Pedido_2
    FOREIGN KEY (fk_Cliente_Cpf)
    REFERENCES Cliente (Id)
    ON DELETE CASCADE;
 
ALTER TABLE Pedido ADD CONSTRAINT FK_Pedido_3
    FOREIGN KEY (fk_Setores_Identificador)
    REFERENCES Setores (Identificador)
    ON DELETE CASCADE;
 
ALTER TABLE Funcionarios_Do_Pedido ADD CONSTRAINT FK_Funcionarios_Do_Pedido_1
    FOREIGN KEY (fk_Funcionarios_Id)
    REFERENCES Funcionarios (Id)
    ON DELETE NO ACTION;
 
ALTER TABLE Funcionarios_Do_Pedido ADD CONSTRAINT FK_Funcionarios_Do_Pedido_2
    FOREIGN KEY (fk_Pedido_Id)
    REFERENCES Pedido (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Produtos_Do_Pedido ADD CONSTRAINT FK_Produtos_Do_Pedido_1
    FOREIGN KEY (fk_Produtos_Id)
    REFERENCES Produtos (Id)
    ON DELETE NO ACTION;
 
ALTER TABLE Produtos_Do_Pedido ADD CONSTRAINT FK_Produtos_Do_Pedido_2
    FOREIGN KEY (fk_Pedido_Id)
    REFERENCES Pedido (Id)
    ON DELETE SET NULL;