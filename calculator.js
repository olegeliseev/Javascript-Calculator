const currentOperandDisplay = document.querySelector(".current-operand");
const previousOperandDisplay = document.querySelector(".previous-operand");
const computeButton = document.querySelector(".compute");
const allClearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const pointButton = document.querySelector(".point");

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
    let previousOperand = parseFloat(previousOperandDisplay.innerHTML);
    let currentOperand = parseFloat(currentOperandDisplay.innerHTML);
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

//Сбрасывает значения предыдущего и текущего операндов, а также знак текущей операции
const allClear = () => {
    previousOperandDisplay.innerHTML = "";
    currentOperandDisplay.innerHTML = "";
    currentOperation = "";
}

//Вызывает функцию полного сброса allClear при нажатии на кнопку AC
allClearButton.addEventListener("click", () => {
    allClear();
});

//Удаляет последнее введенное значение в текущем операнде
const del = () => {
    currentOperandDisplay.innerHTML = currentOperandDisplay.innerHTML.substring(0, currentOperandDisplay.innerHTML.length - 1);
}

//Вызывает функцию удаления последнего числа в текущем операнде
deleteButton.addEventListener("click", () => {
    del();
})

//Добавляет точку для дроби в том случае, если текущей операнд не пустой, и точка не была добавлена до этого
const point = () => {
    if(currentOperandDisplay.innerHTML.length <= 0) {
        return;
    } else if(currentOperandDisplay.innerHTML.includes(".")) {
        return;
    } else {
        currentOperandDisplay.innerHTML += ".";
    }
}

//Вызывает функицю добавления точки для дроби 
pointButton.addEventListener("click", () => {
    point();
})