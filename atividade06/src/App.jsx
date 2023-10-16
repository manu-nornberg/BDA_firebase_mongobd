import React, { useState, useEffect } from "react";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const colletionRef = collection(db, "produtos");
  const [produtos, setProdutos] = useState([]);
  const [prod, setProd] = useState({
    nome: "",
    categoria: "",
    estoque: "",
    marca: "",
    descricao: "",
    preco: "",
  });
  const [prod2, setProd2] = useState({
    id: "",
    nome: "",
    categoria: "",
    estoque: "",
    marca: "",
    descricao: "",
    preco: "",
  });

  useEffect(() => {
    loadProdutos();
  }, []);

  async function loadProdutos() {
    setProdutos([]);
    onSnapshot(colletionRef, (querySnapshot) => {
      const docs = querySnapshot.docs;
      if (!docs.length) throw Error("Empty data!");
      const data = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProdutos(data);
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(prod)
    setProd((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleChange2(event) {
    setProd2({...prod2, [event.target.name] : event.target.value})
  }

  async function AddProduto(event) {
    event.preventDefault();
    const docRef = await addDoc(colletionRef, prod)
    setProd({})
  }

  async function deletaProduto(produtoId) {
    event.preventDefault()
    await deleteDoc(doc(db, "produtos", produtoId));
    console.log("Produto deletado com sucesso!!!");
  }

  function atualizaProduto(produtoId) {
    event.preventDefault()
    const produtoParaAtualizar = produtos.find(
      (produto) => produto.id === produtoId
      );
      
      console.log(produtoParaAtualizar);
    
    if (produtoParaAtualizar) {
      setProd2({
        id: produtoParaAtualizar.id,
        nome: produtoParaAtualizar.nome,
        categoria: produtoParaAtualizar.categoria,
        estoque: produtoParaAtualizar.estoque,
        marca: produtoParaAtualizar.marca,
        descricao: produtoParaAtualizar.descricao,
        preco: produtoParaAtualizar.preco,
      });
    } else {
      console.error("Produto não encontrado.");
    }
  }


  async function updateProduto(produtoId) {
    event.preventDefault()
    try {
      await updateDoc(doc(db, "produtos", produtoId), {
          nome: prod2.nome,
          categoria: prod2.categoria,
          estoque: prod2.estoque,
          marca: prod2.marca,
          descricao: prod2.descricao,
          preco: prod2.preco,
        });
        console.log("Produto atualizado com sucesso!!!");
        setProd2(
          {
            id: "",
            nome: "",
            categoria: "",
            estoque: "",
            marca: "",
            descricao: "",
            preco: "",
          }
          )
          console.log(prod2)

    } catch (error) {
      console.error("Erro", error);
    }
  }

  return (
    <div class="container">
      <div class="cadastro">
        <h1>Cadastro de produtos:</h1>
        <form onSubmit={AddProduto}>
          <div>
            <label class="nome">Nome:</label>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              onChange={handleChange}
            />

            <label class="nome">Categoria:</label>
            <input
              type="text"
              placeholder="Categoria"
              name="categoria"
              onChange={handleChange}
            />

            <label class="nome">Estoque:</label>
            <input
              type="number"
              placeholder="Estoque"
              name="estoque"
              onChange={handleChange}
            />

            <label class="nome">Marca:</label>
            <input
              type="text"
              placeholder="Marca"
              name="marca"
              onChange={handleChange}
            />

            <label class="nome">Descrição:</label>
            <input
              type="text"
              placeholder="Descricao"
              name="descricao"
              onChange={handleChange}
            />

            <label class="nome">Preço:</label>
            <input
              type="number"
              placeholder="Preco"
              name="preco"
              onChange={handleChange}
            />

            <button type="submit">Cadastrar produto</button>
          </div>
        </form>

        <h1>Alteração de produtos:</h1>

        <form onSubmit={() => updateProduto(prod2.id)}>
          <label class="nome">Nome:</label>
          <input
            type="text"
            value={prod2.nome}
            name="nome"
            onChange={handleChange2}
          />
          <label class="nome">Categoria:</label>
          <input
            type="text"
            value={prod2.categoria}
            name="categoria"
            onChange={handleChange2}
          />
          <label class="nome">Estoque:</label>
          <input
            type="number"
            value={prod2.estoque}
            name="estoque"
            onChange={handleChange2}
          />
          <label class="nome">Marca:</label>
          <input
            type="text"
            value={prod2.marca}
            name="marca"
            onChange={handleChange2}
          />
          <label class="nome">Descrição:</label>
          <input
            type="text"
            value={prod2.descricao}
            name="descricao"
            onChange={handleChange2}
          />
          <label class="nome">Preço:</label>
          <input
            type="number"
            value={prod2.preco}
            name="preco"
            onChange={handleChange2}
          />

          <button type="submit">Alterar produto</button>
        </form>
      </div>
      <div class="lista">
        <h1>Lista de Produtos:</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th>Marca</th>
              <th>Descricao</th>
              <th>Preco</th>
              <th>Ação</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.estoque}</td>
                <td>{produto.marca}</td>
                <td>{produto.descricao}</td>
                <td>{produto.preco}</td>
                <td>
                  <button
                    class="botao-deletar"
                    onClick={() => {
                      deletaProduto(produto.id);
                    }}
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => {
                      atualizaProduto(produto.id);
                    }}
                  >
                    Atualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
