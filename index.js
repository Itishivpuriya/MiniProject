
let gameset = [];  // Store the generated sequence
let startset = []; // Store the player's input
let btns = ["red", "blue", "green", "yellow"]; // Button colors
let start = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!start) {
        console.log("Game started");
        start = true;
        levelUp();
    }
});

// Flash effect for computer-generated sequence
function btnflash(btn) {
    if (!btn) {
        console.error("btn is null in btnflash");
        return;
    }
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash effect for user input
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Level up - generate a random color and flash it
function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    // Add a random color to the sequence
    let randIdx = Math.floor(Math.random() * btns.length);
    let randClr = btns[randIdx];
    let randbtn = document.querySelector(`#${randClr}`);
    gameset.push(randClr);

    // Flash the random button
    btnflash(randbtn);

    // Wait before allowing user input (1000ms)
    setTimeout(function () {
        // User can start clicking after the sequence is shown
    }, 1000);
}

// Check if user's input matches the generated sequence
function check() {
    let idx = startset.length - 1;

    if (startset[idx] === gameset[idx]) {
        console.log("Correct input");

        // If the player's input matches the sequence, check if it's the last color
        if (startset.length === gameset.length) {
            // Wait 1 second and level up
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game Over, display message and reset
        h2.innerHTML = `Game Over! your score <b>${level}<b> <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
               document.querySelector("body").style.backgroundColor="#b1e890";

        },150)
        resetGame();
    }
}

// Button press event - handle user clicks
function btnPress() {
    let btn = this;
    userFlash(btn);

    // Get the color ID of the button clicked
    let usercolor = btn.getAttribute("id");
    startset.push(usercolor);
    check();
}

// Reset the game after Game Over
function resetGame() {
    gameset = [];
    startset = [];
    level = 0;
    start = false;
}

// Attach event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
