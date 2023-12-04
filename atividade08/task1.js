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
        console.log({ "Conectado!" });
    else throw Error("Erro ao conectar ao banco");

    const produto = {
        id_prod: 1,
        nome: "n sei",
        descricao: "n sei",
        importado: true,
        preco: 150,
        estoque: 20
    }

    const result = await client.db('loja')
        .collection('produtos')
        .insertOne(produto)
    console.log(result.acknowledged && 'Deu bom!!')

}catch(e){
    console.log(e)
} finally {
    await client.close();
    process.exit(0)
}