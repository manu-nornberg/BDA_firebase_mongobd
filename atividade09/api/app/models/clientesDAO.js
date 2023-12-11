import { client, db } from '../../database/connection.js'

const collection = client.db(db).collection('clientes')

const getAllCliente = async (orderBy = 'id_cliente', reverse = false) => {
    try {
        let resultados = []
        let opcoes = {
            sort: { [orderBy]: !reverse ? 1 : -1 },
            projection: { _id: 0 }
        }
        console.log({ orderBy, opcoes })
        resultados = await collection.find({}, opcoes).toArray()
        return resultados;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const getClienteById = async (id_cliente) => {
    try {
        let cliente = {}
        let filtro = { id_cliente: +id_cliente }
        let opcoes = { projection: { _id: 0 } }
        console.log('aaaaa',{ id: +id_cliente })

        cliente = await collection.findOne(filtro, opcoes)
        if (!cliente)
            throw new Error(`cliente com ID:${id_cliente} não encontrado!!`)
        return cliente;
    } catch (error) {
        console.log(error) 
        return false;
    }
}

const insertCliente = async (cliente) => {
    try {
        const result = await collection.insertOne(cliente)
        console.log(result.acknowledged && {
            mensagem: 'cliente Inserido!!!',
            cliente: cliente
        })
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}

const updateCliente = async (new_cliente) => {
    try {
        const result = await collection.updateOne(
            { id_cliente: new_cliente.id_cliente },
            { $set: new_cliente }
        )
        console.log({
            result: result,
            updated: result.modifiedCount > 0,
            cliente: new_cliente
        })
        if (result.modifiedCount) return true
        else throw new Error('DAO: Erro ao atualizar cliente!')
    } catch (error) {
        console.log(error)
        return false;
    }
}

const deleteCliente = async (id_cliente) => {
    try {
        const result = await collection.deleteOne({ id_cliente: id_cliente })
        console.log({
            result: result,
            deleted: result.deletedCount > 0,
        })
        return result.deletedCount === 1
    } catch (error) {
        console.log(error)
        return false;
    }
}

const getFilteredCliente = async (field = 'nome', term = '') => {
    try {
        let resultados = []
        console.log({ field, term })
        await changeIndexes(field);

        let filtro = {
            $text: { $search: term }
        }
        let opcoes = {
            projection: { _id: 0 }
        }
        console.log(opcoes)
        resultados = await collection.find(filtro, opcoes).toArray()
        return resultados;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const changeIndexes = async (field) => {

    const indexes = await collection.indexes()
    const textIndexes = indexes.filter(index => index.key?._fts === 'text')
    const indexName = textIndexes[0]?.name

    if (!indexName || indexName !== field + '_text') {
        if (indexName)
            await collection.dropIndex(indexName)
        
        await collection.createIndex({ [field]: 'text' })
    }
}


export {
    getAllCliente,
    getClienteById,
    insertCliente,
    updateCliente,
    deleteCliente,
    getFilteredCliente
}