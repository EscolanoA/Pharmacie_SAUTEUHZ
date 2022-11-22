CREATE DATABASE testdb;

USE testdb;

CREATE TABLE test(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    points BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test(name, points) VALUES
("Luis", 100),
("David", 100),
("Choque", 100),
("Castro", 100);