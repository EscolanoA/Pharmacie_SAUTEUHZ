const modelAcceuil = require('../models/modelAcceuil.js')



module.exports = {

    async afficherAcceuil(req, res) {



        try {
            let data = await modelAcceuil.modelAfficherStockMedicaments()
            let data2 = await modelAcceuil.modelAfficherBesoinsMedicaments(1)
            let data3 = await modelAcceuil.modelAfficherBesoinsMedicaments(2)
            let data4 = await modelAcceuil.modelAfficherBesoinsMedicaments(3)
            
            if (data) {
                //console.log(data)
                res.render("accueil", { medicaments: data, moisActuel: data2, moisActuelPlus1: data3, moisActuelPlus2: data4 })
            }
        } catch (error) {
            console.log(error)
        }


    },




}