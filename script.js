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

/*const player = (marker) => {
    const marker = marker;
    return {marker};
};

const game = () => {
    return {}
};*/