# CSTSI-BDA: Atividade Aual 5 - Regras e Autenticação

## Exemplo:

Como deverá funcionar se implementadas as funções corretamente:
 
[![exemplo](exemplo.gif)](exemplo.gif)

Crie um projeto no Firebase com o Realtime Database e importe este arquivo:

***[atividade-aulas-03-4-default-rtdb-export.json](https://raw.githubusercontent.com/g1ll/exemplo_atividade_aula03/main/database/atividade-aulas-03-4-default-rtdb-export.json)***.

Faça o clone do projeto com o comando git:
>git clone https://github.com/g1ll/cstsi_bda_atividade_aula_05.git

Após o git fazer o download do projeto, entre na pasta ***cstsi_bda_atividade_aula_05***

>cd cstsi_bda_atividade_aula_05

Dentro da pasta execute o comando do npm para instalar as dependências, incluindo o Firebase:

>npm install

Espere o npm instalar todas as dependências e siga para a configuração do seu projeto.

Para configurar o acesso ao seu projeto no Firebase, crie o arquivo ***.env*** na raiz do projeto javascript:

Use este template: [.env](https://gist.githubusercontent.com/g1ll/6e401fcff66fae92aaa862903cc86669/raw/7bb0c78559e3fa1c82c469e7e905ba86a9dc27cc/.env)

[![env-file](https://i.ibb.co/HVbzyMF/env-file-config.png)](https://i.ibb.co/HVbzyMF/env-file-config.png)

Após criar cada variável de ambiente ***REACT_APP_NOME_CONFIG*** coloque o valor de acordo com as configurações de acesso de app ao seu projeto Firebase. Observe que as variáveis de ambiente usam o prefixo **REACT_APP_**, após este prefixo usa se o nome da variável da configuração do Firebase em formato MACRO_CASE. **NÃO USE VIRGULA NO FINAL DE CADA VARIÁVEL, NÃO É NECESSÁRIO, POIS TUDO QUE VIER DEPOIS DO NOME DA VARIÁVEL E DO SINAL DE IGUAL SERÁ CONSIDERADO CONTEÚDO DA VARIÁVEL!**

As variáveis de ambiente que configuram o acesso do app ao projeto no Firebase serão lidas no módulo *"Firebase/firebase"*:

[![firebase-config](https://i.ibb.co/h8KLFyq/firebase-config.png)](https://i.ibb.co/h8KLFyq/firebase-config.png)

Caso o seu aquivo de configuração possua alguma variável que falta no módulo, apenas acrescente seguindo os padrões de nome em formato MACRO_CASE.

Agora já podemos testar o projeto rodando o comando abaixo no terminal e dentro da raiz do diretório do projeto:

>npm start

Este comando irá iniciar um servidor local para rodar o seu projeto react no endereço: [http://localhost:3000](http://localhost:3000)

Para testar o projeto apenas acesse o endereço acima após a execução do comando **npm start**.

As alterações no código serão automaticamente compiladas, atualizando a página no endereço de teste.
Caso a porta 3000 do seu computador já esteja ocupada, o npm irá lhe perguntar por outra porta ou rodará na pora 3001.

Agora o projeto cliente está pronto para a atividade!

## Implementando as funções de Firebase/firebase.js

**NÃO HÁ NECESSIDADE DE ALTERAR OS CÓDIGOS QUE NÃO SEJAM DO ARQUIVO *firebase.js***

A atividade consiste da implementação das seguintes funções no módulo **[Firebase/firebase](https://github.com/g1ll/cstsi_bda_atividade_aula_05/blob/main/src/components/Firebase/firebase.js)** :

1 - ***doCreateUserWithEmailAndPassword(email, password)***: Recebe o Email e a Senha do Usuário e deverá criar uma nova conta no Firebase Authentication, além de cadastrar este usuário no nó */users/* para que se possa implementar as regras de segurança.

2 - ***doSignInWithEmailAndPassword(email, password)***: Recebe os parêmtros de *email* e *senha* do usuário e deverá realizar o login guardando as credenciais na propriedade *credentials* da classe Firebase. O método também deverá atribuir o booleano TRUE ao atributo da classe *this.isLogged* em caso do login ser concluído com sucesso. Ao final a função deverá retornar o ***usuário autenticado*** (**this.credentials.user**).

3 -  ***doSignOut()***: Não recebe parâmetros e devera executar o método adequado para desconectar o usuário.

4 - Usando os métodos para regras de segurança, implemente uma regra para que apenas os usuários logados com o atributo ***admin*** possam escrever no nó de *produtos*.

5 - Salve na pasta ***src/components/Firebase*** do projeto, uma pasta chamada dump com o arquivo json do seu banco do realtime database e outro arquivo json com as suas regras


## Referências:

[Regras no Firebase](https://firebase.google.com/docs/database/security/get-started?hl=pt)

[Sintaxe de Regras no Firebase](https://firebase.google.com/docs/database/security/core-syntax?hl=pt)

[Regras Condicionais no Firebase](https://firebase.google.com/docs/database/security/rules-conditions?hl=pt)

[Regras de Indexação](https://firebase.google.com/docs/database/security/indexing-data?hl=pt)


[Autenticação no Firebase](https://firebase.google.com/docs/auth/web/password-auth?hl=pt)

[Firebase Instalação e Configuração](https://firebase.google.com/docs/database/web/start?hl=pt)

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

[React documentation](https://reactjs.org/).

[Create React App](https://github.com/facebook/create-react-app).

