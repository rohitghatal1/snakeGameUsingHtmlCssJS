let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../sounds/food.mp3');
const gameOverSound = new Audio('../sounds/gameover.mp3');
const moveSound = new Audio('../sounds/move.mp3');
const musicSound = new Audio('../sounds/music.mp3');
let gameSpace = document.getElementById("gameBoard");
let playbtn = document.getElementById("playBtn");
let playPause = document.getElementById("playpauseContainer");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let isPaused = false;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 15, y: 17 };

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if (isPaused) return;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sArr) {
    // If the snake collides with itself
    for (let i = 1; i < sArr.length; i++) {
        if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
            return true;
        }
    }
    // If the snake collides with the wall
    if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over. Press any key to play again!!!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If the snake eats the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake
    gameSpace.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snakeBody');
        }
        gameSpace.appendChild(snakeElement);
    });

    // Displaying the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameSpace.appendChild(foodElement);
}

// Swipe detection
function addSwipeControls() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.body.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    });

    document.body.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);

        if (absDiffX > absDiffY) {
            if (diffX > 0 && inputDir.x !== -1) { // Swipe right
                inputDir = { x: 1, y: 0 };
                moveSound.play();
            } else if (diffX < 0 && inputDir.x !== 1) { // Swipe left
                inputDir = { x: -1, y: 0 };
                moveSound.play();
            }
        } else {
            if (diffY > 0 && inputDir.y !== -1) { // Swipe down
                inputDir = { x: 0, y: 1 };
                moveSound.play();
            } else if (diffY < 0 && inputDir.y !== 1) { // Swipe up
                inputDir = { x: 0, y: -1 };
                moveSound.play();
            }
        }
    }
}

// Initialize the game
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1) {  // Prevent moving in the opposite direction
                musicSound.play();
                inputDir.x = 0;
                inputDir.y = -1;
                moveSound.play();
            }
            break;

        case "ArrowDown":
            if (inputDir.y !== -1) {  // Prevent moving in the opposite direction
                musicSound.play();
                inputDir.x = 0;
                inputDir.y = 1;
                moveSound.play();
            }
            break;

        case "ArrowLeft":
            if (inputDir.x !== 1) {  // Prevent moving in the opposite direction
                musicSound.play();
                inputDir.x = -1;
                inputDir.y = 0;
                moveSound.play();
            }
            break;

        case "ArrowRight":
            if (inputDir.x !== -1) {  // Prevent moving in the opposite direction
                musicSound.play();
                inputDir.x = 1;
                inputDir.y = 0;
                moveSound.play();
            }
            break;

        case " ":
            isPaused = !isPaused;
            if (isPaused) {
                musicSound.pause();
                playPause.style.display = "block";
                playbtn.style.display = "block";
            } else {
                musicSound.play();
                window.requestAnimationFrame(main);
                playPause.style.display = "none";
                playbtn.style.display = "none";
            }
            break;

        default:
            break;
    }
});

addSwipeControls(); // Add this line to initialize swipe controls

document.addEventListener('touchmove', function(event) {
    // Check if the user is swiping downward
    if (event.touches.length > 0) {
        let touch = event.touches[0];
        if (touch.clientY > 0) { // Detect downward swipe
            event.preventDefault(); // Prevent the default action (pull-to-refresh)
        }
    }
}, { passive: false }); // Set passive to false to call preventDefault
