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
        name: "Adelaide",
        nickName: "Crows",
        imgSrc: "images/Adelaide.svg"
    },
    {
        name: "Brisbane",
        nickName: "Lions",
        imgSrc: "images/Brisbane.svg"
    },
    {
        name: "Western Bulldogs",
        nickName: "Bulldogs",
        imgSrc: "images/Western-Bulldogs.svg"
    },
    {
        name: "Carton",
        nickName: "Blues",
        imgSrc: "images/carlton.svg"
    },
    {
        name: "Collingwood",
        nickName: "Magpies",
        imgSrc: "images/Collingwood.svg"
    },
    {
        name: "Essendon",
        nickName: "Bombers",
        imgSrc: "images/Essendon.svg"
    },
    {
        name: "Fremantale",
        nickName: "Dockers",
        imgSrc: "images/Fremantle.svg"
    },
    {
        name: "Geelong",
        nickName: "Cats",
        imgSrc: "images/Geelong.svg"
    },
    {
        name: "Gold Coast",
        nickName: "Suns",
        imgSrc: "images/Gold-Coast.svg"
    },
    {
        name: "Greater Western Sydney",
        nickName: "Giants",
        imgSrc: "images/GWS.svg"
    },
    {
        name: "Hawthorn",
        nickName: "Hawks",
        imgSrc: "images/Hawthorn.svg"
    },
    {
        name: "Melbourne",
        nickName: "Demons",
        imgSrc: "images/Melbourne.svg"
    },
    {
        name: "North Melbourne",
        nickName: "Kangaroos",
        imgSrc: "images/North-Melbourne.svg"
    },
    {
        name: "Port Adelaide",
        nickName: "Power",
        imgSrc: "images/Port-Adelaide.svg"
    },
    {
        name: "Richmond",
        nickName: "Tigers",
        imgSrc: "images/Richmond.svg"
    },
    {
        name: "St Kilda",
        nickName: "Saints",
        imgSrc: "images/St-Kilda.svg"
    },
    {
        name: "Sydney",
        nickName: "Swans",
        imgSrc: "images/Sydney.svg"
    },
    {
        name: "West Coast",
        nickName: "Eagles",
        imgSrc: "images/West-Coast-Eagles.svg"
    },

];

/* 
    home team and away teams to store data required
    to workout if we have a winner
*/
let homeTeam = {
    name: "",
    nickName: "",
    selections: [],
    imgSrc: "",
    score: 0
};

let awayTeam = {
    name: "",
    nickName: "",
    selections: [],
    imgSrc: "",
    score: 0
};

let isComputerMode = false;
let availableSelections = [0, 1, 2, 3, 4, 5, 6, 7, 8];
/* 
    This is used to alternate between teams
    Home team will always start first in the sequence
    of matches and then it will alternate between which team
    had the last turn before a result of win or draw if a
    team selection changes will start a new sequence of matches 
    and home team will go first.
*/
isHomeTeamTurn = true;
// isHomeTeamSelection = false;

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
let homeTeamScoreboardLabel = document.querySelector(".home-label");
let homeScore = document.querySelector(".home-score");
let awayTeamLogo = document.querySelector(".away-team-logo");
let awayTeamScoreboardLabel = document.querySelector(".away-label");
let awayScore = document.querySelector(".away-score");
let displayGameResult = document.querySelector(".display-game-result");
let slideText = document.querySelector(".slide-Text");
let homeDropdownContent = document.querySelector(".home-dropdown-content");
let awayDropdownContent = document.querySelector(".away-dropdown-content");
let homeDropDownSelect = document.querySelector(".home-drop-down-select");
let awayDropDownSelect = document.querySelector(".away-drop-down-select");
let toggle = document.querySelector(".toggle-button");
let playerMode = document.querySelector(".player-mode-on");
let computerMode = document.querySelector(".computer-mode-off");



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

teams.sort(function (a, b) {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
    }
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
    }
    return 0;
});

teams.forEach(function (team, index) {
    let item = document.createElement("img");
    item.src = team.imgSrc;
    item.dataset.ref = index;
    item.dataset.url = team.imgSrc;
    item.dataset.name = team.name;
    item.classList.add("home-drop-down-item");
    homeDropdownContent.appendChild(item);
});
teams.forEach(function (team, index) {
    let item = document.createElement("img");
    item.src = team.imgSrc;
    item.dataset.ref = index;
    item.dataset.url = team.imgSrc;
    item.dataset.name = team.name;
    item.classList.add("away-drop-down-item");
    awayDropdownContent.appendChild(item);
});


