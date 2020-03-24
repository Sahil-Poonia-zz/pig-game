var scores, roundScore, activePlayer;

function reset() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('name-0').style.color = 'rgb(33, 37, 41)';
    document.getElementById('name-1').style.color = 'rgb(33, 37, 41)';

    document.getElementById('winner-0').style.display = 'none';
    document.getElementById('winner-1').style.display = 'none';

    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-hold').disabled = false;

    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    (activePlayer === 0) ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

reset(); // to reset everything at starting

document.querySelector('.btn-roll').addEventListener('click', function () {
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. update the round score if the rolled number was not a 1
    if (dice != 1) {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    //1. adding round score to global score of active player
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //2. checking total score of active player
    if (scores[activePlayer] >= 100) {
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('#name-' + activePlayer).style.color = 'rgb(235, 77, 77)';
        document.getElementById('winner-' + activePlayer).style.display = 'block';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
        return;
    }

    //3. next player
    nextPlayer();
});

document.querySelector('.btn-new').addEventListener('click', reset);

document.querySelector('.btn-instruct').addEventListener('click', function() {
    document.getElementById('instructions').classList.remove('hide');
});

document.querySelector('.btn-close').addEventListener('click', function() {
    document.getElementById('instructions').classList.add('hide');
});