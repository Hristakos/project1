/*
    These are the winning combinations
*/
const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

/*
    List of all the teams and their names
*/
let teams = [
    {
        name: "Adelaide Crows",
        imgSrc: "url(images/Adelaide.svg)",
        scoreboardImg: "images/Adelaide.svg"
    },
    {
        name: "Brisbane Lions",
        imgSrc: "url(images/Brisbane.svg)",
        scoreboardImg: "images/Brisbane.svg"
    },
    {
        name: "Western Bulldogs",
        imgSrc: "url(images/Western-Bulldogs.svg)",
        scoreboardImg: "images/Western-Bulldogs.svg"
    },
    {
        name: "Carton Blues",
        imgSrc: "url(images/carlton.svg)",
        scoreboardImg: "images/carlton.svg"
    },
    {
        name: "Collingwood Magpies",
        imgSrc: "url(images/Collingwood.svg)",
        scoreboardImg: "images/Collingwood.svg"
    },
    {
        name: "Essendon Bombers",
        imgSrc: "url(images/Essendon.svg)",
        scoreboardImg: "images/Essendon.svg"
    },
    {
        name: "Fremantale Dockers",
        imgSrc: "url(images/Fremantle.svg)",
        scoreboardImg: "images/Fremantle.svg"
    },
    {
        name: "Geelong Cats",
        imgSrc: "url(images/Geelong.svg)",
        scoreboardImg: "images/Geelong.svg"
    },
    {
        name: "Gold Coast Suns",
        imgSrc: "url(images/Gold-Coast.svg)",
        scoreboardImg: "images/Gold-Coast.svg"
    },
    {
        name: "Greater Western Sydney Giants",
        imgSrc: "url(images/GWS.svg)",
        scoreboardImg: "images/GWS.svg"
    },
    {
        name: "Hawthorn Hawks",
        imgSrc: "url(images/Hawthorn.svg)",
        scoreboardImg: "images/Hawthorn.svg"
    },
    {
        name: "Melbourne Demons",
        imgSrc: "url(images/Melbourne.svg)",
        scoreboardImg: "images/Melbourne.svg"
    },
    {
        name: "North Melbourne Kangaroos",
        imgSrc: "url(images/North-Melbourne.svg)",
        scoreboardImg: "images/North-Melbourne.svg"
    },
    {
        name: "Port Adelaide Power",
        imgSrc: "url(images/Port-Adelaide.svg)",
        scoreboardImg: "images/Port-Adelaide.svg"
    },
    {
        name: "Richmond Tigers",
        imgSrc: "url(images/Richmond.svg)",
        scoreboardImg: "images/Richmond.svg"
    },
    {
        name: "St Kilda Saints",
        imgSrc: "url(images/St-Kilda.svg)",
        scoreboardImg: "images/St-Kilda.svg"
    },
    {
        name: "Sydney Swans",
        imgSrc: "url(images/Sydney.svg)",
        scoreboardImg: "images/Sydney.svg"
    },
    {
        name: "West Coast Eagles",
        imgSrc: "url(images/West-Coast-Eagles.svg)",
        scoreboardImg: "images/West-Coast-Eagles.svg"
    },

];

/* 
    home team and away teams to store data required
    to workout if we have a winner
*/
let homeTeam = {
    name: "",
    selections: [],
    imgSrc: "",
    score: 0
};

let awayTeam = {
    name: "",
    selections: [],
    imgSrc: "",
    score: 0
};

/* 
    This is used to alternate between teams
    Home team will always start first in the sequence
    of matches and then it will alternate between which team
    had the last turn before a result of win or draw if a
    team selection changes will start a new sequence of matches 
    and home team will go first.
*/
isHomeTeam = true;

/*
    Thes variables are used to determine what the game status is
    if we have used up all the attempts
*/
const maxAttempts = 9;
let attempts = 0;
let draw = 0;
let homeTeamInput = "";
let awayTeamInput = "";

/*
    DOM objects required to change the status of the game.
    update the screen display.
*/
let selectionAreas = document.querySelectorAll(".selection-area");
let rematchBtn = document.querySelector(".rematch-btn");
let homeTeamLogo = document.querySelector(".home-team-logo");
let homeScore = document.querySelector(".home-score");
let awayTeamLogo = document.querySelector(".away-team-logo");
let awayScore = document.querySelector(".away-score");
let homeTeamSelect = document.querySelector(".home-team");
let awayTeamSelect = document.querySelector(".away-team");
let displayGameResult = document.querySelector(".display-game-result");
let slideText = document.querySelector(".slide-Text");

/*
    Sound to play when a result has occured
*/
let playSiren = function () {
    let audio = new Audio('sounds/siren.m4a');
    audio.play();
};

