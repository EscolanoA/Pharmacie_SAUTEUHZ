let mysql = require('mysql');
let iniparser = require('iniparser')
let configDB = iniparser.parseSync('./DB.ini')

const  mysqlconnexion = mysql.createConnection({
    host: configDB['dev']['host'],
    user: configDB['dev']['user'],
    password: configDB['dev']['password'],
    database: configDB['dev']['database']
})
mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log('BDD connexion échouée \n Erreur: ' + JSON.stringify(err))
})

module.exports = mysqlconnexion;