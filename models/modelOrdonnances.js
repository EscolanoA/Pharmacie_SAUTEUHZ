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
            mysqlConnexion.query(requeteSQL,[numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

}