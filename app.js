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

let player1 = {
    selections: [],
    imgSrc: "url(images/Collingwood.png)"
}

let player2 = {
    selections: [],
    imgSrc: "url(images/Carlton.png)"
}

isPlayer1 = true;

const maxAttempts = 9;
let gameResult = "";
let attempts = 0;
// TODO: Get Input


let selectionAreas = document.querySelectorAll(".selection-area");

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
    if (isPlayer1) {
        e.target.style.backgroundImage = player1.imgSrc;
        player1.selections.push(boardPosition)
        winningCombination = checkSelectionsForWinningCombination(player1.selections);
        isPlayer1 = false;
    } else {
        e.target.style.backgroundImage = player2.imgSrc;
        player2.selections.push(boardPosition)
        winningCombination = checkSelectionsForWinningCombination(player2.selections);
        isPlayer1 = true;
    }
    // If we have a winning combination display the 3 selected areas that make the win
    // and change the back ground image to winner
    // clear all remaining click event listerners for unselected areas to stop the game 
    if (winningCombination) {
        winningCombination.forEach(function (selection) {
            console.log(selection);
            selectionAreas[selection].classList = ["winner"];
            selectionAreas[selection].textContent = "Winner";

            document.querySelectorAll(".selection-area").forEach(function (selectionArea) {
                selectionArea.removeEventListener('click', handleSelectionAreaClick);
            })
        })

    }


}

selectionAreas.forEach(function (selectionArea) {
    selectionArea.addEventListener('click', handleSelectionAreaClick);
})

console.log(selectionAreas);

const winningScore = 3;
const minSelections = 3;
// if player 1 selections 3 or more check if player 1 has 
//a winning combination



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

        if (matches === winningScore) {
            isPlayer1 ? console.log("Winner is player 1!") :
                console.log("Winner is player 2!")
            return matchingCombination;

        } else if (attempts === maxAttempts) {
            console.log("We have a draw");

        }

        return null;

    }




}

