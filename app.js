console.log("Tic Tac Toe");


const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
]
let teams = [
    {
        name: "Adelaide Crows",
        imgSrc: "url(images/Adelaide.png)"
    },
    {
        name: "Brisbane Lions",
        imgSrc: "url(images/Brisbane.png)"
    },
    {
        name: "Western Bulldogs",
        imgSrc: "url(images/Bulldogs.png)"
    },
    {
        name: "Carton Blues",
        imgSrc: "url(images/Carlton.png)"
    },
    {
        name: "Collingwood Magpies",
        imgSrc: "url(images/Collingwood.png)"
    },
    {
        name: "Essendon Bombers",
        imgSrc: "url(images/Essendon.png)"
    },
    {
        name: "Freemantale Dockers",
        imgSrc: "url(images/Fremantle.png)"
    },
    {
        name: "Geelong",
        imgSrc: "url(images/Geelong.png)"
    },
    {
        name: "Gold Coast Suns",
        imgSrc: "url(images/Gold-Coast.png)"
    },
    {
        name: "Greater Western Sydney",
        imgSrc: "url(images/GWS.png)"
    },
    {
        name: "Hawthorn Hawks",
        imgSrc: "url(images/Hawthorn.jpg)"
    },
    {
        name: "Melbourne Demons",
        imgSrc: "url(images/Melbourne.png)"
    },
    {
        name: "North Melbourne Kangaroos",
        imgSrc: "url(images/North-Melbourne.png)"
    },
    {
        name: "Port Adelaide Power",
        imgSrc: "url(images/Port-Adelaide.jpg)"
    },
    {
        name: "Richmond Tigers",
        imgSrc: "url(images/Richmond.jpg)"
    },
    {
        name: "St Kilda Saints",
        imgSrc: "url(images/St-Kilda.png)"
    },
    {
        name: "Sydney Swans",
        imgSrc: "url(images/Sydney.png)"
    },
    {
        name: "West Coast Eagles",
        imgSrc: "url(images/West-Coast.png)"
    },

]
let homeTeam = {
    selections: [],
    imgSrc: "url(images/Adelaide.png)",
    score: 0
}

let awayTeam = {
    selections: [],
    imgSrc: "url(images/Carlton.png)",
    score: 0
}

isHome = true;

const maxAttempts = 9;
let gameResult = "";
let attempts = 0;

let draw = 0;
let homeTeamInput = "";
let awayTeamInput = "";

// TODO: Get Input


let selectionAreas = document.querySelectorAll(".selection-area");
let playAgainBtn = document.querySelector(".play-again-btn");
let homeTeamLogo = document.querySelector(".home-team-logo");
let homeScore = document.querySelector(".home-score");
let awayTeamLogo = document.querySelector(".away-team-logo");
let awayScore = document.querySelector(".away-score");

let homeTeamSelect = document.querySelector(".home-team");
let awayTeamSelect = document.querySelector(".away-team");


teams.forEach(function (team) {
    option = document.createElement("option");
    option.value = team.imgSrc;
    option.text = team.name;
    console.log("imgsrc select home team = " + option.value);
    //option.style = `background-image:${team.imgSrc};`;
    homeTeamSelect.appendChild(option);
});
teams.forEach(function (team) {
    var option = document.createElement("option");
    option.value = team.imgSrc;
    option.text = team.name;
    console.log("imgsrc select away team = " + option.value);
    //option.style = `background-image:${team.imgSrc}`;
    awayTeamSelect.appendChild(option);
});


let removeSelectionAreaActiveListeners = function () {
    document.querySelectorAll(".selection-area").forEach(function (selectionArea) {
        selectionArea.removeEventListener('click', handleSelectionAreaClick);
    })
}

let handleSelectionAreaClick = function (e) {

    // remove click event listerner for selected are so can't click again
    e.target.removeEventListener("click", handleSelectionAreaClick);
    // to keep track of how many goes are left
    attempts += 1;

    // To store the winning combination to display the winning selections
    let winningCombination = [];

    // The board position that has been selected
    const boardPosition = Number(e.target.dataset.ref)

    // Check which player has been selected and update the slected area with the symbol for that player
    if (isHome) {
        e.target.style.backgroundImage = homeTeam.imgSrc;
        homeTeam.selections.push(boardPosition)
        winningCombination = checkSelectionsForWinningCombination(homeTeam.selections);
        isHome = false;
    } else {
        e.target.style.backgroundImage = awayTeam.imgSrc;
        awayTeam.selections.push(boardPosition)
        winningCombination = checkSelectionsForWinningCombination(awayTeam.selections);
        isHome = true;
    }
    // If we have a winning combination display the 3 selected areas that make the win
    // and change the back ground image to winner
    // clear all remaining click event listerners for unselected areas to stop the game 
    if (winningCombination) {
        winningCombination.forEach(function (selection) {
            console.log(selection);
            selectionAreas[selection].classList = ["winner"];

        })

    }


}
let resetGame = function () {
    homeTeam.score = 0;
    awayTeam.score = 0;
    attempts = 0;
    homeScore.textContent = 0;
    awayScore.textContent = 0;
    removeSelectionAreaActiveListeners();
    selectionAreas.forEach(function (selectionArea) {
        console.log("hello")
        if (selectionArea.classList.contains("winner")) {
            selectionArea.classList.replace("winner", "selection-area");
        }



        selectionArea.style.backgroundImage = "url(images/afl.jpeg)";
        selectionArea.addEventListener('click', handleSelectionAreaClick);

    })
    homeTeam.selections = [];
    awayTeam.selections = [];
    playAgainBtn.disabled = true;


}

