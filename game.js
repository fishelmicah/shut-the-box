const dice1 = document.querySelector('#dice1');
const dice2 = document.querySelector('#dice2');
const startBtn = document.querySelector('#start-game');
const rollBtn = document.querySelector('#roll');
const individualDiceBtn = document.querySelector('#individual');
const sumDiceBtn = document.querySelector('#sum');
const endTurnBtn = document.querySelector('#end-turn');
const player1NameInput = document.querySelector('#text-input1');
const player2NameInput = document.querySelector('#text-input2');
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const startPage = document.querySelector('.players');
const gameBoard = document.querySelector('.board');
const gameOverPage = document.querySelector("#game-over");
const playerNameDisplay = document.querySelector('.player-name');
const cards = document.querySelectorAll('.board-numbers');
const roundText = document.querySelector('#round');
const table = document.querySelector('#table');
const playAgain = document.querySelector('#play-again-btn');
const player1TotalPoints = document.querySelector('#player1-total-points')
const player2TotalPoints = document.querySelector('#player2-total-points')
const tbody = document.querySelector('tbody')


let playerTurn = 1;
let round = 1;
let die1 = 0;
let die2 = 0;
let p1TotalPoints = 0;
let p2TotalPoints = 0;
let p1Name = '';
let p2Name = '';

startBtn.addEventListener('click', function(){
    p1Name = player1NameInput.value.trim();
    p2Name = player2NameInput.value.trim();

    if(p1Name && p2Name){
        startPage.style.display = 'none';
        gameBoard.style.display = 'flex';
        table.style.display = 'block';
        document.querySelector('#p1name').textContent = p1Name
        document.querySelector('#p2name').textContent = p2Name
    }
    playerNameDisplay.textContent = `${p1Name}'s turn`;
    roundText.textContent = `round ${round}`;

})

rollBtn.addEventListener('click', function(){
    die1 = Math.floor(Math.random()*6) + 1
    die2 = Math.floor(Math.random()*6) + 1
    dice1.className = `bi bi-dice-${die1}-fill`
    dice2.className = `bi bi-dice-${die2}-fill`
    rollBtn.disabled=true
    if (die1===die2 || boxes[die1] === 'X' || boxes[die2] === 'X'){
        individualDiceBtn.disabled=true;
    } else {
        individualDiceBtn.disabled=false
    }
    if(die1 + die2 > 9 || boxes[die1+die2] === 'X'){
        sumDiceBtn.disabled = true;
    } else {
        sumDiceBtn.disabled = false;
    }
    if(individualDiceBtn.disabled && sumDiceBtn.disabled){
        endTurnBtn.disabled = false;
    }
})
individualDiceBtn.addEventListener('click', function(){
    shut(die1);
    shut(die2);
    startNew()
})

sumDiceBtn.addEventListener('click', function(){
    shut(die1+die2);
    startNew()
})
endTurnBtn.addEventListener('click', function(){
    const points = 45-boxes[0];
    if (playerTurn === 1){
        p1TotalPoints += points;
        playerNameDisplay.textContent = `${p2Name}'s turn`
        playerTurn = 2
        const tableRow = buildRow(round, points)
        const tableBody = document.querySelector('tbody')
        const totPoints = document.querySelector('#tot-points')
        totPoints.insertAdjacentElement('beforebegin', tableRow)
        player1TotalPoints.textContent = p1TotalPoints
    } else {
        p2TotalPoints += points;
        playerNameDisplay.textContent = `${p1Name}'s turn`
        playerTurn = 1
        document.querySelector(`#round${round} .p2Pts`).textContent = points
        player2TotalPoints.textContent = p2TotalPoints
        round++
    }
    roundText.textContent = `round ${round}`
    resetBoard()
    startNew()
    endTurnBtn.disabled = true;
    if (round > 5){
        gameOver()
    }
})

playAgain.addEventListener('click', function(){
    gameOverPage.style.display = 'none';
    startPage.style.display = 'flex';

})

function shut(boxNumber){

    document.querySelector(`#card${boxNumber}`).classList.add('shut');
    boxes[boxNumber] = 'X';
    boxes[0] += boxNumber;
    document.querySelector(`#card${boxNumber}`).textContent ='X';
}
function startNew(){
    individualDiceBtn.disabled = true;
    sumDiceBtn.disabled = true;
    rollBtn.disabled = false;
}
function buildRow(roundNum, pointsNum){
    const tr = document.createElement('tr')
    const th = document.createElement('th')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    tr.id = `round${roundNum}`;
    th.textContent = `Round ${roundNum}`;
    tr.insertAdjacentElement('afterbegin', th)
    td1.textContent = pointsNum;
    th.insertAdjacentElement('afterend', td1)
    td1.classList.add('p1Pts')
    td1.insertAdjacentElement('afterend', td2)
    td2.classList.add('p2Pts')
    return tr
}
function resetBoard(){
    boxes.fill(0)
    cards.forEach((card, ind) => {
        card.classList.remove('shut')
        card.textContent = ind + 1;
    })
}
function gameOver(){
    const p1EndPoints = document.querySelector('.p1-end-points')
    const p2EndPoints = document.querySelector('.p2-end-points')
    gameBoard.style.display = 'none';
    gameOverPage.style.display = 'block';
    p1EndPoints.textContent = p1TotalPoints
    p2EndPoints.textContent = p2TotalPoints

    if (p1TotalPoints > p2TotalPoints){
        document.querySelector('h3').textContent = (`${p2Name} wins!!`)
    } else if (p1TotalPoints < p2TotalPoints){
        document.querySelector('h3').textContent = (`${p1Name} wins!!`)
    } else {
        document.querySelector('h3').textContent = (`you tied! Play again to determine a winner.`)
    }
    playerTurn = 1;
    round = 1;
    die1 = 0;
    die2 = 0;
    p1TotalPoints = 0;
    p2TotalPoints = 0;
    p1Name = '';
    p2Name = '';
    tbody.innerHTML = '';
    const firstTr = document.createElement('tr');
    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    th.textContent = "total points";
    td1.textContent = "0";
    td2.textContent = "0";
    firstTr.insertAdjacentElement('beforeend', th);
    firstTr.insertAdjacentElement('beforeend', td1);
    firstTr.insertAdjacentElement('beforeend', td2);

    firstTr.id = 'tot-points';
    tbody.insertAdjacentElement('afterbegin', firstTr);

}
