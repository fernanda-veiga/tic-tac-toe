//Gameboard module
const gameboard = (() => {
    const squares = Array.from(document.querySelectorAll(".square"));
    const squaresEventListener = (() => {
        squares.forEach(square => {
            square.addEventListener("click", () => {
                square.textContent = "X";
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

const game = () => {
    return {}
};

let playerOne = player("X", 1);
let playerTwo = player("O", 0);