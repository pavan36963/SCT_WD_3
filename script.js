const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const newGameBtn = document.getElementById("newGame");

const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
const drawScore = document.getElementById("drawScore");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let running = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",cellClicked);
});

restartBtn.addEventListener("click",restartGame);
newGameBtn.addEventListener("click",newMatch);

function cellClicked(){

    const index=this.dataset.index;

    if(board[index]!=="" || !running){
        return;
    }

    board[index]=currentPlayer;
    this.textContent=currentPlayer;

    if(currentPlayer==="X"){
        this.style.color="#00E5FF";
    }else{
        this.style.color="#FFEB3B";
    }

    checkWinner();
}

function checkWinner(){

    let winnerCells=[];

    for(let pattern of winPatterns){

        const a=pattern[0];
        const b=pattern[1];
        const c=pattern[2];

        if(
            board[a]!=="" &&
            board[a]===board[b] &&
            board[b]===board[c]
        ){

            winnerCells=[a,b,c];

            winnerCells.forEach(i=>{
                cells[i].classList.add("winner");
            });

            running=false;

            if(currentPlayer==="X"){
                xWins++;
                xScore.textContent=xWins;
            }else{
                oWins++;
                oScore.textContent=oWins;
            }

            statusText.innerHTML="🎉 Player "+currentPlayer+" Wins!";

            return;
        }

    }

    if(!board.includes("")){

        draws++;

        drawScore.textContent=draws;

        statusText.innerHTML="🤝 Match Draw!";

        running=false;

        return;

    }

    currentPlayer=currentPlayer==="X"?"O":"X";

    statusText.innerHTML="Player "+currentPlayer+"'s Turn";

}

function restartGame(){

    board=["","","","","","","","",""];

    running=true;

    currentPlayer="X";

    statusText.innerHTML="Player X's Turn";

    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove("winner");

        cell.style.color="white";

    });

}

function newMatch(){

    restartGame();

    xWins=0;
    oWins=0;
    draws=0;

    xScore.textContent=0;
    oScore.textContent=0;
    drawScore.textContent=0;

}