const aiBtn = document.getElementById("aiBtn");
const playerBtn = document.getElementById("playerBtn");

aiBtn.addEventListener("click", function() {
    gameSetup("ai");
});
playerBtn.addEventListener("click", function() {
    gameSetup("player");
});

const p1DetailsContainer = document.getElementById("p1Container");
const p2DetailsContainer = document.getElementById("p2Container");
const playerAITitle = document.getElementById("playerAITitle");

const gameSetup = (playerType) => {
    if (playerType == "player"){
        p1DetailsContainer.style.width = "40%";
        p2DetailsContainer.style.width = "40%";
        p2DetailsContainer.style.margin = "2.5%";
        p2DetailsContainer.style.padding = "2.5%";
        playerAITitle.innerText = "Player vs Player";
    } else{
        p1DetailsContainer.style.width = "90%";
        p2DetailsContainer.style.width = "0%";
        p2DetailsContainer.style.margin = "0%";
        p2DetailsContainer.style.padding = "0%";
        playerAITitle.innerText = "Player vs AI";
    }
};

const gridItems = [];
let x = 0;
while (x < 9){
    gridItems[x] = document.getElementById("grid" + x);
    let location = x;
    gridItems[x].addEventListener("click", function() {
        gameManagement.updateBoard(location);
        this.removeEventListener('click', arguments.callee);
      });
    x++;
};

const gameBoard = ["0","1","2","3","4","5","6","7","8"];
const boardValues = ["", "", "", "", "", "", "", "", ""];
// All Possible ways of winning the game
const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


// Player 1 = naughts, Player 2 = Crosses
const player1 = { name: "", symbol: "o" }

const player2 = { name: "", symbol: "o" }

const gameManagement = (() => {
    const resetBoard = () => {
        for (let i = 0; i < boardValues.length; i++) {
            boardValues[i] = "";
        }
    }

    const updateBoard = (location) => {
        var grid = document.getElementById("grid" + location);
        boardValues[location] = player;
        grid.classList.add("full");
        grid.classList.add(player);
        grid.removeEventListener("click", function() {
            clickGrid(location);
          });
        checkForWin(location);
        if (player === 1){
            grid.innerText = "o";
            player = 2;
        }else {
            grid.innerText = "x";
            player = 1;
        }
    }

    const checkForWin = (location) => {
        // iterate through each possible win
        for (let oi = 0; oi < possibleWins.length; oi++) {
            let winCondition = possibleWins[oi];
            // Only search the ones the user just clicked - makes it more efficient 
            if (winCondition.includes(location)){
                let winCheck = 0;
                // Check each value in the possible win array 
                for (let ii = 0; ii < possibleWins[oi].length; ii++){
                    let gridValueToCheck = possibleWins[oi][ii];
                    if (boardValues[gridValueToCheck] == player){
                        winCheck++
                    } else {
                        break;
                    }
                } 
                if (winCheck == 3){
                    document.location.href = "html/winpage.html";
                }
            }
        }
    }

    return {resetBoard, updateBoard, checkForWin};
})();