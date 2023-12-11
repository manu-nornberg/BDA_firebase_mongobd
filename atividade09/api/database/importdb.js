import { client, db } from './connection.js'
import { promises as fs } from 'fs'

try {

    const dataCli = await fs.readFile("./clientes.json")
    const dataProd = await fs.readFile("./produtos.json")
    const dataEnd = await fs.readFile("./enderecos.json")
    const produtos = JSON.parse(dataProd)
    const clientes = JSON.parse(dataCli)
    const enderecos = JSON.parse(dataEnd)

    if (!produtos) throw Error('Arquivo não encontrado!!')
    if (!clientes) throw Error('Arquivo não encontrado!!')
    if (!enderecos) throw Error('Arquivo não encontrado!!')

    const mongoDb0 = client.db('atividade')
    const mongoCollection0 = mongoDb0.collection('produtos')
    const result0 = await mongoCollection0.insertMany(produtos)
    const mongoDb1 = client.db('atividade')
    const mongoCollection1 = mongoDb1.collection('clientes')
    const result1 = await mongoCollection1.insertMany(clientes)
    const mongoDb2 = client.db('atividade')
    const mongoCollection2 = mongoDb2.collection('enderecos')
    const result2 = await mongoCollection2.insertMany(enderecos)

    if (result0.insertedCount == 0)
        throw Error('Erro ao importar produtos!')
    if (result1.insertedCount == 0)
        throw Error('Erro ao importar clientes!')
    if (result2.insertedCount == 0)
        throw Error('Erro ao importar enderecos!')

    console.info("Dados importados com sucesso!")
    console.log({
        "sucess": true,
        "inserted": result.insertedCount,
        "result": result
    })
} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}