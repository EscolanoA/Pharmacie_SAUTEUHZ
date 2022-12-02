module.exports = {
    
    async afficherAcceuil(req, res) {
        console.log(req.headers.cookie.split('='[1]))
        res.render('./accueil')
    },

}