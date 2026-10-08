    const character = document.getElementById("character");
    const runman = document.getElementById("runman");
    const hitboxDebug = document.getElementById("hitboxDebug");
    const gameOverPopup = document.getElementById("gameOverPopup");
    const restartButton = document.getElementById("restartButton");
    const jumpCounter = document.getElementById("jumpCounter");
    const game = document.getElementById("game");
    
    let spriteOffset = 110; 
    let currentFrame = 0;
    let previousAnimation;
    let jumpHeight = 0;
    let isJumping = false;
    let goingUp = true;
    let groundLevel = (game.clientHeight * 0.36) - spriteOffset;
    let jumps = 0;  
    let gameOver = false;
    let flowerx = 0;
    let skyx = 0;
    let cloudx = 0;
    let groundx = 0;
    


    const idleFrames = [
        "idle/fighter_Idle_0001.png",
        "idle/fighter_Idle_0002.png",
        "idle/fighter_Idle_0003.png",
        "idle/fighter_Idle_0004.png",
        "idle/fighter_Idle_0005.png",
        "idle/fighter_Idle_0006.png",
        "idle/fighter_Idle_0007.png",
        "idle/fighter_Idle_0008.png",
    ];


    const runFrames = [
        "run/fighter_run_0017.png",
        "run/fighter_run_0018.png",
        "run/fighter_run_0019.png",
        "run/fighter_run_0020.png",
        "run/fighter_run_0021.png",
        "run/fighter_run_0022.png",
        "run/fighter_run_0023.png",
        "run/fighter_run_0024.png",
    ];

    const dieFrames = [
        "death/fighter_death_0052.png",
        "death/fighter_death_0053.png",
        "death/fighter_death_0054.png",
        "death/fighter_death_0055.png",
        "death/fighter_death_0056.png",
        "death/fighter_death_0057.png",
        "death/fighter_death_0058.png",
        "death/fighter_death_0059.png",
        "death/fighter_death_0060.png",
        "death/fighter_death_0061.png",
    ];

    const jumpFrames = [
        "jump/fighter_jump_0043.png",
        "jump/fighter_jump_0044.png",
        "jump/fighter_jump_0045.png",
        "jump/fighter_jump_0046.png",
        "jump/fighter_jump_0047.png"
    ];

    let currentAnimation = idleFrames;

    setInterval(function () {
        if (currentAnimation.length > currentFrame ) {
        character.src = currentAnimation[currentFrame]
        currentFrame++ ; 
        
    }
    else {
        if (currentAnimation == jumpFrames){
            currentAnimation = previousAnimation;
            currentFrame = 0;}

        else if (currentAnimation === dieFrames) {
            currentFrame = dieFrames.length - 1;
            gameOverPopup.style.display = "block";
        }

        else {
            currentFrame = 0;
        }
    }
    }, 150);


    runman.addEventListener("click", function () {
        if (!gameOver) {
    currentAnimation = runFrames;
    currentFrame = 0;
}
        
    }
    );

    addEventListener("keydown", function (event) {
        if (event.code === "Space" && !isJumping && !gameOver) {
            previousAnimation = currentAnimation;
            currentAnimation = jumpFrames;
            currentFrame = 0;
            isJumping = true;
            
            
        
        }
    }
    );

    //jump-up

    setInterval(function () {

        if (isJumping) {

                if (jumpHeight === 150) {
        goingUp = false;
    }

    if (goingUp) {
        jumpHeight += 5;
    }
    else {
        jumpHeight -= 5;
    }

    if (jumpHeight === 0) {
        isJumping = false;
        goingUp = true;
    }

        }
    character.style.bottom = (groundLevel + jumpHeight) + "px";

    }, 15);

    //background move


    setInterval(function () {
        if (  !gameOver &&
            (currentAnimation === runFrames || previousAnimation === runFrames))
                {flowerx -=0.8;
                cloudx -=0.2;
                groundx -=0.4;

        game.style.backgroundPositionX = flowerx + "px,"
                                        + cloudx + "px",
                                        + groundx + "px,"
                                        +skyx + "px";}


    }, 1);


    function createObstacle() {
        
        let newObstacle = document.createElement("img");

        newObstacle.src = "rocks.png";
        newObstacle.className = "obstacle";

        game.appendChild(newObstacle);

        let newObstacleX = 0;
        let counted = false;

        setInterval(function () {

            if ( !gameOver &&
                (currentAnimation === runFrames || previousAnimation === runFrames)) {

                // Move this obstacle
                newObstacleX += 1;
                newObstacle.style.right = newObstacleX + "px";

                // Get CURRENT positions
                let characterBox = character.getBoundingClientRect();
                let obstacleBox = newObstacle.getBoundingClientRect();
                let characterLeft = characterBox.left + 210;
                let characterRight = characterBox.right - 200;
                let characterTop = characterBox.top + 150;
                let characterBottom = characterBox.bottom - 115;

                console.log({
                    left: characterLeft,
                    right: characterRight,
                    top: characterTop,
                    bottom: characterBottom,
                    width: characterRight - characterLeft,
                    height: characterBottom - characterTop
                                    });

                //hitbox debug
                hitboxDebug.style.left = (characterLeft - game.getBoundingClientRect().left) + "px";
                hitboxDebug.style.top = (characterTop - game.getBoundingClientRect().top) + "px";

                hitboxDebug.style.width = (characterRight - characterLeft) + "px";
                hitboxDebug.style.height = (characterBottom - characterTop) + "px";
                //hitbox debug

                if (obstacleBox.right < characterLeft && !counted) {
                    jumps++;
                    jumpCounter.textContent = "JUMPS: " + jumps;
                    counted = true;
                    }
                
                // Check collision
                if (   !gameOver &&
                    characterRight > obstacleBox.left &&
                    characterLeft < obstacleBox.right &&
                    characterBottom > obstacleBox.top &&
                    characterTop < obstacleBox.bottom
                ) {
                    gameOver = true;
                    isJumping = false;
                    jumpHeight = 0;
                    currentAnimation = dieFrames;
                    currentFrame = 0;
                }
            }

        }, 1);
    }

    function spawnRandomObstacle() {

        let randomTime = Math.random() * 5000 + 1000;

        setTimeout(function () {

            createObstacle();

            spawnRandomObstacle();

        }, randomTime);
    }

    spawnRandomObstacle();

    
restartButton.addEventListener("click", function () {
    location.reload();
});
 