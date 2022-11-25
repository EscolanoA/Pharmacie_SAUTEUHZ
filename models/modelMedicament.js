let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

module.exports = {

    async modelAfficherMedicaments() {

        return new Promise((resolve, reject) => {

            let requeteSQL = 'SELECT * FROM Medicaments'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelAjouterMedicament(req) {

        return new Promise((resolve, reject) => {

            let nom = req.body.nom
            let stock = req.body.stock

            let requeteSQL = "INSERT INTO Medicaments (medicament_nom, medicament_boitesstock) VALUES (?, ?)" //+ ' ("' + nom + '",' + stock + ')'


            mysqlConnexion.query(requeteSQL, [nom, stock], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    }






}

