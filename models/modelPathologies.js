/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Lorenzo Porcu => aide sur les Promesses 
*/

//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {

    /**
     * Médhodes d'instantiations des promesses de résultat de  @requetteSQL 
     * si @err est true la promesse est @return rejeté @reject avec le message d'erreur @err
     * sinon @return @resolve avec les donnés @data de la @requetteSQL
     * !  on ne peut résolve q'une @data par promesse  !
    */


    async modelAfficherPathologies() {


        return new Promise((resolve, reject) => {
            //ORDER BY afin que pas de mutuelle soit selected

            let requeteSQL = 'SELECT * FROM Pathologies ORDER BY pathologie_id'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    

    async modelAjouterPathologie(req) {


        return new Promise((resolve, reject) => {

            let nom = req.body.nom

            let requeteSQL = "INSERT INTO Pathologies (pathologie_nom) VALUES (?)"
            mysqlConnexion.query(requeteSQL, [nom], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



    async modelAfficherModifPathologie(req) {



        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = 'SELECT * FROM Pathologies WHERE pathologie_id = ?'
            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },




    async modelModifPathologie(req) {

        return new Promise((resolve, reject) => {

            
            let nom = req.body.nom
            let id = req.body.id

            let requeteSQL = 'UPDATE Pathologies SET pathologie_nom = ? WHERE pathologie_id = ?'
            mysqlConnexion.query(requeteSQL, [ nom, id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelSupprimerPathologie(req) {


        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = "DELETE FROM Pathologies WHERE pathologie_id = ?;"


            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    }



}