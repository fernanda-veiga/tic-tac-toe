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

    //let rowCount = [0, 0, 0];
    //let columnCount = [0, 0, 0];
    //let diagCount = [0, 0, 0];
    //let oppositeDiagCount = [0, 0, 0];

    const checkIfWinner = (currentSquareIndex, player) => {
        console.log(player)
        const checkRow = (() => {
            player.rowCount[currentSquareIndex[0]] += 1;
            console.log(player.rowCount);
        })();
        const checkColumn = (() => {
            player.columnCount[currentSquareIndex[1]] += 1;
            console.log(player.columnCount);
        })();
        const checkDiag = (() => {
            if (currentSquareIndex[0] === currentSquareIndex[1]) {
                player.diagCount[currentSquareIndex[0]] += 1;
                console.log(player.diagCount);
            }
        })();
        const checkOppositeDiag = (() => {
            if (currentSquareIndex[0] + currentSquareIndex[1] + 1 === 3) {
                player.oppositeDiagCount[currentSquareIndex[1]] += 1;
                console.log(player.oppositeDiagCount);
            }
        })();

        if (player.rowCount.some(item => item === 3) || player.columnCount.some(item => item === 3) || player.diagCount.every(item => item === 1) || player.oppositeDiagCount.every(item => item === 1)) {
            console.log(`${player.name} is the winner!`);
        }
    }
    return {whichPlayerNow, changeTurn, checkIfWinner};
})();

