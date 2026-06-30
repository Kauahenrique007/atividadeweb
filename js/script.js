var endpoint = "http://localhost:3000/contatos";

document.addEventListener("DOMContentLoaded", function () {
  configurarMenu();
  configurarFormulario();
});

// Abre e fecha o menu no celular.
function configurarMenu() {
  var botao = document.getElementById("botao-menu");
  var menu = document.getElementById("lista-menu");

  if (botao && menu) {
    botao.addEventListener("click", function () {
      menu.classList.toggle("aberto");
    });
  }
}

// Prepara a validação e o envio do formulário.
function configurarFormulario() {
  var formulario = document.getElementById("form-contato");
  var telefone = document.getElementById("telefone");

  if (!formulario) {
    return;
  }

  telefone.addEventListener("input", function () {
    telefone.value = aplicarMascaraTelefone(telefone.value);
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validarFormulario()) {
      enviarContato();
    }
  });
}

// Valida todos os campos obrigatórios.
function validarFormulario() {
  var valido = true;

  limparErros();

  if (pegarValor("nome").length < 3) {
    mostrarErro("nome", "Digite um nome com pelo menos 3 caracteres.");
    valido = false;
  }

  if (!emailValido(pegarValor("email"))) {
    mostrarErro("email", "Digite um e-mail válido.");
    valido = false;
  }

  if (somenteNumeros(pegarValor("telefone")).length < 10) {
    mostrarErro("telefone", "Digite um telefone com pelo menos 10 números.");
    valido = false;
  }

  if (pegarValor("assunto") === "") {
    mostrarErro("assunto", "Digite o assunto da mensagem.");
    valido = false;
  }

  if (pegarValor("tipoServico") === "") {
    mostrarErro("tipoServico", "Escolha o tipo de serviço desejado.");
    valido = false;
  }

  if (pegarValor("mensagem").length < 10) {
    mostrarErro("mensagem", "Digite uma mensagem com pelo menos 10 caracteres.");
    valido = false;
  }

  if (!valido) {
    mostrarStatus("Revise os campos destacados antes de enviar.", "erro");
  }

  return valido;
}

// Envia os dados para o JSON Server.
function enviarContato() {
  var contato = {
    nome: pegarValor("nome"),
    email: pegarValor("email"),
    telefone: pegarValor("telefone"),
    assunto: pegarValor("assunto"),
    tipoServico: pegarValor("tipoServico"),
    mensagem: pegarValor("mensagem"),
    dataEnvio: new Date().toISOString()
  };

  mostrarStatus("Enviando mensagem...", "");

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contato)
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao salvar.");
      }

      return resposta.json();
    })
    .then(function () {
      document.getElementById("form-contato").reset();
      limparErros();
      mostrarStatus("Mensagem enviada com sucesso.", "sucesso");
    })
    .catch(function () {
      mostrarStatus("Não foi possível salvar. Verifique se o JSON Server está ligado.", "erro");
    });
}

function pegarValor(id) {
  return document.getElementById(id).value.trim();
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function somenteNumeros(texto) {
  return texto.replace(/\D/g, "");
}

// Máscara simples para telefone.
function aplicarMascaraTelefone(valor) {
  var numeros = somenteNumeros(valor).slice(0, 11);

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 6) {
    return "(" + numeros.slice(0, 2) + ") " + numeros.slice(2);
  }

  if (numeros.length <= 10) {
    return "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 6) + "-" + numeros.slice(6);
  }

  return "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 7) + "-" + numeros.slice(7);
}

function mostrarErro(id, mensagem) {
  var campo = document.getElementById(id);
  var erro = document.getElementById("erro-" + id);

  campo.classList.add("campo-erro");
  erro.textContent = mensagem;
}

function limparErros() {
  var campos = ["nome", "email", "telefone", "assunto", "tipoServico", "mensagem"];

  campos.forEach(function (id) {
    document.getElementById(id).classList.remove("campo-erro");
    document.getElementById("erro-" + id).textContent = "";
  });

  mostrarStatus("", "");
}

function mostrarStatus(texto, tipo) {
  var status = document.getElementById("mensagem-status");

  if (status) {
    status.textContent = texto;
    status.className = "mensagem-status";

    if (tipo) {
      status.classList.add(tipo);
    }
  }
}
