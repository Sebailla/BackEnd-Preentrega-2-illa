import passport from 'passport'
import local from 'passport-local'
import UserModel from '../models/users.model.js'
import { createHash, isValidPassword } from '../utils.js'
import { getUserEmail, registerUser } from '../services/users.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    //? Estrategia de Registro

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameFiel: 'email'
        },
        async (req, username, password, done) => {
            try {
                const user = await getUserEmail(username)
                if (user) {
                    console.log('El Usuario ya existe')
                    return done(null, false)
                }

                req.body.password = createHash(password)

                const newUser = await registerUser({...req.body})
                if(newUser){
                    return done(null, newUser)
                }
                return done (null, false)

            } catch (error) {
                console.log(error)
                done(error)
            }
        }
    ))

    //? Estrategia de Login

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username }).lean().exec()
                if (!user) {
                    console.error('User dont exist', username)
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) {
                    console.error('Invalid password')
                    return doen(null, false)
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
