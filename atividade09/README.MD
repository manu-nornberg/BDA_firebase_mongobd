#API em MongoDB
#####Para começar precisamos instalar os sequintes recursos:
Para a instalação do mongo: 
```npm install mongodb```
Para a instalação do Express:
```npm install express mongodb cors body-parser```
Para a instalação do Nodemon:
```npm install nodemon -D```
Para a importação do banco: 
```node importdb.js```

#####Após isso, faremos as consultas nas seguintes tabelas:
* Produtos
* Clientes
* Endereços

Usando o arquivo podemos ter acesso a todas as consultas realizadas:
```tests/API_BANCO.postman_collection.json```

####Para a tabela de Produtos:
#####getAllProdutos
```get: localhost:3000/produtos```
#####getProdutosById
```get: localhost:3000/produtos/id```
#####insertProdutos
```post: localhost:3000/produtos/```

*enviar o formulario pelo body*
#####updateProdutos
```put: localhost:3000/produtos/id```

*enviar o formulario pelo body*

#####deleteProdutos
```delete: localhost:3000/produtos/id```

#####filtredProdutos *(filtro de texto)*
```get: localhost:3000/produtos/```

*mandar os parametros com field = descricao e search = termo pesquisado*

#####rangePreco *(filtro de preço)*
```get: localhost:3000/produtos/filter_preco```

*mandar no greater o maior valor e no less o menor valor*

####Para a tabela de Clientes:
#####getAllClientes
```get: localhost:3000/clientes```
#####getClientesById
```get: localhost:3000/clientes/id```
#####insertClientes
```post: localhost:3000/clientes/```

*enviar o formulario pelo body*
#####updateClientes
```put: localhost:3000/clientes/id```

*enviar o formulario pelo body*

#####deleteClientes
```delete: localhost:3000/clientes/id```

#####procuraCliente *(filtro de texto)*
```get: localhost:3000/clientes/```

*mandar os parametros com field = nome e search = termo pesquisado*

####Para a tabela de enderecos:
#####getAllEnderecos
```get: localhost:3000/enderecos```
#####getEnderecosById
```get: localhost:3000/enderecos/id```
#####getEnderecosByCliente *(filtrar pelo id do cliente)*
```get: localhost:3000/enderecos/id_cliente```

#####insertEnderecos
```post: localhost:3000/enderecos/```

*enviar o formulario pelo body*
#####updateEnderecos
```put: localhost:3000/enderecos/id```

*enviar o formulario pelo body*

#####deleteEnderecos
```delete: localhost:3000/enderecos/id```

#####procuraEndereco *(filtro de texto)*
```get: localhost:3000/enderecos/```

*mandar os parametros com field = rua e search = termo pesquisado*

