import { Router } from "express";
import { postLogin, postLogout, postRegister } from "../controller/session.controller.js";
import passport from "passport";


const router = Router()

//router.post('/login', postLogin)
router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/login' }),
    postLogin
)

router.post('/register',
    passport.authenticate('register', { failureRedirect: '/register' }),
    postRegister
)

//? Logout 

router.get('/logout', postLogout)

export default router