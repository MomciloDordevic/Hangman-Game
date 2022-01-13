var word = [
    "apple",
    "banana",
    "coffee",
    "table",
    "lamp",
    "candy",
    "paper",
    "pencil",
    "charger",
    "motinor",
    "keyboard",
    "mouse",
    "tea",
    "chair",
    "headphones",
    "socks",
    "phone",
    "flower",
    "spoon",
    "fork"
]


let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


function randomWord() {
    answer = word[Math.floor(Math.random() * word.length)];
}


function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}


function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-dark m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }

document.getElementById("maxWrong").innerHTML = maxWrong;


function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
}


function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "Congrats, You Won!"
    }
}


function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById("keyboard").innerHTML = "You Lost!"
    }
}


function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
}


function updateHangmanPicture() {
    document.getElementById('hangmanImage').src = './images/' + mistakes + '.png';
}


function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanImage').src = './images/0.png';
  
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}


function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanImage').src = './images/0.png';
  
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}


/*  Does this method ever get used in production?
function reset() {
    location.reload()
}
*/


updateHangmanPicture();
randomWord();
generateButtons();
guessedWord();