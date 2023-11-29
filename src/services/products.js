import ProductsModel from '../dao/models/products.model.js'

// Todo:    SERVICIOS

export const getProductsServices = async ({ limit, page, query, sort }) => {

    try {

        limit = parseInt(limit ?? 10)
        page = parseInt(page ?? 1)
        query = query ?? ''
        sort = sort ?? ''

        const search = {}
        if (query) search.title = { '$regex': query, '$options': 'i' }

        const options = {
            page: page,
            limit: limit,
            lean: true,
            sort: {}
        }

        if (sort) {
            options.sort.price = sort === 'asc' ? 1 : -1
        }

        const result = await ProductsModel.paginate(search, options)

        result.payload = result.docs
        result.query = ''
        delete result.docs

        return result

    } catch (error) {
        console.log('Error getProductServices ' + error)
        throw error
    }
}

export const getProductByIdServices = async (pid) => {
    try {
        return await ProductsModel.findById(pid)
    } catch (error) {
        console.log('Error en getProductByIdServices:', error)
        throw error
    }
}

export const addProductServices = async ({ title, description, price, thumbnail, code, stock, category, status }) => {
    try {
        return await ProductsModel.create({ title, description, price, thumbnail, code, stock, category, status })
    }catch (error) {
    console.log('Error en addProductServices:', error)
    throw error
}
}

export const updateProductServices = async (pid, rest) => {
    try {
        return await ProductsModel.findByIdAndUpdate(pid, { ...rest }, { new: true })
    } catch (error) {
        console.log('Error en updateProductServices:', error)
        throw error
    }
}

export const deleteProductServices = async (pid) => {
    try {
        return await ProductsModel.findByIdAndDelete(pid)
    } catch (error) {
        console.log('Error en deleteProductServices:', error)
        throw error
    }
}


