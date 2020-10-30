const currentOperandDisplay = document.querySelector(".current-operand");
const previousOperandDisplay = document.querySelector(".previous-operand");
const computeButton = document.querySelector(".compute");

const numbers = document.querySelectorAll(".number");
const numbersArray = Array.from(numbers);

//Присваивает цифру нажатой кнопки к текущему операнду
numbersArray.forEach(element => {
    element.addEventListener("click", () => {
        let num = element.innerHTML;
        currentOperandDisplay.innerHTML += num;
    });
});

const operation = () => {
    previousOperandDisplay.innerHTML = currentOperandDisplay.innerHTML;
    currentOperandDisplay.innerHTML = "";
}

const operationButtons = document.querySelectorAll(".operation");
const operationButtonsArray = Array.from(operationButtons)

operationButtonsArray.forEach(element => {
    element.addEventListener("click", () => {
        operation();
    });
});

const compute = () => {
    let previousOperand = parseInt(previousOperandDisplay.innerHTML);
    let currentOperand = parseInt(currentOperandDisplay.innerHTML);
    let result = previousOperand + currentOperand;
    previousOperandDisplay.innerHTML = "";
    currentOperandDisplay.innerHTML = result;
}

computeButton.addEventListener("click", () => {
    compute();
})

