# Marvel API

## 🔖 Requisitos funcionais

### Cadastro de Personagens

- [ ] Deve poder cadastrar um personagem com as características conforme tabela abaixo:
- [ ] Deve retornar o id do personagem ao realizar o cadastro
- [ ] Não deve cadastrar personagem com nome duplicado
- [ ] Com exceção da idade, todos os campos são obrigatórios

| campos | descrição                             | tipo     | obrigatório |
| ------ | :------------------------------------ | -------- | ----------- |
| name   | nome do personagem                    | texto    | sim         |
| age    | idade                                 | inteiro  | não         |
| alias  | codinome                              | texto    | sim         |
| team   | afiliações (vingadores, x-men, etc..) | lista    | sim         |
| active | se o personagem está ativo ou não     | booleano | sim         |

### Busca de Personagens

- [ ] Deve retornar uma lista de personagens cadastrados
- [ ] Deve poder buscar por personagem por nome
- [ ] Deve poder buscar personagem pelo id
- [ ] Deve retornar 404 ao buscar por id não cadastrado

### Remover Personagem

- [ ] Deve poder remover por id, um personagem cadastrado
- [ ] Deve retornar não encontrado ao remover por id não cadastrado

## 🚀 Tecnologias

- [Node.js] - plataforma de desenvolvimento
- [Express] - framework onde a API foi construída
- [Cypress] - framework de testes automatizados
- [MongoDB] - Banco de dados (Não relacional)

## 👨🏻‍💻 Como executar o projeto

[Node.js](https://nodejs.org/) v16 ou superior para executar.

Execute os comandos abaixo para instalar das dependências do projeto e execução dos testes:

```sh
cd vdt-season1-marvel-api
npm i
npx cypress run
```
Com base no script de teste fornecido, aqui estão os casos de teste descritos de forma clara e concisa:

## 🐞 Casos de Teste para Cadastro de Personagens

1. **Cadastro de um Personagem Válido**
   - **Descrição:** Deve cadastrar um personagem com todos os campos obrigatórios preenchidos.
   - **Entrada:** 
     - Nome: "Charles Chavier"
     - Codinome: "Professor X"
     - Time: ["x-main", "a"]
     - Ativo: true
   - **Resultado Esperado:** Status 201 e um ID de personagem não nulo.

2. **Tentativa de Cadastro de Personagem Duplicado**
   - **Descrição:** Não deve permitir o cadastro de um personagem que já existe.
   - **Entrada:** 
     - Nome: "Wanda"
     - Codinome: "Feitiseira"
     - Time: ["vingadores", "vila"]
     - Ativo: true
   - **Resultado Esperado:** Status 400 e mensagem de erro "Duplicate character".

3. **Cadastro sem Nome**
   - **Descrição:** Se o nome não for fornecido, o cadastro deve falhar.
   - **Entrada:** 
     - Codinome: "Feitiseira"
     - Time: ["vingadores", "vila"]
     - Ativo: true
   - **Resultado Esperado:** Status 400 e mensagem de erro "\"name\" is required".

4. **Cadastro sem Codinome**
   - **Descrição:** Se o codinome não for fornecido, o cadastro deve falhar.
   - **Entrada:** 
     - Nome: "Wanda"
     - Time: ["vingadores", "vila"]
     - Ativo: true
   - **Resultado Esperado:** Status 400 e mensagem de erro "\"alias\" is required".

5. **Cadastro sem Time**
   - **Descrição:** Se nenhum time for fornecido, o cadastro deve falhar.
   - **Entrada:** 
     - Nome: "Wanda"
     - Codinome: "Feitiseira"
     - Ativo: true
   - **Resultado Esperado:** Status 400 e mensagem de erro "\"team\" is required".

6. **Cadastro sem Status Ativo**
   - **Descrição:** Se o status ativo não for fornecido, o cadastro deve falhar.
   - **Entrada:** 
     - Nome: "Wanda"
     - Codinome: "Feitiseira"
     - Time: ["vingadores", "vila"]
   - **Resultado Esperado:** Status 400 e mensagem de erro "\"active\" is required".

7. **Cadastro com Nome em Branco**
   - **Descrição:** Se o nome for passado em branco, o cadastro deve falhar.
   - **Entrada:** 
     - Nome: ""
     - Codinome: "Professor X"
     - Time: ["a"]
     - Ativo: true
   - **Resultado Esperado:** Status 400 e mensagem de erro "\"name\" is not allowed to be empty".

8. **Cadastro com Codinome em Branco**
   - **Descrição:** Se o codinome for passado em branco, o cadastro deve falhar.
   - **Entrada:** 
     - Nome: "Charles Chavier"
     - Codinome: ""
     - Time: ["a"]
     - Ativo: true
   - **Resultado Esperado:** Status 400 e mensagem de erro "\"alias\" is not allowed to be empty".

9. **Cadastro com Time em Branco**
   - **Descrição:** Se o time for passado em branco, o cadastro deve falhar.
   - **Entrada:** 
     - Nome: "Charles Chavier"
     - Codinome: "Professor X"
     - Time: [""]
     - Ativo: true
   - **Resultado Esperado:** Status 400 e mensagem de erro "\"team[0]\" is not allowed to be empty".

10. **Cadastro com Status Ativo em Branco**
    - **Descrição:** Se o status ativo for passado em branco, o cadastro deve falhar.
    - **Entrada:** 
      - Nome: "Charles Chavier"
      - Codinome: "Professor X"
      - Time: ["a"]
      - Ativo: ""
    - **Resultado Esperado:** Status 400 e mensagem de erro "\"active\" must be a boolean".

Esses casos de teste cobrem as principais funcionalidades e validações do endpoint para o cadastro de personagens.
