//Variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const ul = document.querySelector('#phrase ul');

//Phrases
const phrases = ['rain or shine',
    'see eye to eye',
    'when pigs fly',
    'break a leg',
    'bite the bullet'];

//Hide Overlay
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//getRandomPhrasesAsArray function
function getRandomPhrasesAsArray(phrases){
    const random = Math.floor(Math.random()* phrases.length);
    return phrases[random].split('');
}

//Set game display
function addPhraseToDisplay(arr){
    
    for(let i = 0; i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.append(li);

        if (li.textContent !== ' ') {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
    }
}

let phraseArray = getRandomPhrasesAsArray(phrases);
addPhraseToDisplay(phraseArray);

//Create checkLetter function
function checkLetter(button){
    const letters = document.querySelectorAll('.letter');
    let match = null;

    letters.forEach((letters) => {
        if(letters.textContent === button.textContent){
            letters.classList.add('show');
            match = letters.textContent;
        }
    });
    return match;
}

// Keyboard eventlistener
qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')){
        const button = e.target;
        button.classList.add('chosen');
        button.disabled = true;
        
        const foundLetter = checkLetter(button)
    
    if(!foundLetter) {
        const tries = document.querySelectorAll('.tries');
          const lostHeart = document.createElement('img');
          lostHeart.src = 'images/lostHeart.png';
          tries[missed].innerHTML = '';
          tries[missed].appendChild(lostHeart);
          missed++; 
    } 
    checkWin();
    }
});

//checkWin function
function checkWin(){
    let total = document.querySelectorAll('.letter');
    let shown = document.querySelectorAll('.show');
    if(total.length === shown.length){
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'You Win!';
        startButton.remove()
    } else if (missed >= 5){
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'You Lose!';
        startButton.remove()
    }
}













