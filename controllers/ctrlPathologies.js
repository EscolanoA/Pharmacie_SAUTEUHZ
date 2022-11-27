//importer les models d'accès aux donnés (requetes SQL)
const modelPathologies = require('../models/modelPathologies.js')



module.exports = {

// TODO: mettre le model modelAfficherPathologies dans model pathologie

    async afficherPathologies(req, res) {

        try {
            let data = await modelPathologies.modelAfficherPathologies()
            if (data) {
                //console.log(data)
                res.render("./pathologies", { pathologies: data })
            }
        } catch (error) {
            console.log(error)
        }


    },


    async ajouterPathologie(req, res) {

        try {
            let data = await modelPathologies.modelAjouterPathologie(req)
            if (data) {
                console.log(data)
                res.redirect("/pathologies")
            }
        } catch (error) {
            console.log(error)
        }


    },
    
    async supprimerPathologie(req, res) {

        try {
            let data = await modelPathologies.modelSupprimerPathologie(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/pathologies")
            }

        } catch (error) {
            console.log(error)
        }


    },

    async afficherModifPathologie(req, res) {

        try {
            let data = await modelPathologies.modelAfficherModifPathologie(req)
            if (data ) {
                //console.log(data)
                res.render("./modifPathologie", { pathologie: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie la @req à @modelModifPatient () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page medicament le medicament contenu dans @data .
    */

    async modifPathologie(req, res) {

        try {
            let data = await modelPathologies.modelModifPathologie(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/pathologies")
            }

        } catch (error) {
            console.log(error)
        }


    },



}