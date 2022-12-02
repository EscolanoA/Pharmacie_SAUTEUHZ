module.exports = {
    
    async afficherAcceuil(req, res) {
        const sessionId = req.headers.cookie.split('='[1])
        const userSession = sessions[sessionId]
        console.log(userSession)

        res.render('./accueil')
    },

}