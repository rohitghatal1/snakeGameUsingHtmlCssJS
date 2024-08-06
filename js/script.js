let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../sounds/food.mp3');
const gameOverSound = new Audio('../sounds/gameover.mp3');
const moveSound = new Audio('../sounds/move.mp3');
const musicSound = new Audio('../sounds/music.mp3')
let gameSpace = document.getElementById("gameBoard");
let speed = 2
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {
        x: 13,
        y: 15
    }
];
let food = { x: 15, y: 17 };
//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sArr){
    return false;
}

function gameEngine() {
    //part 1: updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game over. Press any key to play again!!!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //if the snake eats food
    if(snakeArr[0].y === food.y && snakeArr[x]===food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x:Math.round(a + (b-a)* Math.random()), y:Math.round(a + (b-a)* Math.random())}
    }

    // moving the snake 
    

    //Part 2: display the snake
    gameSpace.innerHtml = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakeBody');
        }
        gameSpace.appendChild(snakeElement);
    })

    //displayihng the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameSpace.appendChild(foodElement);
}

// game logic starts here 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1} //starting the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("Arrow right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

})