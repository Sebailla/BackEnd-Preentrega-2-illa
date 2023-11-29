import { Router } from 'express'
import { getProductsServices } from '../services/products.js'
import { getCartByIdServices } from '../services/carts.js'

const router = Router()

router.get('/products', async (req, res) => {
    const result = await getProductsServices({...req.query})
    return res.render('products', {...result, title:'Productos'})
})

router.get('/realtimeproducts', (req, res) => {
    return res.render('realTimeProducts', { title: 'Productos en tiempo real' })
})

router.get('/chat', (req, res) => {
    return res.render('chat', { title: 'Chat Clientes' })
})

router.get('/carts/:cid', async (req, res) => {
    const {cid} = req.params
    console.log(cid)
    const cart = await getCartByIdServices(cid)
    
    return res.render('carts', { title: 'Carrito de Compras', cart })
})

router.get('*', (req, res) => {
    return res.render('404')
})

export default router

