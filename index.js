var inquirer = require("inquirer");
var Word = require("./word");

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var wordArray = ['you know nothing jon snow', 'cersei lannister', 'game of thrones', 'winter is coming', 'mother of dragons', 'khalissi', 'winterfell', 'daenerys targaryen', 'samuel tarly', 'iron throne', 'arya stark', 'sansa stark', 'white walkers', 'tyrion lannister', 'the hound'];
;

var selectedWord;
var word;

var getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var selectRandomWord = () => {
  selectedWord = wordArray[getRandomIntInclusive(0, wordArray.length - 1)];
};

var isLetter = (guess) => {
  if ((alphabet.indexOf(guess) < 0) || (guess === '')) {
    console.log(`...that's not a letter...try again`);
    return 0;
  }
  else {
    return 1;
  }
};

var round = () => {
  word.updateWordDisplay();
  console.log(' ');
  inquirer.prompt([
    { name: 'guess',
      message: 'What letter would you like to guess?'
    },
  ]).then((response) => {
    var guess = response.guess.toLowerCase();
    if (guess === 'exit') {
      process.exit();
    }
    else {
      if (isLetter(guess) === 1) {
        if (word.checkGuess(guess) === 0) {
          playAgain();
        }
        else {
          round();
        }
      }
      else {
        round();
      }
    }
  });
};

var game = () =>{
  console.clear();
  gameInProgress = true;
  selectRandomWord();
  word = new Word(selectedWord);
  word.makeLetterArray();
  round();
};

var playAgain = () => {
  inquirer.prompt([
    { type: 'list',
      name: 'playAgain',
      message: 'Would you like to play again?',
      choices: ['Yes', 'No']
    },
  ]).then(function (response) {
    var playAgain = response.playAgain;
    if (playAgain === 'No') {
      console.log('Ok, see you next time!');
      process.exit();
    }
    else {
      game();
    }
  });
};

game();