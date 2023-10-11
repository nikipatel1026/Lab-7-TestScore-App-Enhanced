let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

function getAvgScore() {
    let sum = 0;
    for (let i = 0; i < scoresArr.length; i++) {
        sum += scoresArr[i];
    }
    return sum / scoresArr.length;
}

function getHighScore() {
    let max = 0;
    let name = '';
    for (let i = 0; i < scoresArr.length; i++) {
        if (scoresArr[i] > max) {
            max = scoresArr[i];
            name = namesArr[i];
        }
    }
    return name + ' with a score of ' + max;
}

function initializeResults() {
    let avg = getAvgScore().toFixed(1);
    let high = getHighScore();
    $('#highScore').html(high);
    $('#avgScore').html(avg);
}

function displayScores() {
    $('#scores').toggle();
}

function displayResults() {
    $('#results').toggle();
}

function insertNewTableElement(newName, newScore) {
    $('#scores_table tr:last').after('<tr><td>' + newName + '</td><td>' + newScore + '</td></tr>');
}

function initializeScoresTable() {
    $('#scores_table tr').slice(1).remove();
    for (let i = 0; i < scoresArr.length; i++) {
        insertNewTableElement(namesArr[i], scoresArr[i]);
    }
}

function addScore() {
    let scoreInput = $('#score');
    let nameInput = $('#name');
    let score = parseInt(scoreInput.val());
    let name = nameInput.val();

    if (name.trim() === '' || isNaN(score) || score < 0 || score > 100) {
        alert('Name must not be empty, and Score must be a positive number between 0 and 100.');
        return;
    }

    scoresArr.push(score);
    namesArr.push(name);
    initializeScoresTable();
    scoreInput.val('');
    nameInput.val('');
    initializeResults();
    $('#scores').show();
    $('#results').show();
}
    

window.onload = function () {
    $('#display_results').on('click',  function() {
        displayResults();
    });
     
    $('#display_scores').on('click',  function() {
        displayScores();
    });
    $('#add').on('click',  function() {
        addScore();
    });

    let name = $('#name');
    let score = $('#score');

    name.focus();
    initializeResults();
    initializeScoresTable();

    // register jQuery extension
    // used for changing focus on enter ekey
    jQuery.extend(jQuery.expr[':'], {
        focusable: function(el, index, selector) {
            return $(el).is('a, button, :input, [tabindex]');
        }
    });

    //  Changes focus to next input on enter key
    $(document).on('keypress', 'input,select', function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            // Get all focusable elements on the page
            let $canfocus = $(':focusable');
            let index = $canfocus.index(this) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
        }
    });
}