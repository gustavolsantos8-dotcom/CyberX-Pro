CREATE DATABASE CYBERX_PRO;
GO
USE CYBERX_PRO;
GO

/* Lógico_CyberX-Pro: */

CREATE TABLE Clientes (
    Id INTEGER IDENTITY PRIMARY KEY,
    Nome VARCHAR(40),
    Email VARCHAR(40),
    Senha VARCHAR(20),
    Telefone VARCHAR(40)
);

CREATE TABLE Produtos (
    Id INTEGER IDENTITY PRIMARY KEY,
    Nome VARCHAR(40),
    Valor_Do_Produto DECIMAL
);

CREATE TABLE Setores (
    Id INTEGER IDENTITY  PRIMARY KEY,
    Nome_de_Setor VARCHAR(40)
);

CREATE TABLE Funcionarios (
    Id INTEGER IDENTITY PRIMARY KEY,
    Email VARCHAR(40),
    Nome VARCHAR(40),
    Cargo VARCHAR(30),
    fk_Setores_Id INTEGER,
    Cpf VARCHAR(12),
    Senha VARCHAR(20),
    Telefone VARCHAR(25),
    DataNasc DATE
);

CREATE TABLE Pedidos (
    Id INTEGER IDENTITY PRIMARY KEY,
    Valor DECIMAL,
    fk_Cliente_Cpf INTEGER,
    fk_Setores_Id INTEGER
);

CREATE TABLE Funcionarios_Dos_Pedidos (
    Id INTEGER IDENTITY PRIMARY KEY,
    fk_Funcionarios_Id INTEGER,
    fk_Pedido_Id INTEGER
);

CREATE TABLE Produtos_Dos_Pedidos (
    Id INTEGER IDENTITY PRIMARY KEY,
    fk_Produtos_Id INTEGER,
    fk_Pedidos_Id INTEGER,
    Quantidade INTEGER
);
 
ALTER TABLE Funcionarios ADD CONSTRAINT FK_Funcionarios_2
    FOREIGN KEY (fk_Setores_Id)
    REFERENCES Setores (Id)
    ON DELETE NO ACTION;
 

ALTER TABLE Pedidos ADD CONSTRAINT FK_Pedidos_2
    FOREIGN KEY (fk_Cliente_Cpf)
    REFERENCES Clientes (Id)
    ON DELETE CASCADE;
 
ALTER TABLE Pedidos ADD CONSTRAINT FK_Pedidos_3
    FOREIGN KEY (fk_Setores_Id)
    REFERENCES Setores (Id)
    ON DELETE CASCADE;
 
ALTER TABLE Funcionarios_Dos_Pedidos ADD CONSTRAINT FK_Funcionarios_Dos_Pedidos_1
    FOREIGN KEY (fk_Funcionarios_Id)
    REFERENCES Funcionarios (Id)
    ON DELETE NO ACTION;
 
ALTER TABLE Funcionarios_Dos_Pedidos ADD CONSTRAINT FK_Funcionarios_Dos_Pedidos_2
    FOREIGN KEY (fk_Pedido_Id)
    REFERENCES Pedidos (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Produtos_Dos_Pedidos ADD CONSTRAINT FK_Produtos_Dos_Pedidos_1
    FOREIGN KEY (fk_Produtos_Id)
    REFERENCES Produtos (Id)
    ON DELETE NO ACTION;
 
ALTER TABLE Produtos_Dos_Pedidos ADD CONSTRAINT FK_Produtos_Dos_Pedidos_2
    FOREIGN KEY (fk_Pedidos_Id)
    REFERENCES Pedidos (Id)
    ON DELETE SET NULL;