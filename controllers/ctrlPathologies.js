/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Guclu Sefa Illian Benaissa => aide sur les asnc : await
*/

//importer les models d'accès aux donnés (requetes SQL)
const modelPathologies = require('../models/modelPathologies.js')



module.exports = {

    /**
    * méthodes qui envoient la @req au @modelPathologies () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher les collections d'objets contenues dans @data et/ou de rediriger après une opération réussie vers la BDD .
    */

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
            /**
             * @param req contient les data du body du dom
             */
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
            /**
             * @param req contient le param id a suprimmer
             */
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
            /**
             * @param req contient les data de la pathologie a modifier
             */
            let data = await modelPathologies.modelAfficherModifPathologie(req)
            if (data ) {
                //console.log(data)
                res.render("./modifPathologie", { pathologie: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    async modifPathologie(req, res) {

        try {
            /**
             * @param req envoie à la BDD les data de la pathologie a modifier
             */
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