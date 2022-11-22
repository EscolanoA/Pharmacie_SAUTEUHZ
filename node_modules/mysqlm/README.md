# mysqlm
A.K.A "MySQL Mini" is
A minimalist Nodejs module that will give you improved mysql/mariadb query methods (promised and stream-like and easy to use transactions)

(It's basically a wrapper of mysql module)

# Setup
Install in your project using npm
> npm install mysqlm --save

Require in your file as
````javascript
const mysqlm = require('mysqlm');
````
# Methods
(All examples will use async await syntax)
## connect 
*connect(config: Object) :Object*

Let's you connect to your database

````javascript
const conn = mysql.connect({
    host: 'localhost',
    user: 'admin',
    password: '12345',
    database: 'mydatabase'
})
````

## query
*query(query: String, input: Array\<String>) :Promise\<result>*

Let's you query your database, returns a promise with result

````javascript
let result = await conn.query('SELECT * FROM pets');

for (const row of result) {
    console.log(row);
}
````

## queryOne
*queryOne(query: String, input: Array\<String>) :Promise\<result>*

Let's you query your database, returns a promise with first element of result

````javascript
let row = await conn.queryOne('SELECT * FROM pets WHERE id = ?', 4);

console.log(row) // Row will be the pet with ID 4
````


## queryStream
*queryStream(query: String, input: Array\<String>) :Object*

Let's you query your database, returns a object with the a promise method wich will return the result row by row.

Usage Case: You need to get or insert more than 100k rows on one or more tables

````javascript
let stream = conn.queryStream('SELECT * FROM people'); // No need for await here since queryStream doesn't return a promise

// read method does in fact returns a promise so await must be used
await stream.read( (row) => {
    console.log(row);
})

// OR

await conn
.queryStream('SELECT * FROM people')
.read( (row) => {
    console.log(row);
}); // Notice how there are no ; before this, because its a chain of functions

````

## Try (aka Transactions)
*try(callback: Function(Connection)) :Promise<Boolean>*

A transaction executes all queries if there are no errors. A single error means the rollback of all queries.
to be concise, all or nothing

You can also think of it as a Try/Catch block, as this tries to execute every query

Note:
    If you want to do a soon rollback, just throw an error (see example 3)

````javascript
// 1. This will throw an error

// Before Transaction, Table player have 0 rows
await conn.transaction(async (t) => {
  await t.query('INSERT INTO player SET ?', [{name: 'Max', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max2', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max3', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max4', points: 400}]);
  await t.query('INSERT INTO ThIsTaBleNaMeShoUldntExistz SET ?', [{name: 'Max5', points: 400}]);
});
// After Transaction, Table player still have 0 rows
// Because transaction failed

````
````javascript

// 2. This will return true

// Before Transaction, Table player have 0 rows
await conn.transaction(async (t) => {
  await t.query('INSERT INTO player SET ?', [{name: 'Max', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max2', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max3', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max4', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max5', points: 400}]);
});
// After Transaction, Table player will have 5 rows
// Because transaction succeded

````

````javascript

// 3. This will do a sooner rollback

// Before Transaction, Table player have 0 rows
await conn.transaction(async (t) => {
  await t.query('INSERT INTO player SET ?', [{name: 'Max', points: 400}]);
  if( 2 + 2 != 5 ){
    throw 'Rollback'; // Sooner Rollback
  }
  await t.query('INSERT INTO player SET ?', [{name: 'Max2', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max3', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max4', points: 400}]);
  await t.query('INSERT INTO player SET ?', [{name: 'Max5', points: 400}]);
});
// After Transaction, Table player still have 0 rows
// Because transaction failed

````

## getMysql - deprecated
*getMysql() :mysql*

Deprecated (Now this module extends all mysql properties and methods to itself)

Let's you get the mysql module, (same as require('mysql'))

Usage Case: When you need to do something this module doesnt have implemented yet

````javascript
const mysqlm = require('mysqlm');
const mysql = mysqlm.getMysql();

mysql.Types; // All mysql types

// Is the same as

const mysqlm = require('mysqlm');

mysqlm.Types; // All mysql Types
````