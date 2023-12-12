import { request, response } from "express"
import { addCartsServices, addProductsToCartServices, deleteCartServices, deleteProductInCartServices, getCartByIdServices, getCartsServices, updateProductInCartServices } from "../services/carts.js"

//Todo:        CONTROLADORES

export const getCarts = async (req = request, res = response) => {
    try {
        const result = await getCartsServices()
        return res.json({ result })
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params
        const result = await getCartByIdServices(cid)
        if (!result) {
            return res.status(404).json({ msg: `El pedido con ID: ${cid}, no existe` })
        } else {
            return res.json({ result })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const addCart = async (req = request, res = response) => {
    try {
        const result = await addCartsServices()
        return res.json({ msg: 'Pedido creado correctamente', result })
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const addProductsToCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params
        const result = await addProductsToCartServices(cid, pid)
        return res.json({ msg: `El pedido con ID: ${cid}, se actualizo correctamente`, result })
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const updateProductInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        if (!quantity || !Number.isInteger(quantity))
            return res.status(404).json({ msg: 'La cantidad debe ser un número' })
        const cart = await updateProductInCartServices(cid, pid, quantity)
        if (!cart) {
            return res.status(404).json({ msg: `El pedido con Id: ${cid}, no se pudo actualizar` })
        } else {
            return res.json({ msg: 'Pedido Actializado correctamente', cart })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const deleteProductInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params
        const result = await deleteProductInCartServices(cid, pid)
        if (!result) {
            return res.status(400).json({ msg: 'Error al eliminar producto del pedido' })
        } else {
            return res.json({ msg: 'Producto eliminado', result })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const deleteCart = async (req = request, res = response) => {
    try {
        const { cid } = req.params
        const result = await deleteCartServices(cid)
        if (result) {
            return res.json({ msg: 'Pedido eliminado correctamente', result })
        } else {
            return res.status(404).json({ msg: `El pedido con Id: ${pid}, no se pudo eliminar` })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}