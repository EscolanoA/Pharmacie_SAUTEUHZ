const {DB_HOST, DB_USER, DB_PASSWORD} = require('mandatoryenv').load(["DB_HOST", "DB_USER", "DB_PASSWORD"]);

const mysqlm = require('../index');


test('Done connection without database succesfully', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD
  });

  await conn.query('create database if not exists `mysqlmqwerty`');
  await conn.query('drop database if exists `mysqlmqwerty`');
  
  expect(1).toBe(1);
});


test('Done connection with database succesfully', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD
  });
  
  await conn.query('show databases');
  
  expect(1).toBe(1);
});