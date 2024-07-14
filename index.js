const difficulty = document.getElementById("difficulty");
let size = Number(difficulty.value)

let direction = "right";
let pts = 0;
let snake = [0, 1, 2];
let moveTimer
let appleLocation = setApple();
let gameActive = false;
const grid = document.getElementById("grid");
const points = document.getElementById("pts");
// buttons
const startGameBtn = document.getElementById('startGame')
const buttonContainer = document.getElementById('buttonContainer')


// event listeners
// adjust direction but no backtracking with buttons
startGameBtn.addEventListener('click', startGame)
buttonContainer.addEventListener('click', (e) => {
    if(e.target.id === "up" && direction !== "down"){
        direction = "up"
    }else if(e.target.id === "down" && direction !== "up"){
        direction = "down"
    }else if(e.target.id === "left" && direction !== "right"){
        direction = "left"
    }else if(e.target.id === "right" && direction !== "left"){
        direction = "right"
    }}
)

// add event listener for keyboard, changes direction not backtracking
document.addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp" && direction !== "down"){
        direction = "up"
    }else if(e.key === "ArrowDown" && direction !== "up"){
        direction = "down"
    }else if(e.key === "ArrowLeft" && direction !== "right"){
        direction = "left"
    }else if(e.key === "ArrowRight" && direction !== "left"){
        direction = "right"
    }else if(e.key === "Enter" && !gameActive){
        startGame()
    }
})

difficulty.addEventListener('change', (e) => {
    size = Number(e.target.value)
    grid.style.width = size * 20 + 'px'
    resetValues()
    renderBoard()
})
// functions

function startGame(){
    gameActive = true
    difficulty.disabled = true
    startGameBtn.disabled = true
    resetValues()
    renderBoard()
    moveSnake();
}

function resetValues(){
    grid.innerHTML = ""
    direction = "right"
    pts = 0
    snake = [0, 1, 2]
}

const renderBoard = () => {
    grid.innerHTML = ""
    for(let i=0; i<size*size; i++){
        const div = document.createElement('div')
        div.classList.add('grid-space')
        grid.appendChild(div)
    }

    renderGameElements()
}

  function renderGameElements(){
        const allGridElems = document.querySelectorAll('.grid-space')
        snake.forEach((s) => {
            allGridElems[s].classList.add("snaky");
        });
        allGridElems[appleLocation].classList.add("apple");

  }

  function setApple(){
    const randomNum = Math.floor(Math.random() * (size*size))
    if(snake.includes(randomNum)){
        console.log("snake")
       return setApple()
    }else{
        console.log(randomNum)
        return randomNum
    }
  }

  function moveSnake(){
      let row = 0
      let col = 2
      moveTimer = setInterval(()=> {
        // add code here to move snake
        // update row and col values to control its grid location
        if(direction === "right"){
            col++
        }else if(direction === "down"){
           row += size
        }else if(direction === "left"){
            col--
        }else if(direction === "up"){
            row -= size
        }
        // check if snake is out of bounds
        if(col > size-1 || col < 0 || row > (size*size)-1 || row < 0){
            endGame()
            return
        }
        //calculate next grid space
        let nextMove = row + col
        // check if snake runs into itself
        if(snake.includes(nextMove)){
            endGame()
            return
        }
        // check if snake eats apple then generate new apple, add points and add snake length
        if(nextMove === appleLocation){
            appleLocation = setApple()
            console.log(`Apple:${appleLocation}`)
            pts++
            points.innerText = pts
            snake.unshift(snake[0])
        }
        snake.push(nextMove)
        snake.shift()
        renderBoard()
      }, 1000)

  } 

  function endGame(){
    clearInterval(moveTimer)
    gameActive = false
    difficulty.disabled = false
    startGameBtn.disabled = false
    grid.innerHTML += `<p class="game-over">Game over! Your score is ${pts}</p>`
  }


  renderBoard()