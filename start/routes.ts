/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from '#controllers/users_controller'
import AuthController from "#controllers/auths_controller"; // Import direct

const urls = () => import('#controllers/urls_controller')
const auth = () => import('#controllers/users_controller')
const auths = () => import('#controllers/auths_controller')

// Define your routes here
router.on('/').render('pages/singIn').as('singIn')

router.on('/pages/home').render('pages/home').as('home').use(middleware.auth())

router.get('/pages/login', async ({ view }) => view.render('pages/login')).as('login')

router.post('/url', [urls, 'generate'])
router.get('pages/goToUrl', [urls, 'showUrls']).as('goToUrl')

router.post('/singIn', [auth, 'singIn']).as('singIN')
router.post('/login', [AuthController, 'authss']).as('good') // Correction ici
