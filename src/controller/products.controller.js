import { request, response } from "express"
import { addProductServices, deleteProductServices, getProductByIdServices, getProductsServices, updateProductServices } from "../services/products.js"

//Todo:       CONTROLADORES

export const getProducts = async (req = request, res = response) => {
    try {
        const result = await getProductsServices({ ...req.query })
        return res.json({ result })
    } catch (error) {
        return res.status(500).json({ status: 'Error en servidor' })
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const result = await getProductByIdServices(pid)
        if (result) {
            return res.json({ result })
        } else {
            return res.status(404).json({ msg: `El producto con ID: ${pid}, no está en existencia` })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, price, thumbnail, code, stock, category, status } = req.body
        if (!title, !description, !price, !code, !stock, !category) {
            return res.status(404).json({ msg: 'Faltan Campos Obligatorios' })
        } else {
            const result = await addProductServices({ ...req.body })
            return res.json({ result })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const { _id, ...rest } = req.body
        const result = await updateProductServices(pid, rest)
        if (result) {
            return res.json({ msg: 'Producto actualizado correctamente', result })
        } else {
            return res.status(404).json({ msg: `El producto con Id: ${pid}, no se pudo actualizar` })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const result = await deleteProductServices(pid)        
        if (result) {
            return res.json({ msg: 'Producto eliminado correctamente', result })
        } else {
            return res.status(404).json({ msg: `El producto con Id: ${pid}, no se pudo eliminar` })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

