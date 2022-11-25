let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion


async function modAfficherMedicaments(req) {



    mysqlConnexion.query('SELECT * FROM Medicaments', (err, lignes) => {
        if (!err) {
            let data = lignes

        } else {
            console.log(err)
        }
    })
    return data


}

module.exports = {
    modAfficherMedicaments,

}