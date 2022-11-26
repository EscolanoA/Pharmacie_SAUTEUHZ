//récuperer le module de connexion
let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {

    async modelAfficherModifPatient(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let numsecu = req.params.numsecu

            let requeteSQL = 'SELECT *, DATE_FORMAT(patient_datenaiss, "%Y") as patient_anneenaiss,DATE_FORMAT(patient_datenaiss, "%m") as patient_moisnaiss,DATE_FORMAT(patient_datenaiss, "%d") as patient_journaiss FROM Patients WHERE patient_numsecu = ?'
            mysqlConnexion.query(requeteSQL, [numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },
    async modelAfficherMutuelles() {
        

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {
            //ORDER BY afin que pas de mutuelle soit selected

            let numsecu = req.params.numsecu

            let requeteSQL = 'SELECT Mutuelles,* FROM Mutuelles ORDER BY mutuelle_id'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



        async modelModifMedicament(req) {

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