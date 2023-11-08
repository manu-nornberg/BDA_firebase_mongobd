import { doc, getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

const Componentex = ({ idfornecedor }) => {
  const [nome, setNome] = useState("");
  // console.log(idfornecedor)

  useEffect(() => {
    async function getNome() {
      try {
        const ok = await getFornecedores(idfornecedor);
        setNome(ok)
      } catch (error) {
        // console.error(error);
      }
    }

    getNome();
  }, [idfornecedor]);

  async function getFornecedores(documentId) {
    const docRef = doc(db, "fornecedores", documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().nome);
      return docSnap.data().nome;
    } else {
      console.log("Documento não encontrado");
      return null;
    }
  }

  return (
    <td>
      <p>{nome}</p>
    </td>
  );
};

export default Componentex;
