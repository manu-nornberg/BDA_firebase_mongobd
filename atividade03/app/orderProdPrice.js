import * as fb from "firebase/database";
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{
    const consulta = fb.query(fb.ref(db, "produtos/"),fb.orderByChild("preco"));
    fb.onValue(consulta, dados => {
      const produtos = dados.val();
      const produtosArray = Object.keys(produtos).map(key => ({
        id: key,
        ...produtos[key]
      }));
      produtosArray.sort((a, b) => a.preco - b.preco);

      console.log(produtosArray);

    });
}).catch(err => console.log(err));
