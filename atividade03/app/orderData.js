import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    // console.log(db)//mostra informacoes da conexao(pode excluir)
    const consulta = fb.query(fb.ref(db,'produtos/'),fb.orderByChild('descricao'))
    fb.onChildAdded(consulta,dados=>{
        console.log(dados.val())
    })
}).catch(err=>console.log(err))