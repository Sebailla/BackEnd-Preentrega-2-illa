import { request, response } from "express";
import { getUserEmail, registerUser } from "../services/users.js"
import Swal from "sweetalert2"


export const postLogin = async (req = request, res = response) => {
    const { email, password } = req.body
    const user = await getUserEmail(email)

    if (user && user.password === password) {
        req.session.user = user
        req.session.role = user.role
        return res.redirect('/products')
    } else {
        return res.redirect('/register')
    }
}

export const postRegister = async (req = request, res = response) => {
    const user = await registerUser({ ...req.body })
    if (user) {

        req.session.user = user
        req.session.role = user.role
        return res.redirect('/login')
    } else {
        alert('Register error')
        return res.redirect('/register')
    }

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
