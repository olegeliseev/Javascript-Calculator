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

//Передает значение текущего операнда в предедущий, а текущий обнуляется
const operation = () => {
    previousOperandDisplay.innerHTML = currentOperandDisplay.innerHTML;
    currentOperandDisplay.innerHTML = "";
}

const operationButtons = document.querySelectorAll(".operation");
const operationButtonsArray = Array.from(operationButtons);
let currentOperation; 

//Присваивает переменной currentOperation знак текущей операции и вызывает функцию operation
operationButtonsArray.forEach(element => {
    element.addEventListener("click", () => {
        currentOperation = element.innerHTML;
        operation();
    });
});


//Производит операцию в зависимости от знака и обновляет значения предыдущего и текущего операндов
const compute = () => {
    let previousOperand = parseInt(previousOperandDisplay.innerHTML);
    let currentOperand = parseInt(currentOperandDisplay.innerHTML);
    let result;
    if(currentOperation === "+") {
        result = previousOperand + currentOperand;
    } else if (currentOperation === "-") {
        result = previousOperand - currentOperand;
    } else if (currentOperation === "*") {
        result = previousOperand * currentOperand;
    } else if (currentOperation === "÷") {
        result = previousOperand / currentOperand;
    }
    previousOperandDisplay.innerHTML = "";
    currentOperandDisplay.innerHTML = result;
}

//Вызывает функцию счета при нажатии на кнопку "="
computeButton.addEventListener("click", () => {
    compute(currentOperation);
})

