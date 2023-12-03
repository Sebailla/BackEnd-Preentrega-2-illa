// Todo:    SERVICIOS

import cartsModel from "../models/carts.model.js"

export const getCartsServices = async () => {
    try {
        return await cartsModel.find()
    } catch (error) {
        console.log('Error en getCartsServices:', error)
        throw error
    }
}

export const getCartByIdServices = async (cid) => {
    try {
        return await cartsModel.findById(cid).populate('products.id').lean().exec()
    } catch (error) {
        console.log('Error en getCartByIdServices:', error)
        throw error
    }
}

export const addCartsServices = async () => {
    try {
        return await cartsModel.create({})
    } catch (error) {
        console.log('Error en addCartsServices:', error)
        throw error
    }
}

export const addProductsToCartServices = async (cid, pid) => {
    try {
        const result = await cartsModel.findById(cid)
        if (!result) {
            return null
        } else {
            const producyInCart = result.products.find(p => p.id.toString() === pid)
            if (producyInCart) {
                producyInCart.quantity++
            } else {
                result.products.push({ id: pid, quantity: 1 })
            }
            result.save()

            return result
        }
    } catch (error) {
        console.log('Error en addProductsToCartServices:', error)
        throw error
    }
}

export const updateProductInCartServices = async (cid, pid, quantity) => {
    try {
        return await cartsModel.findOneAndUpdate(
            { _id: cid, 'products.id': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        )
    } catch (error) {
        console.log('Error en updateProductInCartServices:', error)
        throw error
    }
}

export const deleteProductInCartServices = async (cid, pid) => {
    try {
        return await cartsModel.findByIdAndUpdate(cid, { $pull: { 'products': { id: pid } } }, { new: true })
    } catch (error) {
        console.log('Error en deleteProductInCartServices:', error)
        throw error
    }
}

export const deleteCartServices = async (cid) => {
    try {
        return await cartsModel.findByIdAndUpdate(cid, { $set: { 'products': [] } }, { new: true })
    } catch (error) {
        console.log('Error en deleteCart:', error)
        throw error
    }
}