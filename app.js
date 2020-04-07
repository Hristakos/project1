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
    selections: [9, 9, 9, 9, 8],
    symbol: "x"
}

let player2 = {
    selections: [],
    symbol: "0"
}

const maxAttempts = 9;

let gameResult = "";

// TODO: Get Input

let matches = 0;
// if player 1 selections 3 or more check if player 1 has 
//a winning combination

let attempts = 0;

let checkSelection = function () {
    attempts += 1;
    if (player1.selections.length >= 3) {
        let combinationCounter = 0;
        // while no winning combination and haven't finished checking cobinations
        while (matches < 3 && combinationCounter < winningCombinations.length) {
            console.log("combination counter " + combinationCounter);
            let counter = 0;
            matches = 0;
            while (matches < 3 && counter < player1.selections.length) {

                if (winningCombinations[combinationCounter].includes(player1.selections[counter])) {
                    console.log("winning combinations x = " + winningCombinations[combinationCounter] + ' does include ' + player1.selections[counter]);
                    matches += 1;
                }
                counter += 1;
                console.log("matches = " + matches);
                console.log("counter = " + counter);
            }

            combinationCounter += 1;

        }

        if (matches === 3) {
            console.log("we have a winner")
        } else if (attempts < maxAttempts) {
            console.log("try again");
        } else {
            console.log("we have a draw");
        }

    }




}

while (attempts < maxAttempts) {
    checkSelection();
}