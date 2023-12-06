import { readFile } from 'fs/promises';
import { MongoClient } from 'mongodb';

const myDB = {
    server: '127.0.0.1',
    port: 27017,
}

const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try {
    await client.connect()
    if (client.db('admin').command({ "ping": 1 }))
        console.log({"Conectado!":client});
    else throw Error("Erro ao conectar ao banco");

    const jsonFile = await readFile('./produtos.json')
    const produtos = JSON.parse(jsonFile);

    //inserindo varios documentos de uma vez só no banco loja na coleção produtos
    const result = await client.db('atividade')
        .collection('produtos')
        .insertMany(produtos)


    result?.acknowledged && console.log("Produto inserido!!")

    console.log(result)

} catch (error) {
    console.log("ERROR")
    console.log(error)
}
finally {
    process.exit(0)
}