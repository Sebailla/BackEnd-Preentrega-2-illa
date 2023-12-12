import { request, response } from "express";
import { getProductsServices } from '../services/products.js'
import { getCartByIdServices } from '../services/carts.js'

export const productsView = async (req = request, res = response) => {
    const user = req.session.user
    const result = await getProductsServices({ ...req.query })
    const isAuthenticated = req.session.user !== undefined

    return res.render('products', {user, ...result, title: 'Productos', isAuthenticated })
}

export const realTimeProductsView = async (req = request, res = response) => {
    const isAuthenticated = req.session.user !== undefined
    return res.render('realTimeProducts', { title: 'Productos en tiempo real', isAuthenticated })
}


export const cartIdView = async (req = request, res = response) => {
    const { cid } = req.params
    console.log(cid)
    const cart = await getCartByIdServices(cid)
    const isAuthenticated = req.session.user !== undefined
    return res.render('carts', { title: 'Carrito de Compras', cart, isAuthenticated })
}

export const chatView = async (req = request, res = response) => {
    const isAuthenticated = req.session.user !== undefined
    return res.render('chat', { title: 'Canal de Comunicacióm', isAuthenticated });
}

export const rootView = async (req = request, res = response) => {
    return res.redirect('/products')
}

export const loginView = async (req = request, res = response) => {
    if(req.session.user){
        return res.redirect('/products')
    }
    return res.render('login', { title: 'Login' })
}

export const registerView = async (req = request, res = response) => {
    return res.render('register', { title: 'Registro' })
}

export const logoutView = async (req = request, res = response) => {
    req.session.destroy(error => {
        if(error){
            return res.send('Error logout')
        }else {
            return res.redirect('/login') 
        }
    })
}