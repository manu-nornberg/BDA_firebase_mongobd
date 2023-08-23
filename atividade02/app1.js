import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Qvh5ZH3E9H-boJIcklIG4CdF5Ej3U44",
  authDomain: "bda-5sem.firebaseapp.com",
  databaseURL: "https://bda-5sem-default-rtdb.firebaseio.com",
  projectId: "bda-5sem",
  storageBucket: "bda-5sem.appspot.com",
  messagingSenderId: "600478851564",
  appId: "1:600478851564:web:aa14ade15a1ed69d73e0c9"
};


const app = initializeApp(firebaseConfig);
const banco = getDatabase();

const nodo = "clientes/"
const refe = ref(banco, nodo);
const novo={
    nome: "Carlos",
    idade: "50" 
}

push(refe, novo)
    .then(() => {
        console.log("adicionou eee")
        process.exit(0)
    })
    .catch(error=>console.log("Erro" + error))