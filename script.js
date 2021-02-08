//Gameboard module
const gameboard = (() => {
    const squares = Array.from(document.querySelectorAll(".square"));
    const squaresEventListener = (() => {
        squares.forEach(square => {
            square.addEventListener("click", () => {
                square.textContent = game.whichMarkerNow();
                game.changeTurn();
            });
        })
    })();
    
    


    return {squares};
})();

const player = (playerMarker, playerTurn) => {
    const marker = playerMarker;
    const turn = playerTurn;
    return {marker, turn};
}

let playerOne = player("X", 1);
let playerTwo = player("O", 0);

const game = (() => {
    const whichMarkerNow = () => {
        return (playerOne.turn === 1) ? playerOne.marker : playerTwo.marker;
    }
    const changeTurn = () => {
        if (playerOne.turn === 1) {
            playerOne.turn = 0; playerTwo.turn = 1;
        } else {
            playerOne.turn = 1; playerTwo.turn = 0;
        }
    }
    return {whichMarkerNow, changeTurn};
})();

