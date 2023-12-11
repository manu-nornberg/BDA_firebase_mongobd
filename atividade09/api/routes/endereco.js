import {
    index,
    show,
    showCliente,
    store,
    update,
    remove,
} from '../app/controllers/endereco.js'
import { Router } from 'express'

const routesEndereco = Router();
routesEndereco.get('/', index)
routesEndereco.get('/:id', show)
routesEndereco.get('/bycliente/:id', showCliente)
routesEndereco.post('/', store)
routesEndereco.put('/:id', update)
routesEndereco.delete('/:id', remove)


export default routesEndereco;