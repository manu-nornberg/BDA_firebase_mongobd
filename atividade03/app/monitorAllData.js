import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    // console.log(db)//mostra informacoes da conexao(pode excluir)


    fb.onValue(fb.ref(db, "produtos/"), (snapshot)=>{
        console.table(snapshot.val())
    });
}).catch(err=>console.log(err))