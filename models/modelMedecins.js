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

    async modelAfficherMedecins() {


        return new Promise((resolve, reject) => {
            //ORDER BY afin que pas de mutuelle soit selected

            let requeteSQL = 'SELECT * FROM Medecins ORDER BY medecin_id'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



    async modelAjouterMedecin(req) {

        return new Promise((resolve, reject) => {

            let prenom = req.body.prenom
            let nom = req.body.nom
            let tel = req.body.tel
            let email = req.body.email

            let requeteSQL = "INSERT INTO Medecins (medecin_prenom, medecin_nom, medecin_tel, medecin_email ) VALUES (?, ?, ?, ?)"
            mysqlConnexion.query(requeteSQL, [prenom, nom, tel, email], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



    async modelAfficherModifMedecin(req) {

        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = 'SELECT * FROM Medecins WHERE medecin_id = ?'
            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },




    async modelModifMedecin(req) {

        return new Promise((resolve, reject) => {


            let nom = req.body.nom
            let prenom = req.body.prenom
            let tel = req.body.tel
            let email = req.body.email
            let id = req.body.id

            let requeteSQL = 'UPDATE Medecins SET medecin_prenom = ?, medecin_nom = ?, medecin_tel = ?, medecin_email = ? WHERE medecin_id = ?'
            mysqlConnexion.query(requeteSQL, [prenom, nom, tel, email, id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelSupprimerMedecin(req) {


        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = "DELETE FROM Medecins WHERE medecin_id = ?;"


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