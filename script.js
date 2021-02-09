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

let playerOne = player("Player One", "X", 1);
let playerTwo = player("Player Two", "O", 0);

const gameboard = (() => {
    const squares = Array.from(document.querySelectorAll(".square"));
    
    //const playAgainstComputerBtn = document.querySelector("#against-computer-btn");

    const startGame = (() => {
        const playAgainstPlayerBtn = document.querySelector("#against-player-btn");
        playAgainstPlayerBtn.addEventListener("click", () => {
            const firstPage = document.querySelector(".start-game");
            const secondPage = document.querySelector(".game-container");
            firstPage.style.display = "none";
            secondPage.style.display = "flex";
        })
    })();

    const initializeGame = () => {
        const displayWinnerDiv = document.querySelector(".winner-display");
        squares.forEach(square => square.textContent = "")
        playerOne.won = 0;
        playerTwo.won = 0;
        playerOne.turn = 1;
        playerTwo.turn = 0;
        displayWinnerDiv.textContent = "";
        initializeCounters(playerOne);
        initializeCounters(playerTwo);
    }

    const initializeCounters = (player) => {
        player.rowCount = [0, 0, 0];
        player.columnCount = [0, 0, 0];
        player.diagCount = [0, 0, 0];
        player.oppositeDiagCount = [0, 0, 0];
    };

    const backToFirstPage = (() => {
        const backBtn = document.querySelector("#back-btn");
        backBtn.addEventListener("click", () => {
            const firstPage = document.querySelector(".start-game");
            const secondPage = document.querySelector(".game-container");
            firstPage.style.display = "flex";
            secondPage.style.display = "none";
            initializeGame();
        })
    })();

    const replayGame = (() => {
        const replayBtn = document.querySelector("#replay-btn");
        replayBtn.addEventListener("click", initializeGame);
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

    return {squares};
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
        else {
            if (gameboard.squares.every(square => square.textContent !== "")) {
                displayWinner("tie");
            }
        }
    }

    const displayWinner = (winner) => {
        const displayWinnerDiv = document.querySelector(".winner-display");
        if (winner == "tie") {
            displayWinnerDiv.textContent = `It's a tie!`;
        }
        else {
            displayWinnerDiv.textContent = `${winner.name} is the winner!`;
        }
    }

    return {whichPlayerNow, changeTurn, checkIfWinner};
})();


//TODO: Add computer player