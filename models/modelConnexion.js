let mysql = require('mysql2');
let iniparser = require('iniparser')
let configDB = iniparser.parseSync('./DB.ini')
const sessions = require('express-session');


const mysqlConnexion = mysql.createConnection({
    host: configDB['dev']['host'],
    user: configDB['dev']['user'],
    password: configDB['dev']['password'],
    database: configDB['dev']['dbname']
})
mysqlConnexion.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log('BDD connexion échouée \n Erreur: ' + JSON.stringify(err))
});



const modelTestConnexion = (req, res) => {

    return new Promise((resolve, reject) => {

        let email = req.body.email

        let requeteSQL = 'SELECT * FROM Pharmaciens WHERE parmacien_email = ?'
        mysqlConnexion.query(requeteSQL, [email], (err, data) => {

            if (err) {
                return reject()
            }
            return resolve(data)
        })
    }
    )
}





module.exports = {
    mysqlConnexion,
    modelTestConnexion,
    
} 