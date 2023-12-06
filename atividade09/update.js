import { readFile } from 'fs/promises';
import { MongoClient } from 'mongodb';

const myDB = {
    server: '127.0.0.1',
    port: 27017,
}

const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try{
    await client.connect()
    if (client.db('admin').command({ "ping": 1 }))
        console.log({"Conectado!":client});
    else throw Error("Erro ao conectar ao banco");

    //update em produtos
    // const filter = {id_prod:111}
    // const produto = {
    //     preco: 5500
    // }

    // const colletion = client.db("atividade").collection("produtos")
    // const resultado = await colletion.updateOne(
    //     filter,
    //     {$set:produto}
    // );
    // console.log(resultado)

    

} catch (error) {
    console.log("ERROR")
    console.log(error)
}
finally {
    process.exit(0)
}