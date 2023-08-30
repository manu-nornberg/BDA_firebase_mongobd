import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    // console.log(db)//mostra informacoes da conexao(pode excluir)
    let count = 0;

    fb.onChildAdded(fb.ref(db, "produtos/"), (snapshot)=>{
        console.log(++count)
        console.table(snapshot.val())
        if (snapshot.key === ("-MwSzyJMlNDToTGtPuhc")){
            process.exit(0);
        }
    });

}).catch(err=>console.log(err))