let handlePlayAgainBtnClick = function () {
    console.log('start button clicked');
    selectionAreas.forEach(function (selectionArea) {
        console.log("hello")
        if (selectionArea.classList.contains("winner")) {
            selectionArea.classList.replace("winner", "selection-area");
        }

        selectionArea.style.backgroundImage = "url(images/afl.jpeg)";
        selectionArea.addEventListener('click', handleSelectionAreaClick);

    })
    homeTeam.selections = [];
    awayTeam.selections = [];
    playAgainBtn.disabled = true;
    attempts = 0;
}


let handleHomeTeamChange = function (e) {

    if (homeTeamInput !== "") {
        resetGame();
        document.querySelectorAll(".away-team  option").forEach(function (team) {
            console.log("home team = " + team.value)
            if (team.value === e.target.value) {
                console.log("home team = " + team.value)
                console.log("home team input = " + homeTeamInput)
                team.hidden = true;
            } else {
                team.hidden = false;
            }
        })

    }
    homeTeamInput = e.target.value;
    homeTeam.imgSrc = homeTeamInput;
    console.log(homeTeamInput);
    homeTeamLogo.style.backgroundImage = homeTeamInput;

    if (awayTeamInput === "") {
        document.querySelectorAll(".away-team  option").forEach(function (team) {
            console.log("home team = " + team.value)
            if (team.value === homeTeamInput) {
                console.log("home team = " + team.value)
                console.log("home team input = " + homeTeamInput)
                team.hidden = true;
            }
        })

    } else {

        selectionAreas.forEach(function (selectionArea) {
            selectionArea.addEventListener('click', handleSelectionAreaClick);
        })
    }
}

let handleAwayTeamChange = function (e) {

    // if we already have a value want to reset the game totals as we are starting a new match
    if (awayTeamInput !== "") {
        resetGame();
        document.querySelectorAll(".home-team  option").forEach(function (team) {
            console.log("home team = " + team.value)
            if (team.value === e.target.value) {
                console.log("home team = " + team.value)
                console.log("home team input = " + homeTeamInput)
                team.hidden = true;
            } else {
                team.hidden = false;
            }
        })
    }
    awayTeamInput = e.target.value;
    awayTeam.imgSrc = awayTeamInput;
    console.log(awayTeamInput);
    awayTeamLogo.style.backgroundImage = awayTeamInput;


    if (homeTeamInput === "") {
        document.querySelectorAll(".home-team  option").forEach(function (team) {
            if (team.value === awayTeamInput) {
                team.hidden = true;
                console.log("team hidden = " + team.hidden)
            }
        })

    } else {

        selectionAreas.forEach(function (selectionArea) {
            selectionArea.addEventListener('click', handleSelectionAreaClick);
        })
    }
}

playAgainBtn.addEventListener('click', handlePlayAgainBtnClick);
homeTeamSelect.addEventListener("change", handleHomeTeamChange);
awayTeamSelect.addEventListener("change", handleAwayTeamChange);
console.log(selectionAreas);

const winningScore = 3;
const minSelections = 3;





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
            // console.log("1st while");
            // while no winning combination and haven't finished checking all selections
            while (matches < winningScore && playerSelectionsIndex < playerSelections.length) {
                // console.log("2nd while")
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
        // If we have a winning combination return combination
        if (matches === winningScore) {

            if (isHome) {
                homeTeam.score += 1;
                homeScore.textContent = homeTeam.score;
                console.log("player 1 score = " + homeTeam.score);
            } else {
                awayTeam.score += 1;
                awayScore.textContent = awayTeam.score;
            }

            playAgainBtn.disabled = false;
            removeSelectionAreaActiveListeners();
            return matchingCombination;

        } else if (attempts === maxAttempts) {
            console.log("We have a draw");
            draw += 1;
            playAgainBtn.disabled = false;
            removeSelectionAreaActiveListeners();

        }

        return null;

    }




}

