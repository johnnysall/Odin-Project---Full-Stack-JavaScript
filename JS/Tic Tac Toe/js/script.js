const aiBtn = document.getElementById("aiBtn");
const playerBtn = document.getElementById("playerBtn");
let againstAI = false;
aiBtn.addEventListener("click", function() {
    againstAI = true;
    gameSetup.vsPlayer("ai");
});
playerBtn.addEventListener("click", function() {
    againstAI = false;
    gameSetup.vsPlayer("player");
});

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function() {
    document.getElementById("indexMain").classList.add("toGamePage");
    gameSetup.startGame();
});

const p1DetailsContainer = document.getElementById("p1Container");
const p2DetailsContainer = document.getElementById("p2Container");
const playerAITitle = document.getElementById("playerAITitle");

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

let score = 0;

// Player 1 = naughts, Player 2 = Crosses
const player1 = { name: "Unknown", symbol: "x" }
const player2 = { name: "Unknown", symbol: "o" }

let player = player1;

const gameSetup = (() => {
    const vsPlayer = (playerType) => {
        if (playerType == "player"){
            p1DetailsContainer.style.width = "40%";
            p2DetailsContainer.style.width = "40%";
            p2DetailsContainer.style.margin = "0 2.5% 20px 2.5%";
            p2DetailsContainer.style.padding = "2.5%";
            playerAITitle.innerText = "Player vs Player";
        } else{
            p1DetailsContainer.style.width = "90%";
            p2DetailsContainer.style.width = "0%";
            p2DetailsContainer.style.margin = "0%";
            p2DetailsContainer.style.padding = "0%";
            playerAITitle.innerText = "Player vs AI";
        }
    }
    
    const startGame = () => {
        getBoardElement();
        p1Name = document.getElementById("P1Name").value;
        p1Symbol = document.getElementById("P1Symbol").value;
        if (p1Name !== ""){ player1.name = p1Name; }
        if (p1Symbol !== ""){ player1.symbol = p1Symbol; }

        if (againstAI === false){
            p2Name = document.getElementById("P2Name").value;
            p2Symbol = document.getElementById("P2Symbol").value;
            
            if (p2Name !== ""){ player2.name = p2Name; }
            if (p2Symbol !== ""){ player2.symbol = p2Symbol; }
        }
    }

    return { vsPlayer, startGame };
})();

const getBoardElement = () => {
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
};

const gameManagement = (() => {
    const resetBoard = () => {
        for (let i = 0; i < boardValues.length; i++) {
            boardValues[i] = "";
        }
    }

    const updateBoard = (location) => {
        var grid = document.getElementById("grid" + location);
        boardValues[location] = player.name;
        grid.classList.add("full");
        grid.classList.add(player.name);
        grid.removeEventListener("click", function() {
            clickGrid(location);
          });
        checkForWin(location);
        if (player === player1){
            grid.innerText = player1.symbol;
            player = player2;
        }else {
            grid.innerText = player2.symbol;
            player = player1;
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
                    if (boardValues[gridValueToCheck] == player.name){
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