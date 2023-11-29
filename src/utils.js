// nos permite tomar la ruta absoluta de un archivo
import {fileURLToPath} from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname