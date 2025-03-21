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


## 🐞 Casos de Teste para o Endpoint GET /characters

1. **Listar Personagens Cadastrados**
   - **Descrição:** Deve retornar uma lista de personagens cadastrados.
   - **Resultado Esperado:** 
     - Status 200
     - O corpo da resposta deve ser um array.
     - O array deve conter pelo menos um personagem.

2. **Buscar Personagem pelo Nome**
   - **Descrição:** Deve retornar informações de um personagem específico ao buscar pelo nome.
   - **Entrada:** "Wanda"
   - **Resultado Esperado:** 
     - Status 200
     - O corpo da resposta deve conter exatamente 1 personagem.
     - O nome do personagem deve ser "Wanda 1".

---

3. **Buscar Personagem pelo ID Válido**
   - **Descrição:** Deve retornar informações do personagem ao buscar pelo ID cadastrado.
   - **Pré-condição:** Um personagem (Tony Stark) deve estar cadastrado.
   - **Resultado Esperado:** 
     - Status 200
     - O nome do personagem deve ser "Tony Stark".

4. **Buscar Personagem com ID Não Cadastrado**
   - **Descrição:** Deve retornar erro ao buscar um ID que não foi cadastrado.
   - **Entrada:** "000000000000000000000000"
   - **Resultado Esperado:** 
     - Status 404.


## 🐞 Casos de Teste para o Endpoint DELETE /characters/id

1. **Remover Personagem pelo ID Válido**
   - **Descrição:** Deve remover um personagem cadastrado ao buscar pelo ID.
   - **Pré-condição:** Um personagem (Tony Stark) deve estar cadastrado.
   - **Resultado Esperado:** 
     - Status 204 (No Content) indicando que a remoção foi bem-sucedida.

2. **Verificar Remoção do Personagem**
   - **Descrição:** Após a remoção, ao buscar o personagem pelo ID, deve retornar um erro 404.
   - **Resultado Esperado:** 
     - Status 404 indicando que o personagem não foi encontrado.

3. **Remover Personagem com ID Não Cadastrado**
   - **Descrição:** Deve retornar erro ao tentar remover um personagem que não está cadastrado.
   - **Entrada:** "000000000000000000000000"
   - **Resultado Esperado:** 
     - Status 404 indicando que o personagem não foi encontrado.


Para casos de testes manuais, o tempo necessário para executar todos os testes pode variar significativamente, dependendo de vários fatores, como:

1. **Experiência do Testador:** Testadores mais experientes podem realizar os testes mais rapidamente.
2. **Complexidade dos Testes:** Testes que requerem mais interações ou verificações detalhadas podem levar mais tempo.
3. **Ambiente de Teste:** O tempo para preparar o ambiente, como configurar dados ou acessar a aplicação.
4. **Documentação e Notas:** O tempo gasto em anotações, documentação de resultados e comunicação de falhas.

A estimativa de tempo para a execução manual dos testes foi baseada em considerações práticas e experiências comuns em testes de software (e na minha experiência prática). Aqui estão os fatores que contribuíram para essa estimativa:

1. **Complexidade do Caso de Teste:** Cada teste foi avaliado em termos de complexidade. Testes que envolvem uma simples verificação de resposta geralmente levam menos tempo do que aqueles que exigem múltiplas interações ou verificações de dados.

2. **Experiência do Testador:** Foi considerada a média de tempo que um testador experiente leva para realizar um teste. Um testador familiarizado com a aplicação e os testes geralmente pode completar cada um em menos tempo do que um novato.

### Casos de Teste: Estimativas

#### 1. **POST /characters**
- **Cadastro de um Personagem Válido**
  - **Tempo Estimado:** 2-3 minutos.
  
- **Tentativa de Cadastro de Personagem Duplicado**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro sem Nome**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro sem Codinome**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro sem Time**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro sem Status Ativo**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro com Nome em Branco**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro com Codinome em Branco**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro com Time em Branco**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Cadastro com Status Ativo em Branco**
  - **Tempo Estimado:** 1-2 minutos.

**Total para os testes POST:** Aproximadamente 12 a 20 minutos.

---

#### 2. **GET /characters**
- **Listar Personagens**
  - **Tempo Estimado:** 2-3 minutos.
  
- **Buscar Personagem pelo Nome**
  - **Tempo Estimado:** 1-2 minutos.

**Total para os testes GET:** Aproximadamente 3 a 5 minutos.

---

#### 3. **GET /characters/id**
- **Buscar Personagem pelo ID Válido**
  - **Tempo Estimado:** 2-3 minutos.
  
- **Buscar Personagem com ID Não Cadastrado**
  - **Tempo Estimado:** 1-2 minutos.

**Total para os testes GET /id:** Aproximadamente 3 a 5 minutos.

---

#### 4. **DELETE /characters/id**
- **Remover Personagem pelo ID Válido**
  - **Tempo Estimado:** 2-3 minutos.
  
- **Verificar Remoção do Personagem**
  - **Tempo Estimado:** 1-2 minutos.
  
- **Remover Personagem com ID Não Cadastrado**
  - **Tempo Estimado:** 1-2 minutos.

**Total para os testes DELETE:** Aproximadamente 4 a 7 minutos.

---

### Estimativa de Tempo Total

- **POST /characters:** 12 a 20 minutos.
- **GET /characters:** 3 a 5 minutos.
- **GET /characters/id:** 3 a 5 minutos.
- **DELETE /characters/id:** 4 a 7 minutos.

### Total Geral Estimado

- **Mínimo:** Aproximadamente 32 minutos.
- **Máximo:** Aproximadamente 40 minutos
