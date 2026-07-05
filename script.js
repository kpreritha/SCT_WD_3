const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
const pvpBtn = document.getElementById("pvp-btn");
const pveBtn = document.getElementById("pve-btn");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;
let computerMode = false;

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

resetBtn.addEventListener("click",resetGame);

pvpBtn.addEventListener("click",()=>{
    computerMode=false;
    pvpBtn.classList.add("active");
    pveBtn.classList.remove("active");
    resetGame();
});

pveBtn.addEventListener("click",()=>{
    computerMode=true;
    pveBtn.classList.add("active");
    pvpBtn.classList.remove("active");
    resetGame();
});

function cellClicked(){

    const index=this.dataset.index;

    if(board[index]!="" || !gameActive)
        return;

    playMove(this,index,currentPlayer);

    if(checkWinner()) return;

    currentPlayer=currentPlayer==="X"?"O":"X";

    updateStatus();

    if(computerMode && currentPlayer==="O"){
        setTimeout(computerMove,500);
    }
}

function playMove(cell,index,player){

    board[index]=player;
    cell.textContent=player;
    cell.classList.add(player==="X"?"x":"o");

}

function updateStatus(){

    if(computerMode){

        statusText.textContent=currentPlayer==="X"
        ?"Player 1's Turn"
        :"Computer's Turn";

    }else{

        statusText.textContent=currentPlayer==="X"
        ?"Player 1's Turn"
        :"Player 2's Turn";

    }

}

function checkWinner(){

    for(let pattern of winPatterns){

        const[a,b,c]=pattern;

        if(board[a] &&
           board[a]===board[b] &&
           board[a]===board[c]){

            gameActive=false;

            if(computerMode){

                statusText.textContent=currentPlayer==="X"
                ?"🎉 Player 1 Wins!"
                :"🤖 Computer Wins!";

            }else{

                statusText.textContent=currentPlayer==="X"
                ?"🎉 Player 1 Wins!"
                :"🎉 Player 2 Wins!";

            }

            return true;
        }

    }

    if(!board.includes("")){

        statusText.textContent="🤝 It's a Draw!";
        gameActive=false;
        return true;

    }

    return false;
}

function computerMove(){

    if(!gameActive) return;

    let empty=[];

    board.forEach((cell,index)=>{

        if(cell=="")
            empty.push(index);

    });

    const randomIndex=empty[Math.floor(Math.random()*empty.length)];

    playMove(cells[randomIndex],randomIndex,"O");

    if(checkWinner()) return;

    currentPlayer="X";

    updateStatus();

}

function resetGame(){

    board=["","","","","","","","",""];

    currentPlayer="X";

    gameActive=true;

    cells.forEach(cell=>{

        cell.textContent="";
        cell.classList.remove("x","o");

    });

    updateStatus();

}