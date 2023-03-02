const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♣', '♦', '♥', '♠'];

const playBtn = document.querySelector('.play');
const restartBtn = document.querySelector('.restart');
const drawBtn = document.querySelector('.draw');
const warBtn = document.querySelector('.go-to-war');
const computerDeckDown = document.querySelector('.computer-deck-down');
const playerDeckDown = document.querySelector('.player-deck-down');
const computerDeckUp = document.querySelector('.computer-deck-up');
const playerDeckUp = document.querySelector('.player-deck-up');
const round = document.querySelector('.round');
const winner = document.querySelector('.winner');

let deck = [];
let computer = [];
let player = [];
let roundNumber = 0;

function deckOfCards() {
    let cards = [];
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            cards = `${values[i]}${suits[j]}`
            deck.push(cards);
        }
    }
    return deck;
}

function shuffle() {
    deckOfCards();
    for (let i = 0; i < 1000; i++) {
        let randomIndex1 = Math.floor(Math.random() * deck.length);
        let randomIndex2 = Math.floor(Math.random() * deck.length);
        let placeholder = deck[randomIndex1];
        deck[randomIndex1] = deck[randomIndex2];
        deck[randomIndex2] = placeholder;
    }
}

function deal() {
    shuffle();
    for (let i = 0; i < 26; i++) {
        computer.push(deck[0]);
        deck.shift();
    }
    for (let i = 0; i < 26; i++) {
        player.push(deck[0]);
        deck.shift();
    }
}

function play() {
    deal();
    computerDeckDown.innerHTML = `Cards In Deck: 26`;
    playerDeckDown.innerHTML = `Cards In Deck: 26`;
    showDrawBtn();
}

function draw() {
    if (computer.length > 0 && player.length > 0) {
        let computerCard = computer.shift();
        let playerCard = player.shift();
        computerDeckUp.innerHTML = computerCard;
        playerDeckUp.innerHTML = playerCard;
        roundNumber++;
        round.innerHTML = `Round: ${roundNumber}`
        if (values.indexOf(computerCard[0]) > values.indexOf(playerCard[0])) {
            computer.push(computerCard, playerCard);
            computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
            winner.innerHTML = `Winner: Computer won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard[0]) < values.indexOf(playerCard[0])) {
            player.push(playerCard, computerCard);
            playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: Player won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard[0]) === values.indexOf(playerCard[0])) {
            hideDrawBtn();
            showWarBtn();
            winner.innerHTML = `Winner: Round ${roundNumber} is a tie!`;
        }
    } else if (computer.length = 0) {
        player.push(playerCard, computerCard);
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        hideDrawBtn();
        hideWarBtn();
        winner.innerHTML = 'Winner: Player!';
    } else if (player.length = 0) {
        computer.push(computerCard, playerCard);
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        hideDrawBtn();
        hideWarBtn();
        winner.innerHTML = 'Winner: Computer!';
    }
}

function war() {
    if (computer.length >= 4 && player.length >= 4) {
        let computerCardWar = computer.splice(0, 3);
        let playerCardWar = player.splice(0, 3);
        computerDeckUp.innerHTML = '';
        playerDeckUp.innerHTML = '';
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        hideWarBtn();
        showDrawBtn();
    } else if (computer.length < 4) {
        hideDrawBtn();
        hideWarBtn();
        winner.innerHTML = `Computer has insufficient cards to go to war. Winner: Player!`;
    } else if (player.length < 4) {
        hideDrawBtn();
        hideWarBtn();
        winner.innerHTML = `Player has insufficient cards to go to war. Winner: Computer!`;
    }
}

function restart() {
    deck = [];
    computer = [];
    player = [];
    computerDeckDown.innerHTML = 'Cards In Deck: 0';
    playerDeckDown.innerHTML = 'Cards In Deck: 0';
    roundNumber = 0;
    round.innerHTML = 'Round: 0';
    winner.innerHTML = 'Winner:';
    hideDrawBtn();
    hideWarBtn();
}

function showDrawBtn() {
    document.querySelector('.draw').style.display = 'inline-block';
}

function hideDrawBtn() {
    document.querySelector('.draw').style.display = 'none';
}

function showWarBtn() {
    document.querySelector('.go-to-war').style.display = 'inline-block';
}

function hideWarBtn() {
    document.querySelector('.go-to-war').style.display = 'none';
}

playBtn.addEventListener('click', play);
restartBtn.addEventListener('click', restart);
drawBtn.addEventListener('click', draw);
warBtn.addEventListener('click', war);