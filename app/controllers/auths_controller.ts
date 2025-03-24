import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'


export default class AuthController {

   public async authss({request, auth, response}: HttpContext) {

        const { email, password } = request.only(['email','password'])

        const user = await User.verifyCredentials(email, password)

        await auth.use('web').login(user)

        try {
            response.redirect('home')

        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error)

            // En cas d'erreur, redirige vers la page de connexion
            return response.status(500).redirect('singIn')
        }
    }

}
