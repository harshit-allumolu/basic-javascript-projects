const gameButtons = document.querySelectorAll('[data-cell]')
var cells = ['','','','','','','','','']
var turn = 0

function gameOver(){
    if(cells[0] === cells[1] && cells[0] == cells[2] && cells[0] != '') return true
    else if(cells[3] === cells[4] && cells[3] == cells[5] && cells[3] != '') return true
    else if(cells[6] === cells[7] && cells[7] == cells[8] && cells[6] != '') return true
    else if(cells[0] === cells[4] && cells[0] == cells[8] && cells[0] != '') return true
    else if(cells[2] === cells[4] && cells[2] == cells[6] && cells[2] != '') return true
    else if(cells[0] === cells[3] && cells[0] == cells[6] && cells[0] != '') return true
    else if(cells[1] === cells[4] && cells[1] == cells[7] && cells[1] != '') return true
    else if(cells[2] === cells[5] && cells[2] == cells[8] && cells[2] != '') return true
    return false
}

gameButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(turn === 0){
            if (button.innerHTML === ''){
                button.innerHTML = 'X'
                cells[button.id-1] = 'X'
                turn = 1
            }
        }
        else if(turn === 1){
            if (button.innerHTML === ''){
                button.innerHTML = 'O'
                cells[button.id-1] = 'O'
                turn = 0
            }
        }
        if(gameOver() === true){
            if(turn === 1){
                alert('X has won the game!')
            }
            else if(turn === 0){
                alert('O has won the game')
            }
        }
    })
})