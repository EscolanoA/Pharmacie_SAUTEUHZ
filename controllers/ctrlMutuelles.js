//importer les models d'accès aux donnés (requetes SQL)
const modelMutuelles = require('../models/modelMutuelles.js')



module.exports = {

    /**
    * méthodes qui envoient la @req au @modelMutuelles () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher les données contenues dans @data .
    */

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
            /**
             * @param req contient les data du body du dom
             */
            let data = await modelMutuelles.modelAjouterMutuelle(req)
            if (data) {
                console.log(data)
                res.redirect("/mutuelles")
            }
        } catch (error) {
            console.log(error)
        }


    },

    async supprimerMututelle(req, res) {
        /**
         * @param req contient le param id a suprimmer
         */
        try {
            let data = await modelMutuelles.modelSupprimerMutuelle(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/mutuelles")
            }

        } catch (error) {
            console.log(error)
        }


    },


    async afficherModifMutuelle(req, res) {

        try {
            /**
             * @param req contient les data de la mutuelle a modifier
             */
            let data = await modelMutuelles.modelAfficherModifMutuelle(req)
            if (data ) {
                //console.log(data)
                res.render("./modifMutuelle", { mutuelle: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    async modifMututelle(req, res) {

        try {
            /**
             * @param req envoie à la BDD les data de la mutu a modifier
             */
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