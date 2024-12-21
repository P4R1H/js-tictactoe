const board = document.getElementById("board");
const winner = document.getElementById("Winner");
const whosTurn = document.getElementById("Turn");
const reset = document.getElementById("reset");


let state = [-1, -1, -1,
             -1, -1, -1,
             -1, -1, -1]   
let turn = 0;
let disabled = 0;

reset.addEventListener("click", () => {
    state = [-1, -1, -1,
        -1, -1, -1,
        -1, -1, -1]
    turn = 0;
    disabled = 0;
    
    for(let child of board.children) {
        child.textContent = "";
        child.classList.remove("p1");
        child.classList.remove("p2");
    }
    whosTurn.textContent = "Player: 1";
    winner.textContent = "";
})

board.addEventListener("click", (e) => {
    if(disabled) return;

    const cell = e.target;
    cellIndex = cell.id - 1

    if (state[cellIndex] === -1) {
        state[cellIndex] = turn;
        cell.textContent = turn === 0 ? "X" : "O";
        cell.classList.add(turn === 0 ? "p1" : "p2");
        
        turn = 1 - turn;
        whosTurn.textContent = "Player: " + (turn+1);
        
        let out = checkForWinner();

        if (out != -1) {
            winner.innerHTML = `<strong>Winner: ${out + 1}</strong>`;
            disabled = 1;
        }
        if (out == -1 && !state.includes(-1)) {
            winner.innerHTML = `<strong>Draw!</strong>`;
            disabled = 1;
        }

    }
})

function checkForWinner() {
    for (let i = 0; i < 3; i++) {
        if (state[i * 3] === state[i * 3 + 1] && state[i * 3 + 1] === state[i * 3 + 2] && state[i * 3] !== -1) {
            return state[i * 3];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (state[i] === state[i + 3] && state[i + 3] === state[i + 6] && state[i] !== -1) {
            return state[i];
        }
    }

    if (state[0] === state[4] && state[4] === state[8] && state[0] !== -1) {
        return state[0];
    }
    if (state[2] === state[4] && state[4] === state[6] && state[2] !== -1) {
        return state[2];
    }
    return -1;
}