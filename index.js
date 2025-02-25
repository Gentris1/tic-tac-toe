const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let gameBoard = []
let cheiHod = 0;
let gameOver = false;
let countHodov = 0;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    for (let i = 0; i < 3; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = EMPTY
        }
    }
    cheiHod = 0;
    countHodov =0;
    gameOver = false;
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] !== EMPTY &&
            gameBoard[i][0] === gameBoard[i][1] &&
            gameBoard[i][1] === gameBoard[i][2]) {
            return [[i, 0], [i, 1], [i, 2]];
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (gameBoard[0][j] !== EMPTY &&
            gameBoard[0][j] === gameBoard[1][j] &&
            gameBoard[1][j] === gameBoard[2][j]) {
            return [[0, j], [1, j], [2, j]];
        }
    }

    // Check diagonals
    if (gameBoard[0][0] !== EMPTY &&
        gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][2]) {
        return [[0, 0], [1, 1], [2, 2]];
    }

    if (gameBoard[0][2] !== EMPTY &&
        gameBoard[0][2] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][0]) {
        return [[0, 2], [1, 1], [2, 0]];
    }

    return null;
}


function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (gameOver || gameBoard[row][col] !== EMPTY) {
        return;
    }
    if (gameBoard[row][col] === EMPTY)  {
        if (cheiHod === 0){
            renderSymbolInCell(CROSS, row, col);
            gameBoard[row][col] = CROSS;
        }   else    {
            renderSymbolInCell(ZERO, row, col);
            gameBoard[row][col] = ZERO;
        }
        cheiHod +=1;
        cheiHod %=2;
        countHodov ++; 
    }

    let winnerCeils = checkWinner();
    if (winnerCeils !== null){
        gameOver = true;
        for (let ceil of winnerCeils){
            renderSymbolInCell(gameBoard[ceil[0]][ceil[1]], ceil[0], ceil[1], 'red' );
        }
        let winner = cheiHod === 0 ? ZERO : CROSS;
        alert(`${winner} победил!`)
    }
    else if (countHodov === 9)   {
        alert('Ничья!');
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    startGame();
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
