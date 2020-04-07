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
    symbol: "x"
}

let player2 = {
    selections: [],
    symbol: "0"
}

isPlayer1 = true;

const maxAttempts = 9;
let gameResult = "";
let attempts = 0;
// TODO: Get Input


let selectionAreas = document.querySelectorAll(".selection-area");

let handleSelectionAreaClick = function (e) {
    attempts += 1;
    console.log(e.target.dataset.ref)
    if (isPlayer1) {
        e.target.style.backgroundColor = "white";
        player1.selections.push(Number(e.target.dataset.ref))
        checkSelectionsForWinningCombination(player1.selections);
        isPlayer1 = false;
    } else {
        e.target.style.backgroundColor = "green";
        player2.selections.push(Number(e.target.dataset.ref))
        checkSelectionsForWinningCombination(player2.selections);
        isPlayer1 = true;
    }
    e.target.removeEventListener("click", handleSelectionAreaClick);

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
        let winningCombinationIndex = 0;
        // while no winning combination and haven't finished checking all winning cobinations
        while (matches < winningScore && winningCombinationIndex < winningCombinations.length) {

            let playerSelectionsIndex = 0;
            matches = 0;
            // console.log("1st while");
            // while no winning combination and haven't finished checking all selections
            while (matches < winningScore && playerSelectionsIndex < playerSelections.length) {
                // console.log("2nd while")
                let winningCombination = winningCombinations[winningCombinationIndex];

                // check if current selection is part of winning combination
                if (winningCombination.includes(playerSelections[playerSelectionsIndex])) {
                    matches += 1;
                }

                playerSelectionsIndex += 1;
            }

            winningCombinationIndex += 1;

        }

        if (matches === winningScore) {
            isPlayer1 ? console.log("Winner is player 1!") :
                console.log("Winner is player 2!")

        }

    }




}