let homeDropDownItems = document.querySelectorAll(".home-drop-down-item");
let awayDropDownItems = document.querySelectorAll(".away-drop-down-item");

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
let setSelectionAreas = function (selectionArea) {
    selectionArea.classList = ["selection-area"];
    selectionArea.src = "images/afl.png";
    selectionArea.addEventListener('click', handleSelectionAreaClick);
}
let updateSelectedArea = function (selection) {
    attempts += 1;

    selectionAreas[selection].removeEventListener("click", handleSelectionAreaClick);
    selectionAreas[selection].classList.replace("selection-area", "selection-area-clicked");
    let teamSelections = [];

    if (isHomeTeamTurn) {
        selectionAreas[selection].src = homeTeam.imgSrc;
        homeTeam.selections.push(selection);
        teamSelections = homeTeam.selections;
    } else {
        selectionAreas[selection].src = awayTeam.imgSrc;
        awayTeam.selections.push(selection);
        teamSelections = awayTeam.selections;
    }
    let winningCombination = [];
    winningCombination = checkSelectionsForWinningCombination(teamSelections);
    isHomeTeamTurn = isHomeTeamTurn ? false : true;

    if (winningCombination) {
        winningCombination.forEach(function (selection) {
            selectionAreas[selection].classList = ["winner"];

        })

    } else if (attempts < maxAttempts && isComputerMode && !isHomeTeamTurn) {
        computerSelection();
    }

}
let computerSelection = function () {
    let randomIndex = Math.floor(Math.random() * availableSelections.length);
    let selection = availableSelections.splice(randomIndex, 1).pop();
    updateSelectedArea(selection);
}
let handleSelectionAreaClick = function (e) {

    availableSelectionsRemoveIndex = availableSelections.indexOf(Number(e.target.dataset.ref));
    availableSelections.splice(availableSelectionsRemoveIndex, 1);

    // if we don't have 2 selections
    if (homeTeamInput === "" || awayTeamInput === "") {

        return;
    }

    updateSelectedArea(Number(e.target.dataset.ref))
}

let resetGameValues = function () {
    homeTeam.selections = [];
    awayTeam.selections = [];
    availableSelections = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    rematchBtn.disabled = true;
    rematchBtn.style.opacity = 0;
    displayGameResult.textContent = "";
    displayGameResult.style.opacity = 0;
    attempts = 0;
}

let resetScore = function () {
    homeTeam.score = 0;
    awayTeam.score = 0;
    homeScore.textContent = 0;
    awayScore.textContent = 0;
}
/*
    Resets all the data back to initial state it invoked when a selected team has changed.
*/
let resetGame = function () {
    resetScore();
    removeSelectionAreaActiveListeners();
    selectionAreas.forEach(setSelectionAreas);
    resetGameValues();
};

/*
    Resets the game boars but we still keep tally of scores as its a rematch not
    a new game.
*/
let handleRematchBtnClick = function () {
    selectionAreas.forEach(setSelectionAreas);
    resetGameValues();
    if (isComputerMode && !isHomeTeamTurn) {
        computerSelection();
    }

};

let handleHomeSelectItem = function (e) {

    let itemIndex = Number(e.target.dataset.ref);
    isHomeTeamTurn = true;
    if (homeTeamInput !== "") {
        resetGame();
    }


    homeTeamInput = e.target.dataset.url;
    homeTeam.imgSrc = homeTeamInput;
    homeTeam.name = e.target.dataset.name;

    teams.forEach(function (team) {
        if (team.imgSrc === homeTeamInput) {
            homeTeamLogo.src = team.imgSrc;
            homeTeamScoreboardLabel.textContent = team.nickName;
            homeTeam.nickName = team.nickName;
        }
    });


    selectionAreas.forEach(function (selectionArea) {
        selectionArea.addEventListener('click', handleSelectionAreaClick);

    })

    awayDropDownItems.forEach(function (item) {
        if (Number(item.dataset.ref) === itemIndex) {
            item.hidden = true;
        } else {
            item.hidden = false;
        }

    });

    homeDropdownContent.style.display = "none";
    document.querySelector(".home-drop-down-select-img").src = homeTeam.imgSrc;
    document.querySelector(".home-drop-down-select-text").textContent = homeTeam.name;
    document.querySelector(".home-drop-down-arrow").src = "images/select-down-arrow.png"

}

