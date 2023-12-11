import {
    index,
    show,
    store,
    update,
    remove,
    filterPreco
} from '../app/controllers/produto.js'
import { Router } from 'express'

const routes = Router();
routes.get('/', index)
routes.get('/filter_preco/', filterPreco)
routes.get('/:id', show)
routes.post('/', store)
routes.put('/:id', update)
routes.delete('/:id', remove)


export default routes;