import { Router } from 'express'

//?  Midleware
import { admin, auth } from '../middleware/auth.js'
import { isSessionActive } from '../middleware/isSessionActive.js'

//? Controlers
import { cartIdView, chatView, loginView, logoutView, productsView, realTimeProductsView, registerView, rootView } from '../controller/views.controller.js'

const router = Router()

//?  Routs Renders

router.get('/', [isSessionActive], rootView)
router.get('/login', [isSessionActive], loginView)
router.get('/register', [isSessionActive], registerView)

//? Logout 

router.get('/logout', logoutView)

//? Router products

router.get('/products', [auth], productsView)
router.get('/realtimeproducts', [auth, admin], realTimeProductsView)
router.get('/carts/:cid',[auth], cartIdView)
router.get('/chat', [auth], chatView)

router.get('*', (req, res) => {
    return res.render('404')
})

export default router

