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

const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♣', '♦', '♥', '♠'];

let deck = [];
let computer = [];
let player = [];
let computerCard = [];
let playerCard = [];
let warPlaceholder = [];
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
        let randomIdx1 = Math.floor(Math.random() * deck.length);
        let randomIdx2 = Math.floor(Math.random() * deck.length);
        let randomIdx1Placeholder = deck[randomIdx1];
        deck[randomIdx1] = deck[randomIdx2];
        deck[randomIdx2] = randomIdx1Placeholder;
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
    computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
    playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
}

function play() {
    if (computer.length === 0 && player.length === 0) {
        deal();
        showDrawBtn();
    } 
}

function drawAndCompare() {
    if (computer.length > 0 && player.length > 0) {
        computerCard = computer.shift();
        playerCard = player.shift();
        roundNumber++;
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        computerDeckUp.innerHTML = computerCard;
        playerDeckUp.innerHTML = playerCard;
        round.innerHTML = `Round: ${roundNumber}`;
        if (values.indexOf(computerCard.slice(0, -1)) > values.indexOf(playerCard.slice(0, -1))) {
            computer.push(computerCard, playerCard);
            computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
            playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: Computer won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard.slice(0, -1)) < values.indexOf(playerCard.slice(0, -1))) {
            player.push(playerCard, computerCard);
            computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
            playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: Player won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard.slice(0, -1)) === values.indexOf(playerCard.slice(0, -1))) {
            warPlaceholder.push(computerCard, playerCard);
            hideDrawBtn();
            showWarBtn();
            winner.innerHTML = `Winner: Round ${roundNumber} is a tie!`;
        }
    }
    if (computer.length === 0) {
        hideDrawBtn();
        hideWarBtn();
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        winner.innerHTML = 'Winner: Player!';
    } else if (player.length === 0) {
        hideDrawBtn();
        hideWarBtn();
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        winner.innerHTML = 'Winner: Computer!';
    }
}

function warAndCompare() {
    if (computer.length > 3 && player.length > 3) {
        computerCard = computer.splice(0, 4);
        playerCard = player.splice(0, 4);
        roundNumber++;
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        computerDeckUp.innerHTML = computerCard[3];
        playerDeckUp.innerHTML = playerCard[3];
        round.innerHTML = `Round: ${roundNumber}`
        if (values.indexOf(computerCard[3].slice(0, -1)) > values.indexOf(playerCard[3].slice(0, -1))) {
            computer.push(computerCard, playerCard, warPlaceholder);
            computer = computer.flat();
            warPlaceholder = [];
            hideWarBtn();
            showDrawBtn();
            computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
            playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: Computer won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard[3].slice(0, -1)) < values.indexOf(playerCard[3].slice(0, -1))) {
            player.push(playerCard, computerCard, warPlaceholder);
            player = player.flat();
            warPlaceholder = [];
            hideWarBtn();
            showDrawBtn();
            computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
            playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: Player won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard[3].slice(0, -1)) === values.indexOf(playerCard[3].slice(0, -1))) {
            showWarBtn();
            winner.innerHTML = `Winner: Round ${roundNumber} is a tie!`;
        }
    } else if (computer.length < 4) {
        player.push(playerCard, computerCard, warPlaceholder);
        player = player.flat();
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        hideWarBtn();
        winner.innerHTML = 'Computer has insufficient cards to go to war. Winner: Player!';;
    } else if (player.length < 4) {
        computer.push(computerCard, playerCard, warPlaceholder);
        computer = computer.flat();
        computerDeckDown.innerHTML = `Cards In Deck: ${computer.length}`;
        playerDeckDown.innerHTML = `Cards In Deck: ${player.length}`;
        hideWarBtn();
        winner.innerHTML = 'Player has insufficient cards to go to war. Winner: Computer!';
    }
}

function restart() {
    deck = [];
    computer = [];
    player = [];
    warPlaceholder = [];
    roundNumber = 0;
    hideDrawBtn();
    hideWarBtn();
    computerDeckDown.innerHTML = 'Cards In Deck: 0';
    playerDeckDown.innerHTML = 'Cards In Deck: 0';
    computerDeckUp.innerHTML = '';
    playerDeckUp.innerHTML = '';
    round.innerHTML = 'Round: 0';
    winner.innerHTML = 'Winner:';
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
drawBtn.addEventListener('click', drawAndCompare);
warBtn.addEventListener('click', warAndCompare);