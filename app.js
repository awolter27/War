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
let cardsInComputerDeck = 0;
let cardsInPlayerDeck = 0;
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
    cardsInComputerDeck = 26;
    cardsInPlayerDeck = 26;
    computerDeckDown.innerHTML = 'Cards In Deck: 26';
    playerDeckDown.innerHTML = 'Cards In Deck: 26';
    roundNumber = 1;
    round.innerHTML = 'Round: 1';
    showDrawBtn();
}

function draw() {
    let computerCard = computer.shift();
    let playerCard = player.shift();
    cardsInComputerDeck--;
    cardsInPlayerDeck--;
    computerDeckDown.innerHTML = `Cards In Deck: ${cardsInComputerDeck}`;
    playerDeckDown.innerHTML = `Cards In Deck: ${cardsInPlayerDeck}`;
    computerDeckUp.innerHTML = `${computerCard}`;
    playerDeckUp.innerHTML = `${playerCard}`;
    if (values.indexOf(playerCard[0]) > values.indexOf(computerCard[0])) {
        roundNumber++;
        round.innerHTML = `Round: ${roundNumber}`;
        winner.innerHTML = `Winner: Player has won round ${roundNumber}`;
    } else if (values.indexOf(playerCard[0]) < values.indexOf(computerCard[0])) {
        roundNumber++;
        round.innerHTML = `Round: ${roundNumber}`
        winner.innerHTML = `Winner: Computer has won round ${roundNumber}`;
    } else if (values.indexOf(playerCard[0]) === values.indexOf(computerCard[0])) {
        showWarBtn();
    }

    // need to grab the value of the first card in the array to flip up for both players and then update the inner HTML for the computer-deck-up and player-deck-up to reflect the value on the screen as well as delete that specific card from the array. The values need to be compared. The highest value wins.
    //// if the computer wins
    // add 2 to the variable cardsInComputerDeck
    // update HTML: computerDeckDown.innerHTML = `Cards In Deck: ${cardsInComputerDeck}`
    // the two cards that were won will go into the bottom of their deck (at the end of the array .push())
    ////// if the player wins
    // add 2 to the variable cardsInPlayerDeck
    // update HTML: computerDeckDown.innerHTML = playerDeckDown.innerHTML = `Cards In Deck: ${cardsInPlayerDeck}`
    // the two cards that were won will go into the bottom of their deck (at the end of the array)
    ////// winner
    //the first player with 0 in their deck loses, the other player wins, log winner at the bottom, hide the draw and war buttons 
}

function war() {
    // after the war button is clicked, it should randomly choose 3 cards to place (faced down) in face up slot for comptuer and player, subtract 3 from the computer and player's "cards in deck: "
    hideWarBtn();
    showDrawBtn();
}

function restart() {
    deck = [];
    computer = [];
    player = [];
    cardsInComputerDeck = 0;
    cardsInPlayerDeck = 0;
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