import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import productsRouter from './routers/products.js'
import cartRouter from './routers/cart.js'
import viewsRouter from './routers/views.js'
import { dbConnection } from './db/config.js'
import chatModel from './dao/models/chat.model.js'
import 'dotEnv/config'
import { addProductServices, getProductsServices } from './services/products.js'


const app = express()

app.use(express.static((__dirname + '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// views
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Router Products
app.use('/api/products', productsRouter)

// Router Cart 
app.use('/api/cart', cartRouter)

//Routers Views
app.use('/', viewsRouter)

await dbConnection()
// Express Server
const httpServer = app.listen(8080, () => console.log('listening on port 8080 ...'))

// WebSocket Server
const io = new Server(httpServer)

//?  WebSocket connection
//-------------------------------------------------
io.on('connection', async (socket) => {

    console.log('New Client connected on front')

    socket.on('disconnect', () => {
        console.log('Cliente sin conección')
    })

    //? Productos
    // Enviamos productos al Cliente
    const {payload} = await getProductsServices({limit: 10000})
    const products = payload
    socket.emit('getProducts', payload)

    // Agregamos productos
    socket.on('postProducts', async (productData) => {
        const newProduct = await addProductServices({ ...productData })
        if (newProduct) {
            products.push(newProduct)
            socket.emit('postProducts', products)
        }

    })


    //? Chat

    const messages = await chatModel.find();
    socket.emit('message', messages);

    socket.on('message', async(data) => {
        const newMessage = await chatModel.create({...data}); 
        if(newMessage){
            const messages = await chatModel.find();
            io.emit('messageLogs', messages)
        }
    });

    socket.broadcast.emit('newUser');
})




