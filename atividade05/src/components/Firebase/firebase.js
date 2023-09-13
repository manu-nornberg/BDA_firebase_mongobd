import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification
} from 'firebase/auth';
import {
    getDatabase, ref, set
} from "firebase/database"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {

    constructor() {
        this.app = initializeApp(firebaseConfig)
        this.db = getDatabase(this.app)
        this.auth = getAuth();
        this.isLogged = false;
        this.credentials = null;
    }

    // *** AUTH API *** <- q fofo
    async doCreateUserWithEmailAndPassword(email, password) {
        try {
           const credencial = await createUserWithEmailAndPassword(this.auth, email, password);
           const user = credencial.user;
           await sendEmailVerification(user);
           
           const userRef = ref(this.db, `users/${user.uid}`);

           const userData = {
                email: user.email
    
           }

           await set(userRef, userData);
           
           alert("Usuario criado, verifique seu email:", user.email)
           
           return user;

        } catch (error) {
            alert("Erro")
            console.error(error.message)
            throw error;
        }
    }

    async doSignInWithEmailAndPassword(email, password) {
        try {
           const logado = await signInWithEmailAndPassword(this.auth, email, password);
           this.credentials = logado;
           this.isLogged = true;
           alert("Usuario logado! Eba")
           return logado.user;

        } catch (error) {
            alert("Deu erro meu chapa")
            console.error(error.message)
            throw error;
        }
    }

    async doSignOut (){
        try{
            await signOut(this.auth);
            alert("Usuario deslogado");

        }catch(error){
            console.error("Erro ao fazer logout:", error.message);
            throw error;
        }
    };
}

export default Firebase;
