import { Router } from 'express'
import { getProductsServices } from '../services/products.js'
import { getCartByIdServices } from '../services/carts.js'

//?  Midleware
import { auth } from '../middleware/auth.js'
import { isSessionActive } from '../middleware/isSessionActive.js'

const router = Router()

//?  Routs Renders

router.get('/', [isSessionActive], (req, res) => {
    return res.redirect('/products')
})

router.get('/login', [isSessionActive], (req, res) => {
    return res.render('login', { title: 'Login' })
})

router.get('/register', [isSessionActive], (req, res) => {
    return res.render('register', { title: 'Registro' })
})

//? Logout 

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error){
            return res.send('Error logout')
        }else {
            return res.redirect('/login') 
        }
    })
})

//? Router products

router.get('/products', [auth], async (req, res) => {
    const user = req.session.user
    const result = await getProductsServices({ ...req.query })
    const isAuthenticated = req.session.user !== undefined

    return res.render('products', {user, ...result, title: 'Productos', isAuthenticated })
})

router.get('/realtimeproducts', [auth], (req, res) => {
    const isAuthenticated = req.session.user !== undefined
    return res.render('realTimeProducts', { title: 'Productos en tiempo real', isAuthenticated })
})

router.get('/carts/:cid',[auth], async (req, res) => {
    const { cid } = req.params
    console.log(cid)
    const cart = await getCartByIdServices(cid)
    const isAuthenticated = req.session.user !== undefined

    return res.render('carts', { title: 'Carrito de Compras', cart, isAuthenticated })
})

router.get('/chat', (req, res) => {
    return res.render('chat', { title: 'Canal de Comunicacióm' })
})


router.get('*', (req, res) => {
    return res.render('404')
})

export default router

