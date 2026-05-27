var pontuacao = document.getElementsByClassName("pontuacao")[0];
var resultado = document.getElementsByClassName("result")[0];
var teste = document.getElementsByClassName("teste")[0];
var teste1 = document.getElementsByClassName("teste1")[0];
var valorDado = document.getElementById("valorDado");
var tabuleiro = document.getElementById("tabuleiro");

var score = 0;

// posições
var posJogador = 1;
var posBot = 1;

// valor do dado
var dado = 0;

// máximo de casas
var totalCasas = 50;

// controle
var dadoRolado = false;

/* ===========================
   CASAS ESPECIAIS
=========================== */

var casasEspeciais = {
    5: "bonus",
    10: "armadilha",
    15: "turbo",
    22: "voltar",
    28: "bonus",
    33: "armadilha",
    40: "turbo",
    45: "voltar"
};

// cria tabuleiro
function criarTabuleiro() {

    tabuleiro.innerHTML = "";

    for (let i = 1; i <= totalCasas; i++) {

        let casa = document.createElement("div");
        casa.classList.add("casa");
        casa.id = "casa" + i;

        casa.innerHTML =
            `<span class="numero-casa">${i}</span>`;

        /* ===========================
           VISUAL DAS CASAS ESPECIAIS
        =========================== */

        if (casasEspeciais[i] == "bonus") {
            casa.innerHTML += "⭐";
            casa.style.background = "#90EE90";
        }

        if (casasEspeciais[i] == "armadilha") {
            casa.innerHTML += "💀";
            casa.style.background = "#ffb3b3";
        }

        if (casasEspeciais[i] == "turbo") {
            casa.innerHTML += "🚀";
            casa.style.background = "#9ed8ff";
        }

        if (casasEspeciais[i] == "voltar") {
            casa.innerHTML += "⬅️";
            casa.style.background = "#ffe680";
        }

        // jogador e bot
        if (i === posJogador && i === posBot) {
            casa.classList.add("jogador", "bot");
            casa.innerHTML += "🏆";
        }
        else if (i === posJogador) {
            casa.classList.add("jogador");
            casa.innerHTML += "🙂";
        }
        else if (i === posBot) {
            casa.classList.add("bot");
            casa.innerHTML += "🤖";
        }

        tabuleiro.appendChild(casa);
    }

    document.getElementById("posJogador")
        .innerHTML = posJogador;

    document.getElementById("posBot")
        .innerHTML = posBot;
}

// rolar dado
function rolarDado() {

    dado = Math.floor(Math.random() * 6) + 1;

    valorDado.innerHTML = dado;

    resultado.innerHTML =
        "Agora escolha Pedra, Papel ou Tesoura";

    dadoRolado = true;
}

// jogar
function jogar(escolhaJogador) {

    if (!dadoRolado) {
        resultado.innerHTML =
            "Role o dado antes!";
        return;
    }

    var escolhas = [
        "pedra",
        "papel",
        "tesoura"
    ];

    var escolhaBot =
        escolhas[Math.floor(Math.random() * 3)];

    

    if (escolhaJogador == "pedra") {
        teste.innerHTML =
            '<img src="./images/icon-rock.svg">';
    }

    else if (escolhaJogador == "papel") {
        teste.innerHTML =
            '<img src="./images/icon-paper.svg">';
    }

    else if (escolhaJogador == "tesoura") {
        teste.innerHTML =
            '<img src="./images/icon-scissors.svg">';
    }

    if (escolhaBot == "pedra") {
        teste1.innerHTML =
            '<img src="./images/icon-rock.svg">';
    }

    else if (escolhaBot == "papel") {
        teste1.innerHTML =
            '<img src="./images/icon-paper.svg">';
    }

    else if (escolhaBot == "tesoura") {
        teste1.innerHTML =
            '<img src="./images/icon-scissors.svg">';
    }

    // remove classes antigas
teste.className = "teste";
teste1.className = "teste1";

teste.classList.add(escolhaJogador);
teste1.classList.add(escolhaBot);

    resolverRodada(
        escolhaJogador,
        escolhaBot
    );

    dadoRolado = false;

    verificarVencedor();
}
// lógica principal
function resolverRodada(jogador, bot) {

    let posInicialJogador = posJogador;
    let posInicialBot = posBot;

    let tempJogador =
        posJogador + dado;

    let tempBot =
        posBot + dado;

    // vitória jogador
    if (
        (jogador == "pedra" && bot == "tesoura") ||
        (jogador == "papel" && bot == "pedra") ||
        (jogador == "tesoura" && bot == "papel")
    ) {

        resultado.innerHTML =
            "Você ganhou! Ficou na casa do dado 🎉";

        posJogador = tempJogador;

        score++;
        pontuacao.innerHTML = score;

        posBot = posInicialBot;
    }

    // derrota jogador
    else if (
        (bot == "pedra" && jogador == "tesoura") ||
        (bot == "papel" && jogador == "pedra") ||
        (bot == "tesoura" && jogador == "papel")
    ) {

        resultado.innerHTML =
            "Você perdeu! Voltou para posição inicial 😥";

        posJogador = posInicialJogador;

        posBot = tempBot;
    }

    // empate
    else {

        resultado.innerHTML =
            "Empate! Você voltou e andou apenas +1 🤝";

        posJogador =
            posInicialJogador + 1;

        posBot =
            posInicialBot + 1;
    }

    // aplica casa especial
    aplicarCasaEspecial();

    // limite do tabuleiro
    if (posJogador > totalCasas) {
        posJogador = totalCasas;
    }

    if (posBot > totalCasas) {
        posBot = totalCasas;
    }

    if (posJogador < 1) {
        posJogador = 1;
    }

    criarTabuleiro();
}

/* ===========================
   CASAS ESPECIAIS FUNCIONANDO
=========================== */

function aplicarCasaEspecial() {

    if (casasEspeciais[posJogador] == "bonus") {

        posJogador += 2;

        resultado.innerHTML +=
            "<br>⭐ Casa bônus! +2 casas";
    }

    if (casasEspeciais[posJogador] == "armadilha") {

        posJogador -= 3;

        resultado.innerHTML +=
            "<br>💀 Armadilha! -3 casas";
    }

    if (casasEspeciais[posJogador] == "turbo") {

        posJogador += 4;

        resultado.innerHTML +=
            "<br>🚀 TURBO! +4 casas";
    }

    if (casasEspeciais[posJogador] == "voltar") {

        posJogador -= 2;

        resultado.innerHTML +=
            "<br>⬅️ Voltou 2 casas";
    }

    if (posJogador < 1) {
        posJogador = 1;
    }

    if (posJogador > totalCasas) {
        posJogador = totalCasas;
    }
}

// verifica vencedor
function verificarVencedor() {

    if (posJogador >= totalCasas) {

        setTimeout(() => {
            alert("🎉 VOCÊ GANHOU O JOGO!");
        }, 200);
    }

    if (posBot >= totalCasas) {

        setTimeout(() => {
            alert("🤖 O COMPUTADOR GANHOU!");
        }, 200);
    }
}

// reset
function reset() {

    posJogador = 1;
    posBot = 1;
    dado = 0;
    score = 0;
    dadoRolado = false;

    valorDado.innerHTML = "?";
    pontuacao.innerHTML = "0";

    resultado.innerHTML =
        "Role o dado para começar";

    teste.innerHTML = "?";
    teste1.innerHTML = "?";

    criarTabuleiro();
}

// inicia
criarTabuleiro();