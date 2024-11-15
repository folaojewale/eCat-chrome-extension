console.log("Content script is running");

const characterContainer = document.createElement("div");
characterContainer.classList.add("Character");

const characterSprite = document.createElement("div");
characterSprite.classList.add("Character_spritesheet");

// Explicitly set the background image and style properties directly in JavaScript
const imagePath = chrome.runtime.getURL("./assets/pink.png");
characterSprite.style.backgroundImage = `url(${imagePath})`;
characterSprite.style.backgroundRepeat = "no-repeat";
characterSprite.style.backgroundSize = "contain"; // Ensures the image scales to fit

// characterSprite.classList.add("lookaround_left");

// Append sprite to container and container to body
characterContainer.appendChild(characterSprite);
document.body.appendChild(characterContainer);

console.log("Character sprite appended to container with background image:", characterSprite);

let isMoving = true;
let isFacingRight = true;

let previousX = null;

let walkOrRun_right = "walk_right"
let walkOrRun_left = "walk_left"

let lookAroundInterval = null;

function getDirection() {
    const characterRect = characterContainer.getBoundingClientRect();
    const currentX = characterRect.left;

    if (previousX !== null && isMoving) { // Check if there's a previous position to compare
        if (currentX > previousX) {
            characterSprite.classList.remove(walkOrRun_left);
            characterSprite.classList.add(walkOrRun_right);
            
            isFacingRight = true;
        } else if (currentX < previousX) {
            isFacingRight = false;
            characterSprite.classList.remove(walkOrRun_right);
            characterSprite.classList.add(walkOrRun_left);
        }
    }

    previousX = currentX; // Update previous position for the next check
}

// Call `getDirection()` on a periodic timer or within an animation frame to update direction, e.g.:
setInterval(getDirection, 1000); // checks every 1000ms

function updateDirection() {
    getDirection();
    requestAnimationFrame(updateDirection);
}

updateDirection(); // Starts the animation loop

// Function to manage the lookAround interval when sitting
function startLookAroundInterval() {
    if (!lookAroundInterval) {
        lookAroundInterval = setInterval(() => {
            lookAround(); 
        }, 42000); 
    }
}

function stopLookAroundInterval() {
    if (lookAroundInterval) {
        clearInterval(lookAroundInterval);
        lookAroundInterval = null; // Reset the interval ID
        characterSprite.classList.remove("lookaround_left");
        characterSprite.classList.remove("lookaround_right")
    }
}

function lookAround(){
    if(!isMoving){
        if(isFacingRight){
            characterSprite.classList.add("lookaround_right");

        } else if(!isFacingRight){
            characterSprite.classList.add("lookaround_left");

        }
    } else {
        characterSprite.classList.remove("lookaround_left");
        characterSprite.classList.remove("lookaround_right");
    }
}

//sit
characterContainer.addEventListener("click", () => {

    if (isMoving) {
        characterSprite.classList.remove("run_left", "run_right");
        if(isFacingRight){

            characterSprite.classList.add("sit_facingright");
        }
        else{

            characterSprite.classList.add("sit_facingleft");
        }

        characterContainer.style.animationPlayState = "paused";
        startLookAroundInterval();
        document.body.appendChild(interfaceContainer);

    } else if (!isMoving) {

        characterContainer.style.animationPlayState = "running";
        characterSprite.classList.remove("sit_facingleft", "sit_facingright");

        stopLookAroundInterval();

        if(document.body.contains(interfaceContainer)){
            document.body.removeChild(interfaceContainer)
        }
    }

    isMoving = !isMoving; // Toggle the movement state
  })