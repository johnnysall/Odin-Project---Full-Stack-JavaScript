console.log("HomePage.js")

const aiBtn = document.getElementById("aiBtn");
const playerBtn = document.getElementById("playerBtn");
aiBtn.addEventListener("click", function() {
    gameSetup.vsPlayer("ai");
});
playerBtn.addEventListener("click", function() {
    gameSetup.vsPlayer("player");
});

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function() {
    gameSetup.startGame();
});

const p1DetailsContainer = document.getElementById("p1Container");
const p2DetailsContainer = document.getElementById("p2Container");
const playerAITitle = document.getElementById("playerAITitle");

// Player 1 = naughts, Player 2 = Crosses
const player1 = { name: "", symbol: "o" }
const player2 = { name: "", symbol: "o" }

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
        document.location.href = "html/gamePage.html";
    }

    return { vsPlayer, startGame };
})();