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
    // I want to randomly insert half of the cards from the deck to the player array and the other half of the cards from the deck to the computer array
    for (let i = 0; i < 26; i++) {
        computer.push(deck[i]);
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

function draw() {
    // after the draw button is clicked, it should randomly choose 1 card from each deck (computer, player) to turn over in face up slot, subtract 1 to computer and player's "cards in deck: 25"
    // if computer wins, add 2 to computer's "cards in deck: 28", update round by 1, allow player to hit draw again to start the next round
    // if player wins, add 2 to player's "cards in deck:", update round by 1, allow player to hit draw again to start the next round
    // if there's a tie, hide the draw button, show the war button, so the player can click run the war function
    // the first player with 0 in their deck loses, the other player wins, log winner at the bottom, hide the draw and war buttons 

    // When the button is clicked, it'll flash white for half a second and then go back to what it was, need to write .flash = white in css
    // const gameBtn = document.getElementById('gameBtn');
    // function colorSignal(){
    //     redBtn.classList.add('flash')
    //     setTimeout(() => { redBtn.classList.remove('flash')}, (500))
    // };
    // redBtn.addEventListener('click', colorSignal);
}

function war() {
    // after the war button is clicked, it should randomly choose 3 cards to place (faced down) in face up slot for comptuer and player, subtract 3 from the computer and player's "cards in deck: "
    hideWarBtn();
    showDrawBtn();
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