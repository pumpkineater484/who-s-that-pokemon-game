
let pokemonData = [];
let currentPokemonIndex = 0;
let timerInterval;
let timeRemaining = 10;
let score = 0;


fetch('https://pokeapi.co/api/v2/pokemon/?limit=151') 
  .then(response => response.json())
  .then(data => {
    pokemonData = data.results;
    startGame();
  })
  .catch(error => {
    
  });

function startGame() {
  showPokemon();
  startTimer();
}

function showPokemon() {
  currentPokemonIndex = Math.floor(Math.random() * pokemonData.length);
  const pokemonName = pokemonData[currentPokemonIndex].name;
  fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonIndex + 1}.png`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      document.getElementById('pokemon-image').src = objectURL;
      
    })
  setTimeout(() => {
    document.getElementById('pokemon-image').style.opacity = 1;
  }, 2000);

}


function checkAnswer() {
  const userAnswer = document.getElementById('pokemon-name').value.toLowerCase();
  const correctAnswer = pokemonData[currentPokemonIndex].name.toLowerCase();
  const scoreDisplay = document.getElementById("score");



    function showResult(message) {
      const resultElement = document.getElementById('result');
      resultElement.textContent = message;
      
      setTimeout(() => {
        resultElement.textContent = ""; 
      }, 1000); 
    
    }
  if (userAnswer === correctAnswer) {
    showResult('Correct!');
    score++; 
        scoreDisplay.textContent = "Score: " + score;
  } else {
    showResult(`Incorrect. The answer was ${correctAnswer}.`);
  }

  document.getElementById('pokemon-name').value = '';
  showPokemon(); 
}

function showResult(message) {
  document.getElementById('result').textContent = message;
}

const image = document.getElementById("pokemon-image");
const button = document.getElementById("myButton");

button.addEventListener("click", function() {
  image.style.filter = "none";

  setTimeout(function() {
    image.style.filter = 'grayscale(100%) brightness(0%)';
  }, 400);
});

const scoreDisplay = document.getElementById("score");
