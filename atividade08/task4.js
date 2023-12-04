
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

    const resultado = await client.db('shop').collection('produtos').find({
        desconto: {$exists: true}
    },{
            sort:{desconto:-1},
            projection:{
                _id: 0,
                nome: 1,
                preco: 1,
                qtd_estoque: 1
            }
        }).toArray()
        console.table(resultado)

}catch(e){
    console.log(e)
} finally {
    await client.close();
    process.exit(0)
}