/*
    Create the home team selections List
    and add to home team select object
*/


teams.forEach(function (team) {
    option = document.createElement("option");
    option.value = team.imgSrc;
    option.text = team.name;
    homeTeamSelect.appendChild(option);
});

/*
    Create the away team selections List
    and add to away team select object
*/
teams.forEach(function (team) {
    var option = document.createElement("option");
    option.value = team.imgSrc;
    option.text = team.name;
    awayTeamSelect.appendChild(option);
});

/*
    Removes the click event listernery from the selection areas
    to prevent from reselecting.
*/
let removeSelectionAreaActiveListeners = function () {
    document.querySelectorAll(".selection-area").forEach(function (selectionArea) {
        selectionArea.removeEventListener('click', handleSelectionAreaClick);
    })
};

/*
    to handle click event on selection area

*/
let handleSelectionAreaClick = function (e) {
    // if we don't have 2 selections
    if (homeTeamInput === "" || awayTeamInput === "") {

        return;
    }
    // remove click event listerner for selected are so can't click again
    e.target.removeEventListener("click", handleSelectionAreaClick);
    // to keep track of how many goes are left
    attempts += 1;

    // To store the winning combination to display the winning selections
    let winningCombination = [];

    // The board position that has been selected
    const boardPosition = Number(e.target.dataset.ref)
    e.target.classList.replace("selection-area", "selection-area-clicked");
    // Check which team has been selected and update the selected area with the team img for that team
    if (isHomeTeam) {
        e.target.style.backgroundImage = homeTeam.imgSrc;
        homeTeam.selections.push(boardPosition);
        winningCombination = checkSelectionsForWinningCombination(homeTeam.selections);
        isHomeTeam = false;
    } else {
        e.target.style.backgroundImage = awayTeam.imgSrc;
        awayTeam.selections.push(boardPosition);
        winningCombination = checkSelectionsForWinningCombination(awayTeam.selections);
        isHomeTeam = true;
    }
    // If we have a winning combination display the 3 selected areas that make the win
    // and change the back ground image to winner
    // clear all remaining click event listerners for unselected areas to stop the game 
    if (winningCombination) {
        winningCombination.forEach(function (selection) {
            selectionAreas[selection].classList = ["winner"];

        })

    }
}

/*
    Resets all the data back to initial state it invoked when a selected team has changed.
*/
let resetGame = function () {
    homeTeam.score = 0;
    awayTeam.score = 0;
    attempts = 0;
    homeScore.textContent = 0;
    awayScore.textContent = 0;

    removeSelectionAreaActiveListeners();

    selectionAreas.forEach(function (selectionArea) {
        // if (selectionArea.classList.contains("winner")) {
        //     selectionArea.classList.replace("winner", "selection-area");
        // }
        // if (selectionArea.classList.contains("selection-area-clicked")) {
        //     selectionArea.classList.replace("selection-area-clicked", "selection-area");
        // }
        selectionArea.style.backgroundImage = "url(images/afl.jpeg)";
        selectionArea.addEventListener('click', handleSelectionAreaClick);

    });

    homeTeam.selections = [];
    awayTeam.selections = [];
    rematchBtn.disabled = true;
    rematchBtn.style.opacity = 0;
    displayGameResult.textContent = "";
    displayGameResult.style.opacity = 0;
};

/*
    Resets the game boars but we still keep tally of scores as its a rematch not
    a new game.
*/
let handleRematchBtnClick = function () {
    selectionAreas.forEach(function (selectionArea) {
        selectionArea.classList = ["selection-area"];
        selectionArea.style.backgroundImage = "url(images/afl.jpeg)";
        selectionArea.addEventListener('click', handleSelectionAreaClick);
    });

    homeTeam.selections = [];
    awayTeam.selections = [];
    rematchBtn.disabled = true;
    rematchBtn.style.opacity = 0;
    displayGameResult.textContent = "";
    displayGameResult.style.opacity = 0;
    attempts = 0;

};

/*
    First we set the home team to be first play
    If the remove home team from opposing teams list
    add event listerners to selection areas
*/
let handleHomeTeamChange = function (e) {
    isHomeTeam = true;
    if (homeTeamInput !== "") {
        resetGame();
        document.querySelectorAll(".away-team  option").forEach(function (team) {
            if (team.value === e.target.value) {
                team.disabled = true;
            } else {
                team.disabled = false;
            }
        })

    }
    homeTeamInput = e.target.value;
    homeTeam.imgSrc = homeTeamInput;
    // homeTeam.name = e.target.selectedOptions[0].text;

    if (e.target.options.selectedIndex === 0) {
        homeTeamLogo.src = "";
        homeTeam.name = "";
        homeTeam.imgSrc = "";
        homeTeam.score = 0;
        homeTeam.selections = [];
    } else {
        homeTeam.name = teams[e.target.options.selectedIndex - 1].name;
    }
    //homeTeamLogo.style.backgroundImage = homeTeamInput;
    teams.forEach(function (team) {
        if (team.imgSrc === homeTeamInput) {
            homeTeamLogo.src = team.scoreboardImg;
            // homeTeamLogo
        }
    });

    document.querySelectorAll(".away-team  option").forEach(function (team) {
        if (team.value === homeTeamInput) {
            team.disabled = true;
        } else {
            team.disabled = false;
        }
    })

    selectionAreas.forEach(function (selectionArea) {
        selectionArea.addEventListener('click', handleSelectionAreaClick);

    })
}

