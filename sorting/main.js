const CANVAS_BACKGROUND_COLOUR = "rgba(0, 0, 0, 1)";
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let mode = "Waiting";
let algorithm = "Bubble sort";
let arraySize = 200;
let min = 1;
let max = 50;
let values = getRandomArrayOfIntegers(arraySize, min, max);
let maxValue = Math.max(...values);
let speed = 1000 / (arraySize / 4);

configureWindow();
main();

window.addEventListener("resize", configureWindow, false);

/**
 * Event listener for 'Sort' button.
 */
document.getElementById("run").addEventListener("click", function() {
    if (mode === "Waiting") {
        let menu = document.getElementById("algorithm");
        algorithm = menu.options[menu.selectedIndex].value;
        mode = "Sorting";
    }
});

/**
 * Event listener for 'Generate random values' button.
 */
document.getElementById("generateValues").addEventListener("click", function() {
    min = document.getElementById("min").value;
    max = document.getElementById("max").value;
    arraySize = document.getElementById("arraySize").value;
    values = getRandomArrayOfIntegers(arraySize, min, max);
    maxValue = Math.max(...values);
    speed = 1000 / (arraySize / 4);
    context.lineWidth = canvas.width / (arraySize * 2);
    mode = "Waiting";
});

/**
 * Main function, handles sorting.
 */
function main() {
    setTimeout(function onTick() {
        if (mode === "Sorting") {
            let swapped;

            if (algorithm === "Bubble sort") {
                swapped = bubbleSort(values);
            } else if (algorithm === "Insertion sort") {
                swapped = insertionSort(values);
            }

            if (!swapped) {
                mode = "Done sorting";
            }
        }

        clearCanvas();
        drawArray(values);

        main();
    }, speed);
}

/**
 * Draw values.
 */
function drawArray(values) {
    // Draw values.
    context.strokeStyle = "white";
    for (let i = 0; i < values.length; i++) {
        context.beginPath();
        context.moveTo(i * canvas.width / values.length, canvas.height);
        context.lineTo(i * canvas.width / values.length, canvas.height - values[i] * canvas.height / maxValue);
        context.stroke();
    }
}

/**
 * Sorts values by Bubble sort, only one iteration.
 */
function bubbleSort(values) {
    let swapped = false;
    for (let i = 1; i < values.length; i++) {
        if (values[i-1] > values[i]) {
            swapped = true
            let temp = values[i-1];
            values[i-1] = values[i];
            values[i] = temp;
        }
    }
    return swapped;
}

/**
 * Sorts values by some Insertion sort, only one iteration.
 */
function insertionSort(values) {
    for (let i = 1; i < values.length; i++) {
        if (values[i-1] > values[i]) {
            for (let j = 0; j < i; j++) {
                if (values[i] < values[j]) {
                    let temp = values[i];
                    values[i] = values[j];
                    values[j] = temp;
                }
            }
            return true;
        }
    }
    return false;
}

/**
 * Fills entire canvas.
 */
function clearCanvas() {
    context.fillStyle = CANVAS_BACKGROUND_COLOUR;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Output is an array of size n with random integers x where min <= x <= max.
 */
function getRandomArrayOfIntegers(n, min, max) {
    let values = [];
    for (let i = 0; i < n; i++) {
        values.push(randomIntInRange(min, max));
    }
    return values;
}

/**
 * Output is random integer x where min <= x <= max.
 */
function randomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Set window size. Also set drawing variables
 * that are shared across the game.
 */
function configureWindow() {
    const logicalWidth = 1366;
    const logicalHeight = 768;
    canvas.width = logicalWidth;
    canvas.height = logicalHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    context.lineWidth = canvas.width / (arraySize * 2);

    // Fill once with completely black
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}