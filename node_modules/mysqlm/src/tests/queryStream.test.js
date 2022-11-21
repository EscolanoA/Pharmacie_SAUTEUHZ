const {DB_HOST, DB_USER, DB_PASSWORD} = require('mandatoryenv').load(["DB_HOST", "DB_USER", "DB_PASSWORD"]);

const mysqlm = require('../index');


test('Query Stream select rows', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    database: 'testdb',
    password: DB_PASSWORD
  });

  let result = [];

  await conn.queryStream('SELECT name FROM test LIMIT 4').read(function (row) {
    result.push(row);
  });

  expect(result).toMatchObject([{"name":"Luis"},{"name":"David"},{"name":"Choque"},{"name":"Castro"}]);
});