const playBtn = document.querySelector('.play');
const restartBtn = document.querySelector('.restart');
const drawBtn = document.querySelector('.draw');
const warBtn = document.querySelector('.go-to-war');

const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♣', '♦', '♥', '♠'];
const deck = [];

let computerDeckDown = document.querySelector('.computer-deck-down');
let playerDeckDown  = document.querySelector('.player-deck-down');
let winner = document.querySelector('.winner');

function deckOfCards() {
    let cards = []
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            cards = `${values[i]}${suits[j]}`
            deck.push(cards);
        }
    }
    return deck;
}

function play() {
    // after the play button is clicked, it should randomly place half the deck into each players personal decks
    computerDeckDown.innerHTML = 'Cards In Deck: 26';
    playerDeckDown.innerHTML = 'Cards In Deck: 26';
    showDrawBtn();
}

function restart() {
    computerDeckDown.innerHTML = 'Cards In Deck: 0';
    playerDeckDown.innerHTML = 'Cards In Deck: 0';
    // reset computerDeckUp to nothing
    // reset playerDeckUp to nothing
    winner.innerHTML = 'Winner:';
    hideDrawBtn();
    hideWarBtn();
}

function draw() {
    // after the draw button is clicked, it should randomly choose 1 card from each deck (computer, player) to turn over in face up slot, subtract 1 to computer and player's "cards in deck: 25"
    // if computer wins, add 2 to computer's "cards in deck: 28", allow player to hit draw again to start the next round
    // if player wins, add 2 to player's "cards in deck:", allow player to hit draw again to start the next round
    // if there's a tie, hide the draw button, show the war button, so the player can click run the war function
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