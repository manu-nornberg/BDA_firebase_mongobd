import { client, db } from '../../database/connection.js'

const collection = client.db(db).collection('enderecos')

const getAllEndereco = async (orderBy = 'id_endereco', reverse = false) => {
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

const getEnderecoById = async (id_endereco) => {
    try {
        let endereco = {}
        let filtro = { id_endereco: +id_endereco }
        let opcoes = { projection: { _id: 0 } }
        console.log('aaaaa',{ id: +id_endereco })

        endereco = await collection.findOne(filtro, opcoes)
        if (!endereco)
            throw new Error(`endereco com ID:${id_endereco} não encontrado!!`)
        return endereco;
    } catch (error) {
        console.log(error) 
        return false;
    }
}

const getEnderecoByIdC = async (id_cliente) => {
    try {
        let filtro = { id_cliente: +id_cliente }
        let opcoes = { projection: { _id: 0 } }
        console.log('aaaaa',{ id: +id_cliente })

        const enderecosC = await collection.find(filtro, opcoes).toArray();

        if (enderecosC.length === 0) {
            throw new Error(`Endereços com ID de cliente:${id_cliente} não encontrados!!`);
        }
        return enderecosC;
    } catch (error) {
        console.log(error) 
        return false;
    }
}

const insertEndereco = async (endereco) => {
    try {
        const result = await collection.insertOne(endereco)
        console.log(result.acknowledged && {
            mensagem: 'endereco Inserido!!!',
            endereco: endereco
        })
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}

const updateEndereco = async (new_endereco) => {
    try {
        const result = await collection.updateOne(
            { id_endereco: new_endereco.id_endereco },
            { $set: new_endereco }
        )
        console.log({
            result: result,
            updated: result.modifiedCount > 0,
            endereco: new_endereco
        })
        if (result.modifiedCount) return true
        else throw new Error('DAO: Erro ao atualizar endereco!')
    } catch (error) {
        console.log(error)
        return false;
    }
}

const deleteEndereco = async (id_endereco) => {
    try {
        const result = await collection.deleteOne({ id_endereco: id_endereco })
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

const getFilteredEndereco = async (field = 'rua', term = '') => {
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
    getAllEndereco,
    getEnderecoById,
    insertEndereco,
    updateEndereco,
    deleteEndereco,
    getFilteredEndereco,
    getEnderecoByIdC
}