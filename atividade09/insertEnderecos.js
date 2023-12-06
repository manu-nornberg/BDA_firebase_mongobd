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

    const jsonFile = await readFile('./enderecos.json')
    const enderecos = JSON.parse(jsonFile);

    const result = await client.db('atividade')
        .collection('enderecos')
        .insertMany(enderecos)


    result?.acknowledged && console.log("enderecos inserido!!")

    console.log(result)

} catch (error) {
    console.log("ERROR")
    console.log(error)
}
finally {
    process.exit(0)
}