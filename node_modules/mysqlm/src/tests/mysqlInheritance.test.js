const mysqlm = require('../index');
const mysql = require('mysql');

test('Check if mysqlm inherited mysql properties', () => {
  expect(mysqlm).toMatchObject(mysql);
});