//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {


    async modelAfficherMutuelles() {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {
            //ORDER BY afin que pas de mutuelle soit selected

            let requeteSQL = 'SELECT * FROM Mutuelles ORDER BY mutuelle_id'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    

    async modelAjouterMutuelle(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let nom = req.body.nom
            let tel = req.body.tel
            let email = req.body.email

            let requeteSQL = "INSERT INTO Mutuelles (mutuelle_nom, mutuelle_tel,mutuelle_email) VALUES (?, ?, ?)"
            mysqlConnexion.query(requeteSQL, [nom, tel, email], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



    async modelAfficherModifMutuelle(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = 'SELECT * FROM Mutuelles WHERE mutuelle_id = ?'
            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },




    async modelModifMutuelle(req) {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            
            let nom = req.body.nom
            let tel = req.body.tel
            let email = req.body.email
            let id = req.body.id

            let requeteSQL = 'UPDATE Mutuelles SET mutuelle_nom = ?, mutuelle_tel = ?, mutuelle_email = ? WHERE mutuelle_id = ?'
            mysqlConnexion.query(requeteSQL, [ nom, tel, email, id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },





}