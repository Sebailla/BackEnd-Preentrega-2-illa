import { request, response } from 'express'

export const isSessionActive = (req = request, res = response, next) => {
    if (req.session?.user) {
        return res.redirect('/products')
    }
    return next()
}