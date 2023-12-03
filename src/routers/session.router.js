import { Router } from "express";
import UserModel from '../models/users.model.js'

const router = Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email, password })
    if (!user) return res.status(404).send('User not found')

    //cargamos la session 
    req.session.user = user

    return res.redirect('/products')
})

router.post('/register', async (req, res) => {
    const user = req.body
    await UserModel.create(user)
    return res.redirect('/login')
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



export default router