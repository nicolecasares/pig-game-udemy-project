/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

function init(){
	

	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
};






//document.querySelector('#current-' + activePlayer).textContent = dice;

//('#current-' + activePlayer) this works bc type coerstion makes all this into current-0
// this is more dynamic then writting #current-0
//.textcontent can only set plain text not html
//.innerHTML can change the something using html tags

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//need to make em a sting or else Javascript parser will think that it is some javascript code and come back with an error

//we used the querySelector method to manipulate, to change values and elements of our web page 
//we can also use this method to only read elements from our webpage and then store them for ex a variable

var x = document.querySelector('#score-0').textContent;
console.log(x);  

//setter - because you set a value
//getter - because you get a value 


//you can also use querySelector to change the css

// document.querySelector('.dice').style.display = 'none';

// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){

		//1. Random number
		 var dice = Math.floor(Math.random()*6)+1;
		//2/ display the result 
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';  
		//3.Update the round score but only if the roll number was NOT a 1
		if(dice !== 1){
			//add score
			//first update round score
			roundScore += dice;
			//second display score in the interface
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else{
			//next player
			nextPlayer();

			};
	}

});	 

//addEventListener has two arguments the first is the event type the second is the function 
//if you want to add an external function just add the name with no ()
//this is bc we are not calling the funtion the .addEventListener is calling the function for us
//callback function is a function that we pass into another function as an argument 
//this has an anonymous function bc it does not have a name 


document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
				//add current score to players global score 
		scores[activePlayer] += roundScore;

		//update the ui
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			

		//cheak if player won the game 

		if(scores[activePlayer] >= 20){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}else{
			nextPlayer();
		}

		

		}

});



function nextPlayer() {
			//1. change the var of active player
			//I am going to use a ternary operator bc it is easier to write but is still an if statment 
			activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
			//set the round score back to 0
			roundScore = 0;
			document.getElementById('current-0').textContent = '0';
			document.getElementById('current-1').textContent = '0';

			document.querySelector('.player-0-panel').classList.toggle('active');
			document.querySelector('.player-1-panel').classList.toggle('active');


			//document.querySelector('.player-0-panel').classList.remove('active');
			//document.querySelector('.player-1-panel').classList.add('active');

			document.querySelector('.dice').style.display = 'none';
};



document.querySelector('.btn-new').addEventListener('click', init);







