const sessions = require('express-session');
module.exports = {

    async afficherAcceuil(req, res) {

        //console.log(sessions)
        console.log(req.headers.cookie?.split('session=')[1])
        
        const sessionId = req.headers.cookie?.split('session=')[1]
        
        const userSession = sessions[sessionId]
        //impossible de trouvrer la variable "session="
        if (!userSession) {
            res.render('connexion')

        } else { res.render('accueil') }


    },

}