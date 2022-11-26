//importer les models d'accès aux donnés (requetes SQL)
let modelModifMedicament = require('../models/modelModifMedicament.js')

module.exports = {

    /**
    * méthode qui envoie la @req à @modelAfficherModifMedicament () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page modifmedicament le medicament contenu dans @data .
    */

    async afficherModifMedicament(req, res) {

        try {
            let data = await modelModifMedicament.modelAfficherModifMedicament(req)
            if (data) {
                //console.log(data)
                res.render("./modifMedicament", { medicament: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie la @req à @modelModifMedicament () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page medicament le medicament contenu dans @data .
    */

    async modifMedicament(req, res) {

        try {
            let data = await modelModifMedicament.modelModifMedicament(req)
            if (data) {
                //console.log(data)
                res.redirect("/medicaments")
            }

        } catch (error) {
            console.log(error)
        }


    }

}




