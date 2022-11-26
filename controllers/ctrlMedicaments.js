//importer les models d'accès aux donnés (requetes SQL)
let modelMedicament = require('../models/modelMedicaments.js')

module.exports = {

    /**
    * méthode qui attend @data , fourni par la fonction @modelAfficherMedicaments () , sans bloquer le thread principal.
    * le resultat res , est d'afficher sur la page medicament les @data nommées @medicaments .
    */

    async afficherMedicaments(req, res) {

        try {
            let data = await modelMedicament.modelAfficherMedicaments()
            if (data) {
                //console.log(data)
                res.render("./medicaments", { medicaments: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie @req en paramètre, au modèle @modelAjouterMedicament () , sans bloquer le thread principal.
    * si @data est true (elle ne l'est qui si elle n'est pas nulle / à été resolve), alors le resultat, @res est d'afficher la page /medicaments qui apellera la fontion du dessus pour rafraichir les données .
    */

    async ajouterMedicament(req, res) {

        try {
            let data = await modelMedicament.modelAjouterMedicament(req)
            if (data) {
                res.redirect("/medicaments")
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie @req en paramètre, au modèle @modelSupprimerMedicament () , sans bloquer le thread principal.
    * si @data est true, alors le resultat, @res est d'afficher la page /medicaments qui apellera la fontion du dessus pour rafraichir les données .
    */

    async supprimerMedicament(req, res) {

        try {
            let data = await modelMedicament.modelSupprimerMedicament(req)
            if (data) {
                res.redirect("/medicaments")
            }
        } catch (error) {
            console.log(error)
        }


    }

}

