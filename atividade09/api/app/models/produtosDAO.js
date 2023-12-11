import { client, db } from '../../database/connection.js'

const collection = client.db(db).collection('produtos')

const getAllProdutos = async (orderBy = 'id_prod', reverse = false) => {
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

const getProdutoById = async (idProd) => {
    try {
        let produto = {}
        let filtro = { id_prod: +idProd }
        let opcoes = { projection: { _id: 0 } }
        console.log('aaaaa',{ id: +idProd })

        produto = await collection.findOne(filtro, opcoes)
        if (!produto)
            throw new Error(`Produto com ID:${idProd} não encontrado!!`)
        return produto;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const insertProduto = async (produto) => {
    try {
        const result = await collection.insertOne(produto)
        console.log(result.acknowledged && {
            mensagem: 'Produto Inserido!!!',
            produto: produto
        })
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}

const updateProduto = async (new_produto) => {
    try {
        const result = await collection.updateOne(
            { id_prod: new_produto.id_prod },
            { $set: new_produto }
        )
        console.log({
            result: result,
            updated: result.modifiedCount > 0,
            produto: new_produto
        })
        if (result.modifiedCount) return true
        else throw new Error('DAO: Erro ao atualizar produto!')
    } catch (error) {
        console.log(error)
        return false;
    }
}

const deleteProduto = async (id_prod) => {
    try {
        const result = await collection.deleteOne({ id_prod: id_prod })
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

const getFilteredProdutos = async (field = 'descricao', term = '') => {
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

const PriceRange = async (min = 0, max = 0, sort = 1) => {
    try {
        let resultados = []
        console.log({ min, max })
        let filtro = {
            $and: [
                { preco: { $gte: min } },
                { preco: { $lte: max } }
            ]
        }
        let opcoes = {
            sort: { preco: parseInt(sort) },
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


export {
    getAllProdutos,
    getProdutoById,
    insertProduto,
    updateProduto,
    deleteProduto,
    getFilteredProdutos,
    PriceRange
}