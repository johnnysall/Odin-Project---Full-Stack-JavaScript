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
    gameSetup.gameInfo();
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", function() {
    gameManagement.resetGame();
});

const gridContainer = document.getElementById("gridContainer");

const p1DetailsContainer = document.getElementById("p1Container");
const p2DetailsContainer = document.getElementById("p2Container");
const playerAITitle = document.getElementById("playerAITitle");

const p1Score = document.getElementById("p1Score");
const p2Score = document.getElementById("p2Score");
let score = [0,0];

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

let aiDifficultyLvl = 50;

// Player 1 = naughts, Player 2 = Crosses
const player1 = { name: "Player1", symbol: "x" }
const player2 = { name: "Player2", symbol: "o" }

let player = player1;
let startPlayer = player1;

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
    
    const gameInfo = () => {
        p1Name = document.getElementById("P1Name").value;
        p1Symbol = document.getElementById("P1Symbol").value;

        if (againstAI === false){
            p2Name = document.getElementById("P2Name").value;
            p2Symbol = document.getElementById("P2Symbol").value;

            let playerValues = [[],["Please Enter a Name",
                                    "Must be a Single Character",
                                    "Please Enter a Name",
                                    "Must be a Single Character"]];

            playerValues[0].push(p1Name, p1Symbol, p2Name, p2Symbol);

            if (playerValues[0].includes("")){
                resetForms();
            } else {
                if (playerValues[0][0] !== playerValues[0][2]) {
                    if (playerValues[0][1] !== playerValues[0][3]) {
                        if (playerValues[0][1].length === 1){
                            if (playerValues[0][3].length === 1){
                                player1.name = playerValues[0][0];
                                player2.name = playerValues[0][2];
                                player1.symbol = playerValues[0][1];
                                player2.symbol = playerValues[0][3];
                                gameManagement.startGame();
                            } else {
                                console.log("Must be a Single Character");
                                resetForms();
                            }
                        } else {
                            console.log("Must be a Single Character");
                            resetForms();
                        }
                    } else {
                        console.log("Cant have the same Symbol");
                        resetForms();
                    }
                } else {
                    console.log("Cant have the same Name");
                    resetForms();
                }
            }
        } else {
                if (p1Name !== ""){ player1.name = p1Name; }
                if (p1Symbol !== ""){ player1.symbol = p1Symbol; }

                player2.name = "ai";
                if (p1Symbol === "x"){
                    player2.symbol = "o";
                } else {
                    player2.symbol = "x";
                }
                gameManagement.startGame();
        }
    }

    const resetForms = () =>{
        document.getElementById("P1Name").value = "";
        document.getElementById("P1Symbol").value = "";
        document.getElementById("P2Name").value = "";
        document.getElementById("P2Symbol").value = "";
    }

    return { vsPlayer, gameInfo, resetForms };
})();

const getBoardElement = () => {
    const gridItems = [];
    let x = 0;
    while (x < 9){
        gridItems[x] = document.getElementById("grid" + x);
        let location = x;
        gridItems[x].addEventListener("click", function() {
            this.removeEventListener('click', arguments.callee);
            gameManagement.updateBoard(location);
        });
        x++;
    };
};

const gameManagement = (() => {
    const startGame = () => {
        player = player1;
        startPlayer = player1;
        document.getElementById("indexMain").classList.add("toGamePage");
        p1Score.innerText = player1.name + ": " + score[0];
        p2Score.innerText = player2.name + ": " + score[1];
        getBoardElement();
    }

    const resetGame = () => {
        resetBoard();
        if (startPlayer === player1) {
            startPlayer = player2;
        } else {
            startPlayer = player1;
        }
        getBoardElement();
    }

    const resetBoard = () => {
        for (let i = 0; i < boardValues.length; i++) {
            var grid = document.getElementById("grid" + i);
            boardValues[i] = "";
            grid.remove();
            var gridToAdd = document.createElement("div");
            gridToAdd.className = "singleGrid emptyGrid";
            gridToAdd.id = "grid" + i;
            gridToAdd.addEventListener("click", function() {
                this.removeEventListener('click', arguments.callee);
                gameManagement.updateBoard(location);
            });

            gridContainer.appendChild(gridToAdd);
        }
    }

    const updateBoard = (location) => {
        boardValues[location] = player.name;
        var grid = document.getElementById("grid" + location);
        try {
            grid.classList.add("full");
            grid.classList.add(player.name);
        } catch {
            return;
        }

        grid.removeEventListener("click", function() {
            clickGrid(location);
        });
        grid.innerText = player.symbol;
        checkForWin(location);
        changePlayer();

        // if (player === player1){
        //     checkForWin(location);
        //     player = player2;
        // }else {
        //     checkForWin(location);
        //     player = player1;
        // }
    }

    const changePlayer = () => {
        if (player === player1){
            player = player2;
        } else {
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
                    resetGame();
                    if (player === player1){
                        score[0] += 1;
                    } else {
                        score[1] += 1;
                    }
                    p1Score.innerText = player1.name + ": " + score[0];
                    p2Score.innerText = player2.name + ": " + score[1];
                }
            }
        }

        if (!boardValues.includes("")){
            console.log("Draw");
            resetGame();
            score[0] += 1;
            score[1] += 1;
            p1Score.innerText = player1.name + ": " + score[0];
            p2Score.innerText = player2.name + ": " + score[1];
        }
    }

    return {startGame, resetGame, resetBoard, updateBoard, changePlayer, checkForWin};
})();

const AI = (() => {
    const aiDifficulty = () => {

    }

    const aiMove = () => {
        // Search Depth changes according to difficulty
        if (boardValues.includes(player1.name) || boardValues.includes(player2.name)) {

        } else {
            boardValues[0] = player2.name;
        }
    }

    return {aiDifficulty, aiMove};
});