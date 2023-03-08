const playBtn = document.querySelector('.play');
const restartBtn = document.querySelector('.restart');
const drawBtn = document.querySelector('.draw');
const warBtn = document.querySelector('.war');

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

playBtn.addEventListener('click', play);
restartBtn.addEventListener('click', restart);
drawBtn.addEventListener('click', drawAndCompare);
warBtn.addEventListener('click', warAndCompare);

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
        showDrawBtn();
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
            winner.innerHTML = `Winner: Player won round ${roundNumber}!`;
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
        winner.innerHTML = 'Winner: Player!';

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
            winner.innerHTML = `Winner: Player won round ${roundNumber}!`;
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
        winner.innerHTML = 'Computer has insufficient cards to go to war. Winner: Player!';
    } else if (player.length < 4) {
        computer.push(warPlaceholder, player);
        computer = computer.flat();
        player = [];
        hideWarBtn();
        computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
        playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
        winner.innerHTML = 'Player has insufficient cards to go to war. Winner: Computer!';
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
    computerCardsInDeck.innerHTML = `Cards In Deck: ${computer.length}`;
    playerCardsInDeck.innerHTML = `Cards In Deck: ${player.length}`;
    // Attempt 1:
        // computerDeckUp.style.display = '.deck';
        // playerDeckUp.style.display = '.deck';
    // Attempt 2:
        // computerDeckUp.style.display = 'none';
        // playerDeckUp.style.display = 'none';
    // Attempt 3:
        // computerDeckUp.style.backgroundImage = 'none';
        // playerDeckUp.style.backgroundImage = 'none';
    // Attempt 4:
        // computerDeckUp.style.display = '.computer-deck-up';
        // playerDeckUp.style.display = '.player-deck-up';
    // Attempt 5:
        // computerDeckUp.style.background-color = 'rgb(158, 174, 180)';
        // computerDeckUp.style.border = 'black solid 0.06em';
        // computerDeckUp.style.border-radius = '5%';
        // computerDeckUp.style.color = 'rgb(255, 255, 255)';
        // computerDeckUp.style.float = 'left';
        // computerDeckUp.style.font-size = '4.5em';
        // computerDeckUp.style.height = '6em';
        // computerDeckUp.style.margin = '20px';
        // computerDeckUp.style.padding = '125px 1px';
        // computerDeckUp.style.width = '5em';
    // Attempt 6:
        // computerDeckUp.style.display.background-color = 'rgb(158, 174, 180)';
        // computerDeckUp.style.display.border = 'black solid 0.06em';
        // computerDeckUp.style.display.border-radius = '5%';
        // computerDeckUp.style.display.color = 'rgb(255, 255, 255)';
        // computerDeckUp.style.display.float = 'left';
        // computerDeckUp.style.display.font-size = '4.5em';
        // computerDeckUp.style.display.height = '6em';
        // computerDeckUp.style.display.margin = '20px';
        // computerDeckUp.style.display.padding = '125px 1px';
        // computerDeckUp.style.display.width = '5em';
    // Attempt 7:
        // computerDeckUp.background-color = 'rgb(158, 174, 180)';
        // computerDeckUp.border = 'black solid 0.06em';
        // computerDeckUp.border-radius = '5%';
        // computerDeckUp.color = 'rgb(255, 255, 255)';
        // computerDeckUp.float = 'left';
        // computerDeckUp.font-size = '4.5em';
        // computerDeckUp.height = '6em';
        // computerDeckUp.margin = '20px';
        // computerDeckUp.padding = '125px 1px';
        // computerDeckUp.width = '5em';
    // Attempt 8:
        // computerDeckUp.style.visibility = 'hidden';
    // Attempt 9:
        // computerDeckUp.style.backgroundImage = `url("")`;
        // playerDeckUp.style.backgroundImage = `url("")`;
    // Attempt 10:
        // computerDeckUp.style.backgroundImage;
        // playerDeckUp.style.backgroundImage;
    // Attempt 11: 
        //
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
    document.querySelector('.war').style.display = 'inline-block';
}

function hideWarBtn() {
    document.querySelector('.war').style.display = 'none';
}