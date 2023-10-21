'use strict';
const diceElem = document.querySelector('.dice');
const score0Elem = document.getElementById("score--0")
const score1Elem = document.getElementById("score--1");
const current0Elem = document.getElementById("current--0")
const current1Elem = document.getElementById("current--1");
const rollButtonElem = document.querySelector('.btn--roll');
const newGameButtonElem = document.querySelector('.btn--new');
const holdButtonElem = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--1');
const player0 = document.querySelector('.player--0');
const name0Elem = document.getElementById("name--0");
const name1Elem = document.getElementById("name--1");

let player1_score = 0;
let player1_current = 0;
let player0_score = 0;
let player0_current = 0;

let currentPlayer = player0;
let alternatePlayer = player1;

let activePlayer = 0;

diceElem.classList.add('hidden');
score0Elem.textContent = 0;
score1Elem.textContent = 0;

const getDiceRoll = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


rollButtonElem.addEventListener('click', ()=>{
    const diceVal = getDiceRoll(1, 6);
    console.log(diceVal);
    diceElem.classList.remove("hidden");
    diceElem.src = `dice-${diceVal}.png`;

    if(activePlayer === 0){
        if(diceVal===1){
            player0_current = 0;
        }else{
            player0_current += diceVal;
        }
        current0Elem.textContent = player0_current;
    }else{
        if(diceVal===1){
            player1_current = 0;
        }else{
            player1_current += diceVal;
        }
        current1Elem.textContent = player1_current;
    }

    if(diceVal===1) SwitchPlayer();
})

holdButtonElem.addEventListener('click', ()=>{
    if(activePlayer===0){
        player0_score += player0_current;
        score0Elem.textContent = player0_score;
        player0_current = 0;
        current0Elem.textContent = player0_current;
        if(player0_score>=10){
            holdButtonElem.disabled = true;
            rollButtonElem.disabled = true;
            player0.classList.add("player--winner");
        }
    }else{
        player1_score += player1_current;
        score1Elem.textContent = player1_score;
        player1_current = 0;
        current1Elem.textContent = player1_current;
        if(player1_score>=10){
            holdButtonElem.disabled = true;
            rollButtonElem.disabled = true;
            player1.classList.add("player--winner");
        }
    }
    SwitchPlayer();
})

newGameButtonElem.addEventListener('click', ()=>{
    //Hide dice 
    diceElem.classList.add('hidden');

    //Reset active player
    activePlayer = 0;

    //Enable buttons
    holdButtonElem.disabled = false;
    rollButtonElem.disabled = false;

    //Reset player 1
    player0_score = 0;
    score0Elem.textContent = player0_score;
    player0_current = 0;
    current0Elem.textContent = player0_current;
    player0.classList.remove("player--winner");
    player0.classList.add('player--active');

    //Reset player 2
    player1_score = 0;
    score1Elem.textContent = player1_score;
    player1_current = 0;
    current1Elem.textContent = player1_current;
    player1.classList.remove("player--winner");
    player1.classList.remove('player--active');

    
})

function SwitchPlayer(){

    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    activePlayer = activePlayer?0:1;
    document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
}
