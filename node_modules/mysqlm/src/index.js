const mysql = require('mysql');
const stream = require('stream');

let pool = null;

async function query(query, input) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                if (Reflect.has(conn || {}, 'destroy')) conn.release();
                reject(err);
            } else {
                conn.query(query, input, (err, result) => {
                    if (Reflect.has(conn || {}, 'destroy')) conn.release();
                    if (err) reject(err);
                    else resolve(result);
                })
            }
        });
    })
}

async function queryOne(query, input) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                if (Reflect.has(conn || {}, 'destroy')) conn.release();
                reject(err);
            } else {
                conn.query(query, input, (err, result) => {
                    if (Reflect.has(conn || {}, 'destroy')) conn.release();
                    if (err) reject(err);
                    else resolve(Array.isArray(result) ? (result.length > 0 ? result[0] : undefined) : undefined);
                })
            }
        });
    })
}

async function _rawStream(query = '', input = []) {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err, conn) => {
                if (err) {
                    if (Reflect.has(conn || {}, 'destroy')) conn.release();
                    reject(err);
                } else {
                    resolve((superCallback) => new Promise((resolver, rechazar) => {
                        conn.query(query, input)
                            .on('error', function (err) {
                                if (Reflect.has(conn || {}, 'destroy')) conn.release();
                                rechazar(err);
                            })
                            .stream()
                            .pipe(
                                new stream.Transform({
                                    objectMode: true,
                                    transform: function (row, encoding, callback) {
                                        superCallback(row);
                                        callback();
                                    }
                                }))
                            .on('finish', function () {
                                if (Reflect.has(conn || {}, 'destroy')) conn.release();
                                resolver(true);
                            });
                    }));
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}
/**
 * Example:
 * 
 *  await conn.stream('SELECT * from data').read( row => {
 *     console.log(row);
 *  })
 * 
 * @param {String} query The query to the database
 * @param {Array<String>} input The input values for prepared statements, default is []
 */
function queryStream(query, input = []) {
    /**
     * Have a .read promise that contains a callback, where every row will be streamed
     */
    return {

        /**
         *  Example:
         * const mystream = conn.stream('SELECT * from data');
         * 
         * await mystream.read((row)=>{
         * 
         *  console.log(row); //print each row
         * 
         * })
         * 
         * @param {Function} callback
         */
        async read(callback) {
            await (await _rawStream(query, input))(row => {
                callback(row);
            });
        }
    }
}

function _rawTry(transaction = async (connection = {}) => {}) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                if (Reflect.has(conn || {}, 'destroy')) conn.release();
                reject(err);
            } else {
                // Begin
                conn.beginTransaction(async (err) => {
                    if (err) conn.rollback(() => reject(err));
                    const _query = (query, input = []) => new Promise((_resolve, _reject) => conn.query(query, input, (err, result) => {
                        if (err) conn.rollback( () => reject(err));
                        _resolve(result);
                    }));
                    
                    try {
                        await transaction({query: _query});
                        conn.commit((err) => {
                            if (err) conn.rollback(() => reject(err));
                            resolve(true);
                        });
                    } catch (err) {
                        conn.rollback((error) => reject(error || err));
                        reject(err);
                    }
                });
                // End
            }
        })
    })
}
module.exports = {
    /**
     * Returns a connection method, config is the same as mysql
     * example:
     * 
     * mysqlm.connect({
     *  host: 'localhost',
     *  user: 'root',
     *  password: '',
     *  database: 'officedb'
     * })
     */
    connect: (config = {}) => {
        pool = mysql.createPool(config);

        return {
            /**
             *  Queries the database, returns a Promise that resolves in the result
             * 
             * @param {String} query - Query string to be executed
             * @param {Array<Object>} input - Input parameters for prepared statements
             */
            query,
            /**
             *  Queries the database, returns a Promise that resolves in the first element of the result
             * 
             * @param {String} query - Query string to be executed
             * @param {Array<Object>} input - Input parameters for prepared statements
             */
            queryOne,
            /**
             *  Queries the database, returns a Object with a stream-like method
             * 
             * @param {String} query - Query string to be executed
             * @param {Array<Object>} input - Input parameters for prepared statements
             */
            queryStream,
            /**
             *  Do a Transaction, Pass queries in the callbacks body
             *  
             *  If OK transaction will be commited, if not it will be rollbacked and throw and error
             * 
             * @param {Function(Connection)} transaction - Query string to be executed
             * @param {Array<Object>} input - Input parameters for prepared statements
             */
            try: _rawTry,
            /**
             *  Do a Transaction, Pass queries in the callbacks body
             *  
             *  If OK transaction will be commited, if not it will be rollbacked and throw and error
             * 
             * @param {Function(Connection)} transaction - Query string to be executed
             * @param {Array<Object>} input - Input parameters for prepared statements
             */
            transaction: _rawTry
        }
    },
    /**
     * Returns the mysql module (same as require('mysql'))
     */
    getMysql: () => mysql,

    /** 
     * Populates mysql methods and properties into mysqlm 
     */
    ...(() => mysql)(),
    Types: mysql.Types
}