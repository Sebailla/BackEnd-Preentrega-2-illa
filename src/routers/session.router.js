import { Router } from "express";
import { postLogin, postLogout, postRegister } from "../controller/session.controller.js";


const router = Router()

router.post('/login', postLogin)
router.post('/register', postRegister)

//? Logout 

router.get('/logout', postLogout)

export default router