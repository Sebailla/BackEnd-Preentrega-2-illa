import { request, response } from 'express'

export const auth = (req = request, res = response, next) => {
    if (req.session?.user) {
        return next()
    }
    return res.redirect('/login')
}

export const admin = (req = request, res = response, next) => {
    if (req.session?.role === 'admin') {
        return next()
    }
    return res.redirect('/')
}