let handleAwayTeamChange = function (e) {


    isHomeTeam = true;
    // if we already have a value want to reset the game totals as we are starting a new match
    if (awayTeamInput !== "") {
        resetGame();
        document.querySelectorAll(".home-team  option").forEach(function (team) {
            if (team.value === e.target.value) {
                team.disabled = true;
            } else {
                team.disabled = false;
            }
        })
    }
    awayTeamInput = e.target.value;
    awayTeam.imgSrc = awayTeamInput;
    if (e.target.options.selectedIndex === 0) {
        awayTeamLogo.src = "";
        awayTeam.name = "";
        awayTeam.imgSrc = "";
        awayTeam.score = 0;
        awayTeam.selections = [];
    } else {
        awayTeam.name = teams[e.target.options.selectedIndex - 1].name;
    }

    // awayTeamLogo.style.backgroundImage = awayTeamInput;
    //debugger

    teams.forEach(function (team) {
        if (team.imgSrc === awayTeamInput) {
            awayTeamLogo.src = team.scoreboardImg;
        }
    });

    document.querySelectorAll(".home-team  option").forEach(function (team) {
        if (team.value === awayTeamInput) {
            team.disabled = true;
        } else {
            team.disabled = false;
        }
    })

    selectionAreas.forEach(function (selectionArea) {
        selectionArea.addEventListener('click', handleSelectionAreaClick);
    })
}

/* 
    Add event listerners
*/
rematchBtn.addEventListener('click', handleRematchBtnClick);
homeTeamSelect.addEventListener("change", handleHomeTeamChange);
awayTeamSelect.addEventListener("change", handleAwayTeamChange);

/*
    used for game logic
*/
const winningScore = 3;
const minSelections = 3;

/*
    This is where the game rules area applied.
*/

let checkSelectionsForWinningCombination = function (playerSelections) {
    let matches = 0;

    if (playerSelections.length >= minSelections) {
        let matchingCombination;
        let winningCombinationIndex = 0;
        // while no winning combination and haven't finished checking all winning cobinations
        while (matches < winningScore && winningCombinationIndex < winningCombinations.length) {
            matchingCombination = [];
            let playerSelectionsIndex = 0;
            matches = 0;

            // while no winning combination and haven't finished checking all selections
            while (matches < winningScore && playerSelectionsIndex < playerSelections.length) {

                let winningCombination = winningCombinations[winningCombinationIndex];
                let playerSelection = playerSelections[playerSelectionsIndex]
                // check if current selection is part of winning combination
                if (winningCombination.includes(playerSelection)) {
                    matches += 1;
                    matchingCombination.push(playerSelection)
                }

                playerSelectionsIndex += 1;
            }

            winningCombinationIndex += 1;

        }
        let resultText = "";
        // If we have a winning combination return combination
        if (matches === winningScore) {

            if (isHomeTeam) {
                homeTeam.score += 1;
                homeScore.textContent = homeTeam.score;
                resultText = `CONGRATULATIONS TO THE ${homeTeam.name}`;
            } else {
                awayTeam.score += 1;
                awayScore.textContent = awayTeam.score;
                resultText = `CONGRATULATIONS TO THE ${awayTeam.name}`;
            }
            displayGameResult.style.opacity = 1;
            displayGameResult.textContent = resultText.toUpperCase();
            rematchBtn.disabled = false;
            rematchBtn.style.opacity = 1;
            // rematchBtn.hidden = false;
            removeSelectionAreaActiveListeners();
            playSiren();
            return matchingCombination;

        } else if (attempts === maxAttempts) {
            draw += 1;
            rematchBtn.disabled = false;
            rematchBtn.style.opacity = 1;
            selectionAreas.forEach(function (selectionArea) {
                selectionArea.classList.add("draw");
            });
            // rematchBtn.hidden = false;
            removeSelectionAreaActiveListeners();
            playSiren();
            displayGameResult.style.opacity = 1;
            displayGameResult.textContent = "WE HAVE A DRAW";

        }

        return null;

    }




}

