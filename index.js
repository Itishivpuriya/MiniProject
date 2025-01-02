let gameset = [];  // Store the generated sequence
let startset = []; // Store the player's input
let btns = [
    "btn1", "btn2", "btn3", "btn4", 
    "btn5", "btn6", "btn7", "btn8", 
    "btn9", "btn10", "btn11", "btn12"
]; // Button colors
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
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// Flash effect for user input
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
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

        if (startset.length === gameset.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score: <b>${level}</b> <br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "#b1e890";
        }, 150);
        resetGame();
    }
}

// Button press event - handle user clicks
function btnPress() {
    let btn = this;
    userFlash(btn);

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

// Attach event listeners to all buttons using event delegation
document.getElementById("contenar-div").addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("btn")) {
        btnPress.call(event.target);
    }
});
