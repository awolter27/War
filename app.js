const submitBtn = document.querySelector('.submit');
const playBtn = document.querySelector('.play');
const restartBtn = document.querySelector('.restart');
const drawBtn = document.querySelector('.draw');
const warBtn = document.querySelector('.war');

const textInput = document.querySelector('.text');
const username = document.querySelector('.player')
const computerDeckDown = document.querySelector('.computer-deck-down');
const playerDeckDown = document.querySelector('.player-deck-down');
const computerDeckUp = document.querySelector('.computer-deck-up');
const playerDeckUp = document.querySelector('.player-deck-up');
const computerCardsInDeck = document.querySelector('.computer-cards-in-deck');
const playerCardsInDeck = document.querySelector('.player-cards-in-deck');
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

computerDeckDown.style.backgroundImage = `url("./Card_Images/Back.png")`;
playerDeckDown.style.backgroundImage = `url("./Card_Images/Back.png")`;
computerDeckDown.classList.add('border');
playerDeckDown.classList.add('border');

submitBtn.addEventListener('click', submit);
playBtn.addEventListener('click', play);
restartBtn.addEventListener('click', restart);
drawBtn.addEventListener('click', drawAndCompare);
warBtn.addEventListener('click', warAndCompare);

function submit() {
    username.innerHTML = textInput.value;
    hideTextInput();
    hideSubmitBtn();
    showDrawBtn();
}

function deckOfCards() {
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = `${values[i]}${suits[j]}`
            deck.push(card);
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
    computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
    playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
}

function play() {
    if (computer.length === 0 && player.length === 0) {
        deal();
        showTextInput();
        showSubmitBtn();
    }
}

function drawAndCompare() {
    if (computer.length > 0 && player.length > 0) {
        computerCard = computer.shift();
        playerCard = player.shift();
        roundNumber++;
        computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
        playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
        computerDeckUp.style.backgroundImage = `url("./Card_Images/${computerCard}.png")`;
        playerDeckUp.style.backgroundImage = `url("./Card_Images/${playerCard}.png")`;
        computerDeckUp.classList.add('border');
        playerDeckUp.classList.add('border');
        round.innerHTML = `Round: ${roundNumber}`;
        if (values.indexOf(computerCard.slice(0, -1)) > values.indexOf(playerCard.slice(0, -1))) {
            computer.push(computerCard, playerCard);
            computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
            playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: Computer won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard.slice(0, -1)) < values.indexOf(playerCard.slice(0, -1))) {
            player.push(playerCard, computerCard);
            computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
            playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: ${username.innerHTML} won round ${roundNumber}!`;
        } else {
            warPlaceholder.push(computerCard, playerCard);
            warPlaceholder = warPlaceholder.flat();
            hideDrawBtn();
            showWarBtn();
            winner.innerHTML = `Winner: Round ${roundNumber} is a tie!`;
        }
    }
    if (computer.length === 0) {
        hideDrawBtn();
        hideWarBtn();
        computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
        playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
        winner.innerHTML = `Winner: ${username.innerHTML}!`;

    } else if (player.length === 0) {
        hideDrawBtn();
        hideWarBtn();
        computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
        playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
        winner.innerHTML = 'Winner: Computer!';
    }
}

function warAndCompare() {
    if (computer.length > 3 && player.length > 3) {
        computerCard = computer.splice(0, 4);
        playerCard = player.splice(0, 4);
        roundNumber++;
        computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
        playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
        computerDeckUp.style.backgroundImage = `url("./Card_Images/${computerCard[3]}.png")`;
        playerDeckUp.style.backgroundImage = `url("./Card_Images/${playerCard[3]}.png")`;
        computerDeckUp.classList.add('border');
        playerDeckUp.classList.add('border');
        round.innerHTML = `Round: ${roundNumber}`
        if (values.indexOf(computerCard[3].slice(0, -1)) > values.indexOf(playerCard[3].slice(0, -1))) {
            computer.push(computerCard, playerCard, warPlaceholder);
            computer = computer.flat();
            warPlaceholder = [];
            hideWarBtn();
            showDrawBtn();
            computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
            playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: Computer won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard[3].slice(0, -1)) < values.indexOf(playerCard[3].slice(0, -1))) {
            player.push(playerCard, computerCard, warPlaceholder);
            player = player.flat();
            warPlaceholder = [];
            hideWarBtn();
            showDrawBtn();
            computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
            playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
            winner.innerHTML = `Winner: ${username.innerHTML} won round ${roundNumber}!`;
        } else if (values.indexOf(computerCard[3].slice(0, -1)) === values.indexOf(playerCard[3].slice(0, -1))) {
            warPlaceholder.push(computerCard, playerCard);
            warPlaceholder = warPlaceholder.flat();
            showWarBtn();
            winner.innerHTML = `Winner: Round ${roundNumber} is a tie!`;
        }
    } else if (computer.length < 4) {
        player.push(warPlaceholder, computer);
        player = player.flat();
        computer = [];
        hideWarBtn();
        computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
        playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
        winner.innerHTML = `Computer has insufficient cards to go to war. Winner: ${username.innerHTML}!`;
    } else if (player.length < 4) {
        computer.push(warPlaceholder, player);
        computer = computer.flat();
        player = [];
        hideWarBtn();
        computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
        playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
        winner.innerHTML = `${username.innerHTML} has insufficient cards to go to war. Winner: Computer!`;
    }
}

function restart() {
    deck = [];
    computer = [];
    player = [];
    computerCard = [];
    playerCard = [];
    warPlaceholder = [];
    roundNumber = 0;
    hideDrawBtn();
    hideWarBtn();
    textInput.value = '';
    username.innerHTML = 'Player';
    computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
    playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
    computerDeckUp.style = ''; 
    playerDeckUp.style = '';
    computerDeckUp.classList.remove('border');
    playerDeckUp.classList.remove('border');
    round.innerHTML = 'Round: 0';
    winner.innerHTML = 'Winner:';
}

function showTextInput() {
    textInput.style.display = 'inline-block';
}

function hideTextInput() {
    textInput.style.display = 'none';
}

function showSubmitBtn() {
    submitBtn.style.display = 'inline-block';
}

function hideSubmitBtn() {
    submitBtn.style.display = 'none';
}

function showDrawBtn() {
    drawBtn.style.display = 'inline-block';
}

function hideDrawBtn() {
    drawBtn.style.display = 'none';
}

function showWarBtn() {
    warBtn.style.display = 'inline-block';
}

function hideWarBtn() {
    warBtn.style.display = 'none';
}