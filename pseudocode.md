# Data Structures.
## winning cobinations.
- [0,1,2], [0,3,6], [0,4,8], [1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]
## Player
selections array
id
symbol
## game
selected area, id, name
symbols["x","o"]
max attempts
game reslut
# Rules
Players alternate between clicks until winner or max atemps reached draw is result..

# Logic

player 1 selects area
area changes to player 1 symbol
if player 1 selections 3 or more check if player 1 has a winning combination
if player 1 has winning combination end game
player 2 selects area
changes to player 2 symbol
if player 2 selections 3 or more check if player has 2a winning combination
if so end game.
if total player 1 and player 2 selections are = Max attempts (3 * 3) we have a draw
if not repeat.

score: intiaial to zero;
if player1 wins add to player 1
if player2 wins add to player 2
draw add to draw tally



# Design
## html
    div for the game grid.
        div * 9 for each area

## css
    game-grid 
        3 colums
        3 rows

    selectable-area

    player1-symbol

    player2-symbol
