let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

module.exports = {

    async modAfficherMedicaments() {

        return new Promise((resolve, reject) => {

            let requete = 'SELECT * FROM Medicaments'

            mysqlConnexion.query(requete, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    }


}

