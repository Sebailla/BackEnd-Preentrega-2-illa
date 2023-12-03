import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import 'dotEnv/config'

import productsRouter from './routers/products.js'
import cartRouter from './routers/cart.js'
import viewsRouter from './routers/views.js'
import SessionRouter from './routers/session.router.js'
import { dbConnection } from './db/config.js'
import chatModel from './models/chat.model.js'
import { addProductServices, getProductsServices } from './services/products.js'



const app = express()
const DBurl = 'mongodb+srv://sebastianilla77:146tagSUCdi2foy7@cluster-illa01.jgxrppm.mongodb.net/'
const DBName = 'ecommerce'


app.use(express.static((__dirname + '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Conección an BD
await dbConnection()

// Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: DBurl,
        dbName: DBName
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// views
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Router 
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/api/session', SessionRouter)



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
    const { payload } = await getProductsServices({ limit: 10000 })
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

    socket.on('message', async (data) => {
        const newMessage = await chatModel.create({ ...data });
        if (newMessage) {
            const messages = await chatModel.find();
            io.emit('messageLogs', messages)
        }
    });

    socket.broadcast.emit('newUser');
})




