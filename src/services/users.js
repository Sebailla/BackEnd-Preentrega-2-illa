import UserModel from '../models/users.model.js'
import { createHash } from '../utils.js'


export const getUserEmail = async (email) => {
    try {
        return await UserModel.findOne({ email })
    } catch (error) {
        console.log('Error en getUserEmail: ', error)
        throw error
    }
}

export const registerUser = async (user) => {
    try {
        user.password = createHash(user.password)
        return await UserModel.create({ ...user })
    } catch (error) {
        console.log('Error en registerUser: ', error)
        throw error
    }
}
