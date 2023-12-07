import passport from 'passport'
import local from 'passport-local'
import UserModel from '../models/users.model.js'
import { createHash, isValidPassword } from '../utils.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    //? Estrategia de Registro

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameFiel: 'email'
        },
        async (req, username, password, done) => {
            const { name, email } = req.body
            try {
                const user = await UserModel.findOne({ email: username })
                if (user) {
                    console.log('User already exits')
                    return done(null, false)
                }
                const newUser = {
                    name,
                    email,
                    password: createHash(password)
                }
                const result = await UserModel.create(newUser)
                return done(null, result)

            } catch (error) {
                done('Error to register', error)
            }
        }))

    //? Estrategia de Login

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username}).lean().exec()
                if(!user){
                    console.error('User dont exist', username)
                    return done(null, false)
                }
                if(!isValidPassword(user,password)){
                    console.error('Invalid password')
                    return doen (null, false)
                }
                return done(null, user)

            } catch (error) {
                return done('Error login', error);
            }
        }))

    //? Serialization and Descerialization Users

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
