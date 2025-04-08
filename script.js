const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;
const winnigCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Inicialização do jogo
// Adicionando o evento de click em cada celula
// once: true -> faz com que o evento seja executado apenas uma vez
const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handClick);
    cell.addEventListener("click", handClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

// Final do jogo
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = `Empate!`;
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Venceu!"
      : "X Venceu!";
  }
  winningMessage.classList.add("show-winning-message");
};

// Verificando se ganhou e retorna o player que ganhou
// Se dentre todas as combinações existentes 'winningcombos'
// uma seja satisfeita, retorna a combinação especifica do elemento data-cell 'x' ou 'circle'
// e que todos sejam o mesmo simbolo. É retornado o vencedor.
// some e every!
const checkerForWins = (currentPlayer) => {
  return winnigCombos.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

// Verificar empate
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

// Adiciona ao endereço da classe que foi clicada 'cell'
// o simbolo que identifica o jogador 'classToAdd'
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

// Ao passar o mouse por cima identifica a vez do jogador.
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");
  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

// verificar por empate
const handClick = (e) => {
  // colocar a marca do (X ou O)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  // Verifica, altera o simbolo para inserir e depois muda a vez do jogador.
  placeMark(cell, classToAdd);

  // Verificar por vitória
  const isWin = checkerForWins(classToAdd);
  // Verificando por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

startGame();
// Reiniciar o jogo
restartButton.addEventListener("click", startGame);
