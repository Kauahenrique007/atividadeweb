# Inside Code - Site Institucional

Projeto acadêmico da disciplina de Introdução ao Desenvolvimento Web.

## Objetivo

Criar um site institucional para a empresa fictícia Inside Code, apresentando seus serviços e oferecendo um formulário de contato com salvamento local usando JSON Server.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- JSON Server

O projeto não utiliza React, Vue, Angular, Bootstrap, Tailwind CSS, jQuery, Materialize, Bulma, Vite, TypeScript, banco externo ou backend próprio.

## Como executar

Instale o JSON Server:

```bash
npm install -g json-server
```

Inicie o JSON Server dentro da pasta do projeto:

```bash
json-server --watch db.json --port 3000
```

Depois de iniciar o JSON Server, abra o arquivo `index.html` no navegador.

## Estrutura de pastas

```txt
inside-code/
|
|-- index.html
|-- sobre.html
|-- contato.html
|
|-- css/
|   |-- style.css
|
|-- js/
|   |-- script.js
|
|-- img/
|   |-- README.txt
|
|-- documentacao/
|   |-- documentacao-inside-code.pdf
|   |-- documentacao-inside-code.md
|   |-- capturas/
|
|-- db.json
|-- README.md
```

## Funcionalidades

- Página inicial com apresentação, banner em HTML/CSS, serviços e diferenciais.
- Página Sobre com história, missão, visão, valores, tabela e aside.
- Página Fale Conosco com formulário validado em JavaScript.
- Máscara simples para telefone.
- Envio dos dados para `http://localhost:3000/contatos` usando `fetch` e método `POST`.
- Mensagens de erro e sucesso.
- Layout responsivo para celular.

## Documentacao academica

A pasta `documentacao/` contem o PDF final da atividade, o arquivo editavel em Markdown e os prints da pagina Fale Conosco, do formulario funcionando e dos dados salvos no JSON Server.

## Autor

Kauã Henrique de Jesus Santos Nascimento.

## GitHub

Link do GitHub: https://github.com/Kauahenrique007/atividadeweb.git
