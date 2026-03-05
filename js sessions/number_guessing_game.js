// return a random number between given range
function genSecret() {
  return Math.floor(Math.random() * 100) + 1;
}

var secret = genSecret();

var attempts = 0;

function playGame() {
  while (true) {
    attempts += 1;
    var guess = parseInt(prompt("Enter your guess (1-100) : "));
    if (guess > secret) {
      alert("Too High! Try Low");
    } else if (guess < secret) {
      alert("Too Low! Try High");
    } else {
      alert(
        `Congratulations! You've guessed the correct number '${secret}' in ${attempts} attempts`
      );
      break;
    }
  }
}
