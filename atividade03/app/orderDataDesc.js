import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    const produtosRef = fb.ref(db, 'produtos/');
    const consulta = fb.query(produtosRef, fb.orderByChild('nome'));
    fb.onValue(consulta, (dados) => {
        console.log (dados.key);
        
        const data = dados.val();
        const array = Object.entries(data);

        const arrayAocontrario = array.reverse();
        console.table(arrayAocontrario); 
    })
}).catch(err=>console.log(err))