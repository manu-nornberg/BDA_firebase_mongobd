import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    // console.log(db) mostra informacoes da conexao(pode excluir)
    //implementar usando get()
    const dbRef =fb.ref(db);
    fb.get(fb.child(dbRef, `produtos/`)).then((snapshot) => {
        if (snapshot.exists()){
            console.table(snapshot.val())

        }else {
            console.log("Dados não encontrados");
        }
        process.exit();

    }).catch((error)=>{
        console.error(error);
        process.exit();
    })
}).catch(err=>console.log(err))