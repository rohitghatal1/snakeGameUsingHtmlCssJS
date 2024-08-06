let direction = {x:0, y:0};
const foodSound = new Audio('../sounds/food.mp3');
const gameOverSound = new Audio('../sounds/gameover.mp3');
const moveSound = new Audio('../sounds/move.mp3');
const musicSound = new Audio('../sounds/music.mp3')
let gameSpace = document.getElementById("gameBoard");
let speed = 2
let lastPaintTime = 0;
let snakeArr = [
    {
        x:13,
        y: 15
    }
];
let food = {x:15, y:17};
//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function gameEngine(){
    //part 1: updating the snake array & food
    //Part 2: render the snake
    gameSpace.innerHtml = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('head');
        gameSpace.appendChild(snakeElement);
    })

    //displayihng the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameSpace.appendChild(foodElement);
}

window.requestAnimationFrame(main);