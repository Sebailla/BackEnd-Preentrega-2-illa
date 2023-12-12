import { request, response } from "express";
import { getUserEmail, registerUser } from "../services/users.js"

//import { isValidPassword } from "../utils.js";


export const postLogin = async (req = request, res = response) => {
    /* const { email, password } = req.body
    const user = await getUserEmail(email)

    if (!user) {
        return res.status(404).send('User not Found')
    }
    if (!isValidPassword(user, password)) {
        return res.status(404).send('Invalid password')
    } */
    if (!req.user) {
        return res.status(400).send('Invalid credentials')

    }

    req.session.user = req.user
    req.session.role = req.user.role
    return res.redirect('/products')
}

export const postRegister = async (req = request, res = response) => {
    
    /* const user = await registerUser({ ...req.body })
    if (user) {

        req.session.user = user
        req.session.role = user.role
        return res.redirect('/login')
    } else {
        alert('Register error')
        return res.redirect('/register')
    } */

    if(!req.user){
        console.log('error en postRegister')
        return res.redirect('/register')
    }

    return res.redirect('/login')

}


export const postLogout = async (req = request, res = response) => {
    req.session.destroy(error => {
        if (error) {
            return res.send('Error logout')
        } else {
            return res.redirect('/login')
        }
    })
}
