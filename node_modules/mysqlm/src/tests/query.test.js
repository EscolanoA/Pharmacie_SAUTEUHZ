const {DB_HOST, DB_USER, DB_PASSWORD} = require('mandatoryenv').load(["DB_HOST", "DB_USER", "DB_PASSWORD"]);

const mysqlm = require('../index');


test('Query insert select', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    database: 'testdb',
    password: DB_PASSWORD
  });
  
  const data = {
    name: 'Marcos',
    points: 300
  };

  let {insertId} = await conn.query('INSERT INTO test SET ?', data);
  
  let inserted = (await conn.query('SELECT * FROM test WHERE id = ?', [insertId]))[0];
  
  expect(inserted.id).toBe(insertId);
});

test('Query insert delete', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    database: 'testdb',
    password: DB_PASSWORD
  });

  let {insertId} = await conn.query('INSERT INTO test(name, points) VALUES("Juan", 300)');
  
  let {affectedRows} = (await conn.query('DELETE FROM test WHERE id = ?', insertId));
  
  expect(affectedRows).toBe(1);
});