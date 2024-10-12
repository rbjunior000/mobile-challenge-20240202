# Mobile Challenge 20240202

Este projeto é um aplicativo mobile que lista palavras em inglês, utilizando a [Free Dictionary API](https://dictionaryapi.dev/). Os usuários podem visualizar uma lista de palavras, detalhes sobre elas, salvar favoritos e acessar o histórico de visualizações.

## Tecnologias Utilizadas

- **Framework:** React Native
- **Estilização:** Styled Components
- **Gerenciamento de estado:** Zustand e Context API
- **Backend:** Firebase
- **Cache:** React Query
- **Rotas:** Expo Router
  <<<<<<< Updated upstream
- # **Persistência de dados locais:** AsyncStorage com uso de `useAsyncStorage`
- **Persistência de dados locais:** AsyncStorage com uso de `useAsyncStorage` e ReactQuery
  > > > > > > > Stashed changes
- **API:** Free Dictionary API
- **Outras bibliotecas:**
  - Gluestack v2 para a estrutura de componentes

## Funcionalidades

- Visualizar uma lista de palavras em inglês com rolagem infinita
- Visualizar detalhes de uma palavra (significados, fonética)
- Salvar e remover palavras como favoritas
- Visualizar o histórico de palavras visualizadas
- Cache de requisições para buscas rápidas
- Recurso de áudio para pronúncia das palavras

## Diferenciais Implementados

- Tocador de áudio para a pronúncia das palavras
- Login com Supabase para associar favoritos e histórico ao usuário

## Instalação

Siga os passos abaixo para rodar o projeto:

1. Clone o repositório:
   ```bash
   git clone https://github.com/rbjunior000/mobile-challenge-20240202.git
   ```
2. Acesse o diretório do projeto:

   ```bash
   cd mobile-challenge-20240202
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Prepare seu ambiente:

Crie um arquivo .env e sete as variaveis de ambiente do arquivo .env.example.
Para o desafio, tenho as minhas credencias e estao no .example.

5. Execute o projeto:
   ```bash
   npx expo start
   ```

## Este é um desafio da [Coodesh](https://coodesh.com)
