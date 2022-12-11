const modelAcceuil = require('../models/modelAcceuil.js')



module.exports = {

    async afficherAcceuil(req, res) {



        try {
            let data = await modelAcceuil.modelAfficherStockMedicaments()
            if (data) {
                console.log(data)
                res.render("accueil", { medicaments: data })
            }
        } catch (error) {
            console.log(error)
        }


    },




}