## API de Controle Patrimonial 

   aplicação construída em JavaScript utilizando [Express JS](https://expressjs.com) e a Biblioteca Oficial do Banco de Dados [Couch DB](https://couchdb.apache.org) pacote npm [nano](https://www.npmjs.com/package/nano)

    // Criar novo equipamento
    POST /api/add
os parâmetros passados em Query na url são transformados em um Objeto e inseridos na tabela
(obs: obrigatorio o uso do parâmetro **id**)

---

    // Visualizar equipamento
    GET /api/:id
para visualizar um "documento" presente, basta digitar a { _id }

---

    // Editar equipamento
    PUT /api/:id/edit
para editar "documento" presente, digite [ _id } seguido de /edit e as informações a serem editadas como Query
(obs: é preciso informar TODAS as informações, pois sera criado um novo "documento")

---

    // Excluir equipamento
    DELETE /api/:id/delete
para Excluir um "documento" insira a { _id } seguido de /delete
