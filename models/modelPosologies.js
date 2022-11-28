//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {


    async modelAfficherInfoOrdonnance(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let idordo = req.params.idordo

            let requeteSQL = `SELECT *, TO_DAYS(posologie_fin) - TO_DAYS(CURRENT_DATE) as jrestants FROM Patients, Posologies, Medecins, Pathologies, Ordonnances WHERE posologie_ordonnance_id = ? AND posologie_ordonnance_id = ordonnance_id AND  ordonnance_patient_numsecu = patient_numsecu AND ordonnance_medecin_id = medecin_id AND ordonnance_pathologie_id = pathologie_id`
            mysqlConnexion.query(requeteSQL, [idordo], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelAfficherPosologies(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let idordo = req.params.idordo

            let requeteSQL = `SELECT * FROM Posologies, Medicaments WHERE posologie_ordonnance_id = ? AND posologie_medicament_id = medicament_id`
            mysqlConnexion.query(requeteSQL, [idordo], (err, data) => {

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

            let numsecu = req.body.numsecu
            let medecin = req.body.medecin
            let pathologie = req.body.pathologie

            //console.log(mutuelle)

            let requeteSQL = "INSERT INTO Posologies (posologie_ordonnance_id, posologie_medicament_id, posologie_fin ,posologie_nbboitesmois) VALUES (?, ?, DATE_ADD(CURRENT_DATE(), INTERVAL ? MONTH ), ?)"


            mysqlConnexion.query(requeteSQL, [numsecu, medecin, pathologie], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })

        }
        )
    },


    async modelSupprimerOrdonnance(req) {

        /** 
         * recuperation de l' @id dans la requette GET @req
         * instantiation d'une promesse de résultat de  @requetteSQL avec la donné en paramètre
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = "DELETE FROM Posologies WHERE ordonnance_id = ?;"


            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


}