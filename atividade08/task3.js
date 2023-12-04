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
        console.log({ "Conectado!": client });
    else throw Error("Erro ao conectar ao banco");

    //pesquisa sem o _id, descricao e importado
    // const resultado = await client.db('shop').collection('produtos').find({},{
    //     projection:{
    //         _id: 0,
    //         nome: 1,
    //         preco: 1,
    //         qtd_estoque: 1
    //     }
    // }).toArray()
    // console.table(resultado)

    //pesquisa sem o _id, descricao e importado, ordenando pelo estoque
    // const resultado = await client.db('shop').collection('produtos').find({},{
    //     sort:{qtd_estoque:1},
    //     projection:{
    //         _id: 0,
    //         descricao: 0,
    //         importado: 0
    //     }
    // }).toArray()
    // console.table(resultado)

    //pesquisa sem o _id, descricao e importado, maiores que 10.000
    // const resultado = await client.db('shop').collection('produtos')
    //     .find({
    //         preco:{ $gt: 10000 }
    //     },
    //         {
    //             projection: {
    //                 _id: 0,
    //                 descricao: 0,
    //                 importado: 0
    //             }
    //         }).toArray()
    // console.table(resultado)

     //pesquisa sem o _id, descricao e importado, ordenando pelo estoque entre 100 e 500
    // const resultado = await client.db('shop').collection('produtos')
    //     .find({
    //         qtd_estoque:{ $gte: 100, $lte: 500 }
    //     },
    //         {
    //             sort:{qtd_estoque:1},
    //             projection: { 
    //                 _id: 0,
    //                 descricao: 0,
    //                 importado: 0
    //             }
    //         }).toArray()
    // console.table(resultado)

    //pesquisa dos importados por ordem de preco
    // const resultado = await client.db('shop').collection('produtos')
    //     .find({
    //         importado:{$eq: true}
    //     },
    //         {
    //             sort:{preco:1},
    //             projection: { 
    //                 _id: 0,
    //                 descricao: 0,
    //                 importado: 0
    //             }
    //         }).toArray()
    // console.table(resultado)

    //pesquisa dos nao importados e nao maiores de 10000
    // const resultado = await client.db('shop').collection('produtos')
    //     .find({
    //         importado:{$eq: 0},
    //         preco:{$lt: 10000}
    //     },
    //         {
    //             sort:{preco:1},
    //             projection: { 
    //                 _id: 0,
    //                 descricao: 0,
                    // importado: 0
    //             }
    //         }).toArray()
    // console.table(resultado)

    //pesquisa dos precos especificos
    // const resultado = await client.db('shop').collection('produtos')
    //     .find({
    //         preco:{$in: [200,3500,3750,1800] }
    //     },
    //         {
    //             projection: { 
    //                 _id: 0,
    //                 descricao: 0,
    //                 importado: 0
    //             }
    //         }).toArray()
    // console.table(resultado)
    
    //pesquisa do estoque não igual a 150
    // const resultado = await client.db('shop').collection('produtos')
    //     .find({
    //         qtd_estoque:{$ne: 150 }
    //     },
    //         {
    //             projection: { 
    //                 _id: 0,
    //                 descricao: 0,
    //                 importado: 0
    //             }
    //         }).toArray()
    // console.table(resultado)

} catch (e) {
    console.log(e)
} finally {
    await client.close();
    process.exit(0)
}