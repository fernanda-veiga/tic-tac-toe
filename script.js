const player = (playerName, playerMarker, playerTurn) => {
    const name = playerName;
    const marker = playerMarker;
    const turn = playerTurn;

    let rowCount = [0, 0, 0];
    let columnCount = [0, 0, 0];
    let diagCount = [0, 0, 0];
    let oppositeDiagCount = [0, 0, 0];

    let won = 0;
    
    return {name, marker, turn, rowCount, columnCount, diagCount, oppositeDiagCount, won};
}

let playerOne = player("John", "X", 1);
let playerTwo = player("Mark", "O", 0);

const gameboard = (() => {
    const squares = Array.from(document.querySelectorAll(".square"));
    const scoreboardPlayerName = Array.from(document.querySelectorAll(".player-name"));
    const scoreboardPlayerMarker = Array.from(document.querySelectorAll(".player-marker"));

    const giveInfoToScoreboard = (() => {
        scoreboardPlayerName[0].textContent = playerOne.name;
        scoreboardPlayerName[1].textContent = playerTwo.name;
        scoreboardPlayerMarker[0].textContent = playerOne.marker;
        scoreboardPlayerMarker[1].textContent = playerTwo.marker;
    })();

    const toggleEventListener = (() => {
        squares.forEach(square => {
            square.addEventListener("click", function addMarker(){
                //Removes the event listener if one of the player has won
                if (playerOne.won === 1 || playerTwo.won === 1) {
                    this.removeEventListener("click", addMarker);
                }
                else {
                    //Prevents players from marking squares that are already marked
                    if (square.textContent === "") {
                        square.textContent = game.whichPlayerNow().marker;
                        square.classList.add("square-animation");
                        currentSquareIndex = getSquareIndex(square);
                        game.checkIfWinner(currentSquareIndex, game.whichPlayerNow());
                        game.changeTurn();
                    }
                }
            });
        })
    })();
    
    const getSquareIndex = (square) => {
        let splitArray = square.id.split(",");
        return splitArray.map(item => Number(item));
    }

    /*const giveWinnerAnimation = (square) => {
        if (player.rowCount.some(item => item === 3)) {
            
        }
        if (player.columnCount.some(item => item === 3)) {

        }
    }*/

    return {squares, /*toggleEventListener*/};
})();

const game = (() => {
    const whichPlayerNow = () => {
        return (playerOne.turn === 1) ? playerOne : playerTwo;
    }

    const changeTurn = () => {
        if (playerOne.turn === 1) {
            playerOne.turn = 0; playerTwo.turn = 1;
        } else {
            playerOne.turn = 1; playerTwo.turn = 0;
        }
    }

    const checkIfWinner = (squareIndex, player) => {
        const checkRow = (() => {
            player.rowCount[squareIndex[0]] += 1;
        })();
        const checkColumn = (() => {
            player.columnCount[squareIndex[1]] += 1;
        })();
        const checkDiag = (() => {
            if (squareIndex[0] === squareIndex[1]) {
                player.diagCount[squareIndex[0]] += 1;;
            }
        })();
        const checkOppositeDiag = (() => {
            if (squareIndex[0] + squareIndex[1] + 1 === 3) {
                player.oppositeDiagCount[squareIndex[0]] += 1;
            }
        })();

        if (player.rowCount.some(item => item === 3) || 
            player.columnCount.some(item => item === 3) || 
            player.diagCount.every(item => item === 1) || 
            player.oppositeDiagCount.every(item => item === 1)
            ) {
            displayWinner(player);
            player.won = 1;
        }
    }

    const displayWinner = (player) => {
        const displayWinnerDiv = document.querySelector(".winner-display");
        displayWinnerDiv.style.display = "block";
        displayWinnerDiv.textContent = `${player.name} is the winner!`;
    }

    return {whichPlayerNow, changeTurn, checkIfWinner};
})();


//TODO: Beautify CSS
//TODO: Add form to take the player name and marker of choice
//TODO: Play again button
//TODO: Add computer player