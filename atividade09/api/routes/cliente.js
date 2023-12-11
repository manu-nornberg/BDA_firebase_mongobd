import {
    index,
    show,
    store,
    update,
    remove
} from '../app/controllers/cliente.js'
import { Router } from 'express'

const routesCliente = Router();
routesCliente.get('/', index)
routesCliente.get('/:id', show)
routesCliente.post('/', store)
routesCliente.put('/:id', update)
routesCliente.delete('/:id', remove)


export default routesCliente;