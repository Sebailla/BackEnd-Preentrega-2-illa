//Todo:        Conección a Mongoose

import mongoose from 'mongoose'

// URL and DB Name de conección

//const dbUrl = process.env.URL_MONGODB

//const dbUrl = 'mongodb://localhost:27017'
const dbUrl = 'mongodb+srv://sebastianilla77:146tagSUCdi2foy7@cluster-illa01.jgxrppm.mongodb.net/'
const dbName = 'ecommerce'

//Conección a BD
export const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl, { dbName: dbName })
    console.log('DB conectada satifactoriamente')
  } catch (error) {
    console.log('Error de coneccion a Datos: ' + err)
    process.exit(1)
  }
}
