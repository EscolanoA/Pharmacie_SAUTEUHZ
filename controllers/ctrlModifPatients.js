//importer les models d'accès aux donnés (requetes SQL)
let modelModifMedicament = require('../models/modelModifPatient.js')

module.exports = {

    /**
    * méthode qui envoie la @req à @modelAfficherModifMedicament () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page modifmedicament le medicament contenu dans @data .
    */

    async afficherModifPatient(req, res) {

        try {
            let data = await modelModifMedicament.modelAfficherModifPatient(req)
            if (data) {
                //console.log(data)
                res.render("./modifpatient", { patient: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie la @req à @modelModifMedicament () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page medicament le medicament contenu dans @data .
    */

    async modifPatient(req, res) {

        try {
            let data = await modelModifMedicament.modelModifMedicament(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }

        } catch (error) {
            console.log(error)
        }


    }

}




