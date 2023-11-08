import { useState, useEffect } from "react";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import Componentex from "./componente";

const App = () => {
  const colletionRef = collection(db, "produtos");
  const colletionFor = collection(db, "fornecedores");
  const colletionDe = collection(db, "desejos");
  const [mostrar, setMostrar] = useState(false);
  const [mostrarD, setMostrarD] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [desejos, setDesejos] = useState([]);
  const [prod, setProd] = useState({
    nome: "",
    categoria: "",
    estoque: "",
    descricao: "",
    preco: "",
    fornecedor: "",
  });
  const [prod2, setProd2] = useState({
    id: "",
    nome: "",
    categoria: "",
    estoque: "",
    descricao: "",
    preco: "",
    fornecedor: "",
  });

  useEffect(() => {
    loadProdutos();
    fornecedorProduto();
    desejoProduto();
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
      // console.log(data);
      setProdutos(data);
    });
  }

  function fornecedorProduto() {
    onSnapshot(colletionFor, (querySnapshot) => {
      const docs = querySnapshot.docs;
      if (!docs.length) throw Error("Empty data!");
      const data = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFornecedores(data);
    });
  }

  function desejoProduto() {
    onSnapshot(colletionDe, (querySnapshot) => {
      const docs = querySnapshot.docs;
      if (!docs.length) throw Error("Empty data!");
      const data = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDesejos(data);
    });
  }

  async function adicionarProduto(prodId) {
    const prodRef = doc(colletionRef, prodId);
    const prodSnap = await getDoc(prodRef);
    if (prodSnap.exists()) {
      const produto = prodSnap.data();

      try {
        const lista = await addDoc(colletionDe, produto);
        setDesejos(lista);
        console.log(desejos);
        console.log("Produto adicionado à lista de desejos com sucesso.");
      } catch (error) {
        console.error("Erro ao adicionar produto à lista de desejos:", error);
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(prod);
    setProd((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleChange2(event) {
    setProd2({ ...prod2, [event.target.name]: event.target.value });
  }

  async function AddProduto(event) {
    event.preventDefault();
    console.log(prod);
    await addDoc(colletionRef, prod);
    setProd({});
  }

  async function deletaProduto(produtoId) {
    event.preventDefault();
    await deleteDoc(doc(db, "produtos", produtoId));
    console.log("Produto deletado com sucesso!!!");
  }

  async function deletaDesejo(desejoId) {
    event.preventDefault();
    await deleteDoc(doc(db, "desejos", desejoId));
    console.log("Produto deletado com sucesso!!!");
  }

  function atualizaProduto(produtoId) {
    event.preventDefault();
    const produtoParaAtualizar = produtos.find(
      (produto) => produto.id === produtoId
    );

    // console.log(produtoParaAtualizar);

    if (produtoParaAtualizar) {
      setProd2({
        id: produtoParaAtualizar.id,
        nome: produtoParaAtualizar.nome,
        categoria: produtoParaAtualizar.categoria,
        estoque: produtoParaAtualizar.estoque,
        descricao: produtoParaAtualizar.descricao,
        fornecedor: produtoParaAtualizar.fornecedor,
        preco: produtoParaAtualizar.preco,
      });
      console.log(prod2);
    } else {
      console.error("Produto não encontrado.");
    }
  }

  async function updateProduto(produtoId) {
    event.preventDefault();
    try {
      await updateDoc(doc(db, "produtos", produtoId), {
        nome: prod2.nome,
        categoria: prod2.categoria,
        estoque: prod2.estoque,
        descricao: prod2.descricao,
        fornecedor: prod2.fornecedor,
        preco: prod2.preco,
      });
      console.log("Produto atualizado com sucesso!!!");
      setProd2({
        id: "",
        nome: "",
        categoria: "",
        estoque: "",
        descricao: "",
        fornecedor: "",
        preco: "",
      });
      console.log(prod2);
    } catch (error) {
      console.error("Erro", error);
    }
  }

  return (
    <div className="container">
      <div className="cadastro">
        <h1>Cadastro de produtos:</h1>
        <form onSubmit={AddProduto}>
          <div>
            <label className="nome">Nome:</label>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={prod.nome}
              onChange={handleChange}
            />

            <label className="nome">Categoria:</label>
            <input
              type="text"
              placeholder="Categoria"
              name="categoria"
              value={prod.categoria}
              onChange={handleChange}
            />

            <label className="nome">Estoque:</label>
            <input
              type="number"
              placeholder="Estoque"
              name="estoque"
              value={prod.estoque}
              onChange={handleChange}
            />

            <label className="nome">Descrição:</label>
            <input
              type="text"
              placeholder="Descricao"
              name="descricao"
              value={prod.descricao}
              onChange={handleChange}
            />
            <label className="nome">Fornecedor:</label>
            <select name="fornecedor" onChange={handleChange}>
              <option value="">Selecione um fornecedor</option>
              {fornecedores.map((value, key) => (
                <option key={key} value={value.id}>
                  {value.nome}
                </option>
              ))}
            </select>

            <label className="nome">Preço:</label>
            <input
              type="number"
              placeholder="Preco"
              name="preco"
              value={prod.preco}
              onChange={handleChange}
            />

            <button type="submit">Cadastrar produto</button>
          </div>
        </form>

        <h1>Alteração de produtos:</h1>

        <form onSubmit={() => updateProduto(prod2.id)}>
          <label className="nome">Nome:</label>
          <input
            type="text"
            value={prod2.nome}
            name="nome"
            onChange={handleChange2}
          />
          <label className="nome">Categoria:</label>
          <input
            type="text"
            value={prod2.categoria}
            name="categoria"
            onChange={handleChange2}
          />
          <label className="nome">Estoque:</label>
          <input
            type="number"
            value={prod2.estoque}
            name="estoque"
            onChange={handleChange2}
          />
          <label className="nome">Descrição:</label>
          <input
            type="text"
            value={prod2.descricao}
            name="descricao"
            onChange={handleChange2}
          />

          <label className="nome">Fornecedor:</label>
          <select name="fornecedor" onChange={handleChange2}>
            <option value={prod2.fornecedor}>
              <Componentex idfornecedor={prod2.fornecedor} />
            </option>
            {fornecedores.map((value, key) => (
              <option key={key} value={value.id}>
                {value.nome}
              </option>
            ))}
          </select>

          <label className="nome">Preço:</label>
          <input
            type="number"
            value={prod2.preco}
            name="preco"
            onChange={handleChange2}
          />

          <button type="submit">Alterar produto</button>
        </form>
      </div>
      <div className="sessao">
        <div className="lista">
          <h1>Lista de Produtos:</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Descricao</th>
                <th>Preco</th>
                <th>Fornecedor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, key) => (
                <tr key={key}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.categoria}</td>
                  <td>{produto.estoque}</td>
                  <td>{produto.descricao}</td>
                  <td>{produto.preco}</td>
                  <Componentex idfornecedor={produto.fornecedor} />
                  <td>
                    <button
                      className="botao-deletar"
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
                    <button
                      onClick={() => {
                        adicionarProduto(produto.id);
                      }}
                    >
                      Adicionar a lista de desejos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              if (mostrar === true) {
                setMostrar(false);
              } else {
                setMostrar(true);
              }
            }}
          >
            Lista de Fornecedores
          </button>
          {mostrar && (
            <div className="listaFornecedores">
              <h1>Lista de Fornecedores:</h1>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                  </tr>
                </thead>

                <tbody>
                  {fornecedores.map((fornecedor) => (
                    <tr key={fornecedor.id}>
                      <td>{fornecedor.id}</td>
                      <td>{fornecedor.nome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            onClick={() => {
              if (mostrarD === true) {
                setMostrarD(false);
              } else {
                setMostrarD(true);
              }
            }}
          >
            Lista de Desejos
          </button>
        </div>
        {mostrarD && (
          desejoProduto(),
          <div className="listaDesejos">
            <h1>Lista de Desejos:</h1>
            <table>
              <thead>
                <tr>
                  <th>Nome do produto</th>
                  <th>Açao</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(desejos) && desejos.map((desejo) => (
                  <tr key={desejo.id}>
                    <td>{desejo.nome}</td>
                    <td>
                      <button
                        className="botao-deletar"
                        onClick={() => {
                          deletaDesejo(desejo.id);
                        }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
