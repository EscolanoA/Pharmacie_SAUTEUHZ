//récuperer le module de connexion
let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {

    async modelAfficherModifMedicament(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = 'SELECT * FROM Medicaments WHERE medicament_id = ?'
            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

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