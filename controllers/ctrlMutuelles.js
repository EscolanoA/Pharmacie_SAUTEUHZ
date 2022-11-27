//importer les models d'accès aux donnés (requetes SQL)
const modelMutuelles = require('../models/modelMutuelles.js')



module.exports = {

// TODO: mettre le model modelAfficherMutuelles dans model mutuelle

    async afficherMutuelles(req, res) {

        try {
            let data = await modelMutuelles.modelAfficherMutuelles()
            if (data) {
                //console.log(data)
                res.render("./mutuelles", { mutuelles: data })
            }
        } catch (error) {
            console.log(error)
        }


    },


    async ajouterMutuelle(req, res) {

        try {
            let data = await modelMutuelles.modelAjouterMutuelle(req)
            if (data) {
                console.log(data)
                res.redirect("/mutuelles")
            }
        } catch (error) {
            console.log(error)
        }


    },

    async afficherModifMutuelle(req, res) {

        try {
            let data = await modelMutuelles.modelAfficherModifMutuelle(req)
            if (data ) {
                //console.log(data)
                res.render("./modifMutuelle", { mutuelle: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie la @req à @modelModifPatient () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page medicament le medicament contenu dans @data .
    */

    async modifMututelle(req, res) {

        try {
            let data = await modelMutuelles.modelModifMutuelle(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/mutuelles")
            }

        } catch (error) {
            console.log(error)
        }


    },


}