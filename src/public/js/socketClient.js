// Establecemos conección con e server websocket
const socket = io()

socket.on('connection', () => {
  console.log('Cliente conectado')
})

socket.on('disconnect', () => {
  console.log('Cliente sin conección')
})

// Cargamos lod productos a la tabla
socket.on('getProducts', (dataProducts) => {

  console.table(dataProducts)

  const tbody = document.querySelector('.productsTable tbody')
  tbody.innerHTML = ''

  dataProducts.forEach( p => {

    const row = document.createElement('tr')
    row.innerHTML =
      `
      <td>${p._id}</td>
      <td><img src="${p.thumbnail}" alt="${p.title}" width="50" height="100"></td>
      <td>${p.title}</td>
      <td>${p.description}</td>
      <td> $ ${p.price}</td>
      <td>${p.stock}</td>
      <td>${p.status ? 'Activo' : 'Desactivdo'}</td>
      <td>
      <button type="button" class="btn btn-outline-info btnDeleteProduct" data-id="${p._id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
          </svg>
      </button>
      </td>
      `
    tbody.appendChild(row)

    //Boton delete product
    const btnDeleteProduct = row.querySelector('.btnDeleteProduct')
    btnDeleteProduct.addEventListener('click', () => {
      const productId = btnDeleteProduct.dataset._id
      socket.emit('getProducts', productId)
    })
  })
  //----------------------------------------------------------------
  // Metodo post

  document.querySelector('.btnAddProduct').addEventListener('click', () => {

    // Recopilar los valores de los campos en un JSON
    const productData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      thumbnail: document.getElementById("thumbnail").value,
      code: document.getElementById("code").value,
      stock: document.getElementById("stock").value,
      category: document.getElementById("category").value
    }

    if (productData.title === "" || productData.description === "" || productData.price === "" || productData.code === "" || productData.stock === "" || productData.category === "") {
      alert('Debe llenar todo los campos del Producto: ' + productData.title)
    } else {

      // Enviar los datos al servidor
      fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
    }
    formAddProduct.reset()
  })
})

