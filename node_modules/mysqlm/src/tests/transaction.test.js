const {DB_HOST, DB_USER, DB_PASSWORD} = require('mandatoryenv').load(["DB_HOST", "DB_USER", "DB_PASSWORD"]);

const mysqlm = require('../index');


test('Transaction with 5 inserts, check if rows count increases in 5', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    database: 'testdb',
    password: DB_PASSWORD
  });

  let before = (await conn.query('SELECT count(name) as amount FROM test'))[0].amount;
  
  await conn.transaction(async (t) => {
    await t.query('INSERT INTO test SET ?', [{name: 'Max', points: 400}]);
    await t.query('INSERT INTO test SET ?', [{name: 'Max2', points: 400}]);
    await t.query('INSERT INTO test SET ?', [{name: 'Max3', points: 400}]);
    await t.query('INSERT INTO test SET ?', [{name: 'Max4', points: 400}]);
    await t.query('INSERT INTO test SET ?', [{name: 'Max5', points: 400}]);
  });
  
  let after = (await conn.query('SELECT count(name) as amount FROM test'))[0].amount;

  expect(before).toBe(parseInt(after) - 5);
});


test('Transaction with 4 inserts ok and 1 bad, any query should be done if something fails', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    database: 'testdb',
    password: DB_PASSWORD
  });

  let before = (await conn.query('SELECT count(name) as amount FROM test'))[0].amount;
  
  try {
    await conn.transaction(async (t) => {
      await t.query('INSERT INTO test SET ?', [{name: 'tMax', points: 400}]);
      await t.query('INSERT INTO test SET ?', [{name: 'tMax2', points: 400}]);
      await t.query('INSERT INTO test SET ?', [{name: 'tMax3', points: 400}]);
      await t.query('INSERT INTO test SET ?', [{name: 'tMax4', points: 400}]);
      await t.query('INSERT INTO ThIsTaBleNaMeShoUldntExistz SET ?', [{name: 'tMax5', points: 400}]);
    });
  } catch (error) {
    // We dont want to test if it throws an error here
    // Just see if any of this rows are being added
  }
  
  let after = (await conn.query('SELECT count(name) as amount FROM test'))[0].amount;

  expect(before).toBe(after);
});


test('Transaction with soon rollback', async () => {
  const conn = mysqlm.connect({
    host: DB_HOST,
    user: DB_USER,
    database: 'testdb',
    password: DB_PASSWORD
  });

  let before = (await conn.query('SELECT count(name) as amount FROM test'))[0].amount;
  
  try {
    await conn.transaction(async (t) => {
      await t.query('INSERT INTO test SET ?', [{name: 'Max', points: 400}]);
      if( 2 + 2 != 5 ){
        throw 'Rollback'; // Sooner Rollback
      }
      await t.query('INSERT INTO test SET ?', [{name: 'Max2', points: 400}]);
      await t.query('INSERT INTO test SET ?', [{name: 'Max3', points: 400}]);
      await t.query('INSERT INTO test SET ?', [{name: 'Max4', points: 400}]);
      await t.query('INSERT INTO ThIsTaBleNaMeShoUldntExistz SET ?', [{name: 'Max5', points: 400}]);
    });
  } catch (error) {
    // We dont want to test if it throws an error here
    // Just see if any of this rows are being added
  }
  
  let after = (await conn.query('SELECT count(name) as amount FROM test'))[0].amount;

  expect(before).toBe(after);
});