let direction = {x:0, y:0};
const foodSound = new Audio('../sounds/food.mp3');
const gameOverSound = new Audio('../sounds/gameover.mp3');
const moveSound = new Audio('../sounds/move.mp3');
const musicSound = new Audio('../sounds/music.mp3')
let speed = 2
let lastPaintTime = 0;
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
    //Part 2: render the snake and food
}

window.requestAnimationFrame(main);