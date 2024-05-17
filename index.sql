-- setup.sql
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    username TEXT,
    saldo REAL
);

INSERT INTO accounts (username, saldo) VALUES ('user1', 1000);
INSERT INTO accounts (username, saldo) VALUES ('user2', 2000);
INSERT INTO accounts (username, saldo) VALUES ('user3', 3000);
