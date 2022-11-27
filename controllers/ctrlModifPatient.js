//importer les models d'accès aux donnés (requetes SQL)
let modelModifPatient = require('../models/modelModifPatient.js')
let modelMutuelles = require('../models/modelMutuelles.js')


module.exports = {

    /**
    * méthode qui envoie la @req à @modelAfficherModifPatient () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page modifPatient le medicament contenu dans @data .
    */

    async afficherModifPatient(req, res) {

        try {
            let data = await modelModifPatient.modelAfficherModifPatient(req)
            let data2 = await modelMutuelles.modelAfficherMutuelles(req)

            if (data && data2 ) {
                //console.log(data)
                res.render("./modifpatient", { patient: data, mutuelles: data2 })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie la @req à @modelModifPatient () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page medicament le medicament contenu dans @data .
    */

    async modifPatient(req, res) {

        try {
            let data = await modelModifPatient.modelModifPatient(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }

        } catch (error) {
            console.log(error)
        }


    },

}




