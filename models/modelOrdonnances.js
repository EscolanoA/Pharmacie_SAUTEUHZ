//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {

    async modelAfficherOrdonnances(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let numsecu = req.params.numsecu

            let requeteSQL = `SELECT *, DATE_FORMAT(patient_datenaiss, "%Y") as patient_anneenaiss,DATE_FORMAT(patient_datenaiss, "%m") as patient_moisnaiss,DATE_FORMAT(patient_datenaiss, "%d") as patient_journaiss FROM Patients, Ordonnances, Medecins, Pathologies WHERE patient_numsecu = ? AND ordonnance_patient_numsecu = patient_numsecu AND ordonnance_medecin_id = medecin_id AND ordonnance_pathologie_id = pathologie_id`
            mysqlConnexion.query(requeteSQL, [numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


    async modelAjouterOrdonnance(req) {

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

            let requeteSQL = "INSERT INTO Ordonnances (ordonnance_patient_numsecu, ordonnance_medecin_id, ordonnance_pathologie_id) VALUES (?, ?, ?)"


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

            let idordo = req.params.idordo

            let requeteSQL = "DELETE FROM Ordonnances WHERE ordonnance_id = ?;"


            mysqlConnexion.query(requeteSQL, [idordo], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelafficherModifOrdonnance(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let idordo = req.params.idordo

            let requeteSQL = 'SELECT * FROM Ordonnances WHERE ordonnance_id = ?'
            mysqlConnexion.query(requeteSQL, [idordo], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelmodifOrdonnance(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let id = req.body.id
            let nom = req.body.nom
            let stock = req.body.stock

            let requeteSQL = 'UPDATE Medicaments SET medicament_nom = ?, medicament_boitesstock = ?  WHERE medicament_id = ?'
            mysqlConnexion.query(requeteSQL, [nom, stock, id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


}