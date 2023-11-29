import fs from 'fs'
import ProductManager from './productManager.js'

class Cart {

  // Variables privadas
  static id;
  #path

  constructor() {
    this.#path = './cart.json'
    this.cart = this.#readFile()
    Cart.id = this.cart.length > 0 ? this.cart[this.cart.length - 1].id : 0
    this.products = new ProductManager('./products.json')
  }

  #readFile() {
    let info
    try {
      if (fs.existsSync(this.#path)) {
        const data = fs.readFileSync(this.#path, 'utf8')
        return JSON.parse(data)
      } else {
        return []
      }
    } catch (error) {
      return info = 'La base de datos no se puedo leer'
    }
  }

  createCart() {
    let info
    try {
      const newCart = {
        id: ++Cart.id,
        products: []
      }
      this.cart.push(newCart)
      fs.writeFileSync(this.#path, JSON.stringify(this.cart))
      console.log(JSON.stringify(this.cart))
      return info = "Se creo un nuevo Carrito..."
    } catch (error) {
      return info = 'Error al crear Cart'
    }
    return info
  }

  getCarts() {
    return this.cart;
  }

  getCartById(id) {
    const cartId = this.cart.find(c => c.id === id)
    return cartId ? cartId : `El Carrito con Id: ${id}, no existe`
  }

  addProductoToCart(cid, pid) {

    try {
      let info

      const indexCart = this.cart.findIndex(c => c.id === cid)
      const indexProduct = this.products.getProductById(pid)

      if (indexCart != -1 && indexProduct) {

        const verifyExistProd = this.cart[indexCart].products.findIndex(p => p.id === pid)

        if (verifyExistProd != -1) {

          this.cart[indexCart].products[verifyExistProd].quantity = this.cart[indexCart].products[verifyExistProd].quantity +1

        } else {

          const addCartProduct = {
            id: pid,
            quantity: 1
          }

          this.cart[indexCart].products.push(addCartProduct)
        }

        fs.writeFileSync(this.#path, JSON.stringify(this.cart))

        info = `El producto con ID: ${pid}, se agregó corectamente`
      } else {
        info = { info: 'No existe Carrito y/o Producto' }
      }

      return info

    } catch (error) {
      console.log(error)
    }
  }

}

export default Cart