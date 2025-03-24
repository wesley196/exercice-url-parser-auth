import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'


export default class UsersController {

  // Fonction pour s'inscrire
  public async singIn({ request, response }: HttpContext) {
    // Récupérer les données de l'utilisateur depuis la requête
    const user = request.only(['email', 'password'])

    if (!user) {
        response.redirect('singIn')
    }

    try {
      // Création de l'utilisateur dans la base de données
      const addUser = await User.create({
        email: user.email,
        password: user.password, // Le hashage est géré dans le hook du modèle
      })

      // Si l'utilisateur est ajouté avec succès, rediriger vers le tableau de bord
      return response.redirect('pages/login')

    } catch (error) {
      // Log l'erreur dans la console pour comprendre ce qui se passe
      console.error('Erreur lors de la création de l\'utilisateur:', error)

      // En cas d'erreur, redirige vers la page de connexion
      return response.status(500).redirect('login')
    }
  }
}
