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


var answer = "";
var maxWrong = 6;
var mistakes = 0;
var guessed = [];
var wordStatus = null;


function randomWord() {
  answer = word[Math.floor(Math.random() * word.length)];
}


/*  Splits the answer and maps the array and checks if the letter exsists in each individual guessed array of letters */
function guessedWord() {
  wordStatus = answer.split('').map(function (letter) {
    return guessed.indexOf(letter) >= 0 ? letter : " _ ";
  }).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}


/* DRY method of creating the keyboard instead of using html divs */
function generateButtons() {
  var buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(function (letter) {
    return `
    <button
      class="btn btn-lg btn-dark m-2"
      id='` + letter + `'
      onClick="handleGuess('` + letter + `')"
    >
      ` + letter + `
    </button>
    `;
  }).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

document.getElementById("maxWrong").innerHTML = maxWrong;


/* Checking if passed chosenLetter exsists, if it does we do nothing and if it does not we push the guessed chosenLetter into the aray */
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
    document.getElementById("keyboard").innerHTML = "Congrats, You Won!";
    document.getElementById("text").innerHTML = "";
  }
}


function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById("keyboard").innerHTML = "You Lost!";
    document.getElementById("text").innerHTML = "";
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


/*  Does this method ever get used in production?
function reset() {
    location.reload()
}
*/


updateHangmanPicture();
randomWord();
generateButtons();
guessedWord();