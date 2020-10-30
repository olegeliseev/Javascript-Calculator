const numbers = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const allClearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const pointButton = document.querySelector(".point");
const computeButton = document.querySelector(".compute");
const currentOperandDisplay = document.querySelector(".current-operand");
const previousOperandDisplay = document.querySelector(".previous-operand");
let currentOperation;

//Передает значение текущего операнда в предедущий, а текущий обнуляется
const operation = () => {
    if (previousOperandDisplay.innerHTML.length > 0) {
        compute();
    }
    previousOperandDisplay.innerHTML = currentOperandDisplay.innerHTML + " " + currentOperation;
    currentOperandDisplay.innerHTML = "";
}

//Производит операцию в зависимости от знака и обновляет значения предыдущего и текущего операндов
const compute = () => {
    let previousOperand = parseFloat(previousOperandDisplay.innerHTML);
    let currentOperand = parseFloat(currentOperandDisplay.innerHTML);
    let result;
    if (currentOperation === "+") {
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

//Сбрасывает значения предыдущего и текущего операндов, а также знак текущей операции
const allClear = () => {
    previousOperandDisplay.innerHTML = "";
    currentOperandDisplay.innerHTML = "";
    currentOperation = undefined;
}

//Удаляет последнее введенное значение в текущем операнде
const del = () => {
    currentOperandDisplay.innerHTML = currentOperandDisplay.innerHTML.substring(0, currentOperandDisplay.innerHTML.length - 1);
}

//Добавляет точку для дроби в том случае, если текущей операнд не пустой, и точка не была добавлена до этого
const point = () => {
    if (currentOperandDisplay.innerHTML.length <= 0) {
        return;
    } else if (currentOperandDisplay.innerHTML.includes(".")) {
        return;
    } else {
        currentOperandDisplay.innerHTML += ".";
    }
}

//Присваивает цифру нажатой кнопки к текущему операнду
numbers.forEach(element => {
    element.addEventListener("click", () => {
        let num = element.innerHTML;
        currentOperandDisplay.innerHTML += num;
    });
});

//Присваивает переменной currentOperation знак текущей операции и вызывает функцию operation
operationButtons.forEach(element => {
    element.addEventListener("click", () => {
        currentOperation = element.innerHTML;
        operation();
    });
});

//Вызывает функцию счета при нажатии на кнопку "="
computeButton.addEventListener("click", () => {
    compute(currentOperation);
});

//Вызывает функцию полного сброса allClear при нажатии на кнопку AC
allClearButton.addEventListener("click", () => {
    allClear();
});

//Вызывает функцию удаления последнего числа в текущем операнде
deleteButton.addEventListener("click", () => {
    del();
});

//Вызывает функицю добавления точки для дроби 
pointButton.addEventListener("click", () => {
    point();
});