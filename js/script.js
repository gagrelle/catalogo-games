// ----- Operações básicas -----
const nomeSite = "Fase Bônus";
const anoProjeto = 2026;
let totalJogos = 9;
let filtroAtivo = false;
const generos = [
  "Ação e aventura",
  "Estratégia",
  "Metroidvania",
  "Plataforma",
  "RPG de ação",
  "RPG de turnos",
];

const meta = totalJogos * 2;
const catalogoGrande = totalJogos >= 5 && !filtroAtivo;

// Saída no console
console.log("Site:", nomeSite, "-", anoProjeto);
console.log("Total de jogos:", totalJogos, "| Meta:", meta);
console.log("Catálogo grande?", catalogoGrande);
console.log("Gêneros:", generos.length, generos);

// ----- Arrays -----
const jogos = [
  { nome: "Age of Empires IV", genero: "Estratégia", ano: 2021, nota: 8.6 },
  { nome: "Baldur's Gate 3", genero: "RPG de turnos", ano: 2023, nota: 9.6 },
  { nome: "Celeste", genero: "Plataforma", ano: 2018, nota: 9.7 },
  { nome: "Cyberpunk 2077", genero: "RPG de ação", ano: 2020, nota: 8.6 },
  { nome: "Elden Ring", genero: "RPG de ação", ano: 2022, nota: 9.3 },
  { nome: "God of War", genero: "Ação e aventura", ano: 2018, nota: 9.6 },
  { nome: "Hollow Knight", genero: "Metroidvania", ano: 2017, nota: 9.7 },
  {
    nome: "Red Dead Redemption 2",
    genero: "Ação e aventura",
    ano: 2018,
    nota: 9.2,
  },
  {
    nome: "The Witcher 3: Wild Hunt",
    genero: "RPG de ação",
    ano: 2015,
    nota: 9.7,
  },
];

function calcularMedia(lista) {
  let soma = 0;
  for (let i = 0; i < lista.length; i++) {
    soma = soma + lista[i].nota;
  }
  return soma / lista.length;
}

function melhorJogo(lista) {
  let melhor = lista[0];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nota > melhor.nota) {
      melhor = lista[i];
    }
  }
  return melhor;
}

function classificar(nota) {
  if (nota >= 9.5) {
    return "Imperdível";
  } else if (nota >= 9) {
    return "Muito bom";
  } else {
    return "Bom";
  }
}

const media = calcularMedia(jogos);
const melhor = melhorJogo(jogos);
const acimaDaMedia = [];
for (let i = 0; i < jogos.length; i++) {
  if (jogos[i].nota > media) {
    acimaDaMedia.push(jogos[i].nome);
  }
}

// Saída no console
console.log("Média das notas:", media.toFixed(2));
console.log("Melhor jogo:", melhor.nome, "(" + melhor.nota + ")");
console.log("Jogos acima da média:", acimaDaMedia);
console.log("-----v Classificação dos Jogos v------");
for (const jogo of jogos) {
  console.log(jogo.nome + " -> " + classificar(jogo.nota));
}

// ----- Filtros do catálogo -----
const cards = document.querySelectorAll(".card");
const formFiltros = document.getElementById("form-filtros");
const campoBusca = document.getElementById("busca");
const campoGenero = document.getElementById("genero");
const campoPlataforma = document.getElementById("plataforma");
const campoNota = document.getElementById("nota");
const contador = document.getElementById("contador");
const avisoVazio = document.getElementById("vazio");

function filtrarJogos() {
  const busca = campoBusca.value.trim().toLowerCase();
  const notaMinima = Number(campoNota.value);
  let visiveis = 0;

  for (const card of cards) {
    const nome = card.dataset.nome.toLowerCase();
    const plataformas = card.dataset.plataformas.split(" ");

    const passaBusca = nome.includes(busca);
    const passaGenero =
      campoGenero.value === "" || card.dataset.genero === campoGenero.value;
    const passaPlataforma =
      campoPlataforma.value === "" ||
      plataformas.includes(campoPlataforma.value);
    const passaNota = Number(card.dataset.nota) >= notaMinima;

    if (passaBusca && passaGenero && passaPlataforma && passaNota) {
      card.hidden = false;
      visiveis++;
    } else {
      card.hidden = true;
    }
  }

  // Saída no console
  totalJogos = visiveis;
  filtroAtivo = visiveis < cards.length;
  contador.textContent =
    "Mostrando " + visiveis + " de " + cards.length + " jogos";
  avisoVazio.hidden = visiveis > 0;
  console.log(
    "Filtro aplicado. Jogos visíveis:",
    totalJogos,
    "| Filtro ativo:",
    filtroAtivo,
  );
}

formFiltros.addEventListener("input", filtrarJogos);
formFiltros.addEventListener("reset", function () {
  setTimeout(filtrarJogos, 0);
});
formFiltros.addEventListener("submit", function (evento) {
  evento.preventDefault();
});

// ----- Formulário de contato -----
const formContato = document.getElementById("form-contato");
const resposta = document.getElementById("resposta");

formContato.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (nome === "" || email === "" || mensagem === "") {
    resposta.textContent = "Preencha todos os campos antes de enviar.";
  } else if (!email.includes("@")) {
    resposta.textContent = "Digite um e-mail válido.";
  } else {
    resposta.textContent =
      "Obrigado, " + nome + "! Sua mensagem foi registrada.";
    console.log("Mensagem recebida:", { nome, email, mensagem });
    formContato.reset();
  }
});