let handleAwaySelectItem = function (e) {

    let itemIndex = Number(e.target.dataset.ref);
    isHomeTeamTurn = true;

    if (homeTeamInput !== "") {
        resetGame();
    }

    // debugger
    awayTeamInput = e.target.dataset.url;
    awayTeam.imgSrc = awayTeamInput;
    awayTeam.name = e.target.dataset.name;

    teams.forEach(function (team) {
        if (team.imgSrc === awayTeamInput) {
            awayTeamLogo.src = team.imgSrc;
            awayTeamScoreboardLabel.textContent = team.nickName;
            awayTeam.nickName = team.nickName;
        }
    });


    selectionAreas.forEach(function (selectionArea) {
        selectionArea.addEventListener('click', handleSelectionAreaClick);

    })

    homeDropDownItems.forEach(function (item) {
        if (Number(item.dataset.ref) === itemIndex) {
            item.hidden = true;
        } else {
            item.hidden = false;
        }

    });

    awayDropdownContent.style.display = "none";
    document.querySelector(".away-drop-down-select-img").src = awayTeam.imgSrc;
    document.querySelector(".away-drop-down-select-text").textContent = awayTeam.name;
    document.querySelector(".away-drop-down-arrow").src = "images/select-down-arrow.png"

}

let handleHomeDropDownSelectMouseOver = function () {
    homeDropdownContent.style.display = "grid";
    homeDropdownContent.style.gridTemplateColumns = "repeat(6,1fr)";
    document.querySelector(".home-drop-down-arrow").src = "images/select-up-arrow.png";
}
let handleAwayDropDownSelectMouseOver = function () {
    awayDropdownContent.style.display = "grid";
    awayDropdownContent.style.gridTemplateColumns = "repeat(6,1fr)";
    document.querySelector(".away-drop-down-arrow").src = "images/select-up-arrow.png"
}

let handleAwayDropbtnMouseOver = function (e) {
    awayDropdownContent.style.display = "block";


}
/* 
    Add event listerners
*/
rematchBtn.addEventListener('click', handleRematchBtnClick);
homeDropDownSelect.addEventListener('mouseover', handleHomeDropDownSelectMouseOver);
awayDropDownSelect.addEventListener('mouseover', handleAwayDropDownSelectMouseOver);
homeDropdownContent.addEventListener('mouseleave', function (e) {
    homeDropdownContent.style.display = "none";
    document.querySelector(".home-drop-down-arrow").src = "images/select-down-arrow.png"
});
awayDropdownContent.addEventListener('mouseleave', function (e) {
    awayDropdownContent.style.display = "none";
    document.querySelector(".away-drop-down-arrow").src = "images/select-down-arrow.png"
});



homeDropDownItems.forEach(function (item) {
    item.addEventListener('click', handleHomeSelectItem);

})


awayDropDownItems.forEach(function (item) {
    item.addEventListener('click', handleAwaySelectItem);

})

toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");

    if (isComputerMode) {
        isComputerMode = false;
        //  gameMode.textContent = "MODE : PLAYER 2";

        playerMode.classList.replace("player-mode-off", "player-mode-on");

        computerMode.classList.replace("computer-mode-on", "computer-mode-off");

    } else {
        isComputerMode = true;
        // gameMode.textContent = "MODE : COMPUTER";
        playerMode.classList.replace("player-mode-on", "player-mode-off");

        computerMode.classList.replace("computer-mode-off", "computer-mode-on");


    }



});

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

            if (isHomeTeamTurn) {
                homeTeam.score += 1;
                homeScore.textContent = homeTeam.score;
                resultText = `CONGRATULATIONS TO THE ${homeTeam.name} ${homeTeam.nickName}`;
            } else {
                awayTeam.score += 1;
                awayScore.textContent = awayTeam.score;
                resultText = `CONGRATULATIONS TO THE ${awayTeam.name} ${awayTeam.nickName}`;
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

