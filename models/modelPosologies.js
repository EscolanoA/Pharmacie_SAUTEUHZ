//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {



    async modelAfficherPosologies(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let numsecu = req.params.numsecu
            let idordo = req.params.idordo

            let requeteSQL = `SELECT * FROM Posologies, Medicaments, Patients, Ordonnances WHERE posologie_ordonnance_id = ? AND patient_numsecu = ? AND posologie_medicament_id = medicament_id AND posologie_ordonnance_id = ordonnance_id AND patient_numsecu = ordonnance_patient_numsecu `
            mysqlConnexion.query(requeteSQL, [idordo, numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


    async modelAjouterPosologie(req) {

        /** 
         * recuperation des données la requette POST @req
         * instantiation d'une promesse de résultat de  @requetteSQL avec ces données en paramètres
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let idordo = req.body.idordo
            let medicament = req.body.medicament
            let boites = req.body.boites
            let duree = req.body.duree

            //console.log(mutuelle)

            let requeteSQL = "INSERT INTO Posologies (posologie_ordonnance_id, posologie_medicament_id, posologie_fin ,posologie_nbboitesmois) VALUES (?, ?, DATE_ADD(CURRENT_DATE(), INTERVAL ? MONTH ), ?)"


            mysqlConnexion.query(requeteSQL, [idordo, medicament,duree, boites ], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })

        }
        )
    },


    async modelSupprimerPosologie(req) {

        /** 
         * recuperation de l' @id dans la requette GET @req
         * instantiation d'une promesse de résultat de  @requetteSQL avec la donné en paramètre
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let idpos = req.params.idpos

            let requeteSQL = "DELETE FROM Posologies WHERE posologie_id = ?;"


            mysqlConnexion.query(requeteSQL, [idpos], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


}