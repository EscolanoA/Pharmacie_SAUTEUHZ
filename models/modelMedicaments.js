//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {

    async modelAfficherMedicaments() {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            //fait la somme des besoins totaux d'un medicament entre la date actuelle et la date de fin de sa posologie

            let requeteSQL = 'SELECT Medicaments.*, SUM(TIMESTAMPDIFF(MONTH, CURRENT_DATE, posologie_fin)* Posologies.posologie_nbboitesmois )as medicament_besoins_totaux FROM Posologies, Medicaments WHERE Medicaments.medicament_id = Posologies.posologie_medicament_id GROUP BY Medicaments.medicament_nom ORDER BY Medicaments.medicament_id;'
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

        /** 
         * recuperation des données la requette POST @req
         * instantiation d'une promesse de résultat de  @requetteSQL avec ces données en paramètres
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let nom = req.body.nom
            let stock = req.body.stock

            let requeteSQL = "INSERT INTO Medicaments (medicament_nom, medicament_boitesstock) VALUES (?, ?)" 


            mysqlConnexion.query(requeteSQL, [nom, stock], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelSupprimerMedicament(req) {

        /** 
         * recuperation de l' @id dans la requette GET @req
         * instantiation d'une promesse de résultat de  @requetteSQL avec la donné en paramètre
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = "DELETE FROM Medicaments WHERE medicament_id = ?;"


            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },
    async modelafficherModifMedicament(req) {

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




        async modelmodifMedicament(req) {

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


        async modelbesoinsTotauxMedicaments(req) {

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

