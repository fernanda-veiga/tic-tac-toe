//Gameboard module
const gameboard = (() => {
    const squares = Array.from(document.querySelectorAll(".square"));
    
    const addMarkerToSquare = (() => {
        squares.forEach(square => {
            square.addEventListener("click", () => {
                //Only adds a new marker to the square if it is empty
                if (square.textContent === "") {
                    square.textContent = game.whichPlayerNow().marker;
                    currentSquareIndex = getSquareIndex(square);
                    game.checkIfWinner(currentSquareIndex, game.whichPlayerNow());
                    game.changeTurn();
                }
            });
        })
    })();
    
    const getSquareIndex = (square) => {
        let splitArray = square.id.split(",");
        return splitArray.map(item => Number(item));
    }

    return {squares};
})();

const player = (playerName, playerMarker, playerTurn) => {
    const name = playerName;
    const marker = playerMarker;
    const turn = playerTurn;

    let rowCount = [0, 0, 0];
    let columnCount = [0, 0, 0];
    let diagCount = [0, 0, 0];
    let oppositeDiagCount = [0, 0, 0];
    
    return {name, marker, turn, rowCount, columnCount, diagCount, oppositeDiagCount};
}

let playerOne = player("John", "X", 1);
let playerTwo = player("Mark", "O", 0);

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
        }
    }

    const displayWinner = (player) => {
        const displayWinnerDiv = document.querySelector(".winner-display");
        displayWinnerDiv.style.display = "block";
        displayWinnerDiv.textContent = `${player.name} is the winner!`;
    }

    return {whichPlayerNow, changeTurn, checkIfWinner};
})();

