const clearButton = document.querySelector(".clear-button");
const deleteButton = document.querySelector(".delete-button");
const decimalButton = document.querySelector(".decimal-button");
const equalsButton = document.querySelector(".equals-button");

const numbersButton = document.querySelectorAll(".number-button");
const operatorButton = document.querySelectorAll(".operator-button");

const lastDisplay = document.querySelector(".last-operation");
const display = document.querySelector(".current-number");

window.addEventListener('keydown', handleKeyboardInput);

let firstNumber = "";
let secondNumber = "";
let operator = "";
let writingMode = 0;

function operate(firstNumber, operator, secondNumber) {
    if (operator == "/") {
        result = Number(firstNumber) / Number(secondNumber);
        display.textContent = Math.round(result * 10000) / 10000;
    } else if (operator == "x") {
        result = Number(firstNumber) * Number(secondNumber);
        display.textContent = Math.round(result * 10000) / 10000;
    } else if (operator == "-") {
        result = Number(firstNumber) - Number(secondNumber);
        display.textContent = Math.round(result * 10000) / 10000;
    } else if (operator == "+") {
        result = Number(firstNumber) + Number(secondNumber);
        display.textContent = Math.round(result * 10000) / 10000;
    }
};


numbersButton.forEach((button) =>
    button.addEventListener("click", () => {
        if (display.textContent == "ERROR"){
            display.textContent = "";
        }
        if (writingMode == 0 && display.textContent.length < 17) {
            display.textContent += button.id;
        }
        if (writingMode == 1 && display.textContent.length < 17) {;
                display.textContent += button.id;
        }
    })
);

decimalButton.addEventListener("click", () => {
    if (display.textContent !== "" && display.textContent !== "ERROR") {
        if (display.textContent == "ERROR"){
            display.textContent = "";
        };
        
        if (display.textContent.includes(".")) {
            display.textContent += "";
        }else if (writingMode == 0 && display.textContent.length < 17) {
            display.textContent += decimalButton.id;
        } else if (writingMode == 1 && display.textContent.length < 17) {;
            display.textContent += decimalButton.id;
        }
    };
    
});

operatorButton.forEach((button) =>
    button.addEventListener("click", () => {
        firstNumber = display.textContent;
        operator = button.id;
        lastDisplay.textContent = `${firstNumber} ${operator}`;
        display.textContent = "";
        writingMode = 1;
    })
);

equalsButton.addEventListener("click", () => {
    if (writingMode == 1) {
        secondNumber = display.textContent;
        lastDisplay.textContent = "";
        if (operator == "/" && secondNumber.match("0")) {
            display.textContent = "ERROR";
            writingMode = 0;
        } else {
            operate(firstNumber, operator, secondNumber);
            writingMode = 2;
        }
    }
})

clearButton.addEventListener("click", () => {
    display.textContent = "";
    lastDisplay.textContent = "";
    writingMode = 0;
    firstNumber = [];
    secondNumber = [];
});

deleteButton.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0,-1);
})

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        display.textContent += e.key;
    }
}

