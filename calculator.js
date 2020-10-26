let previousOperand = document.getElementsByClassName("previous-operand")[0];
let currentOperand = document.getElementsByClassName("current-operand")[0];

const numbers = document.getElementsByClassName("number");
const numbersArray = Array.from(numbers);

//Набор цифр в текущем операнде 
numbersArray.forEach(num => {
    num.addEventListener("click", () => {
        let numValue = parseFloat(num.innerHTML);
        currentOperand.innerHTML += numValue;
    })
});

const operationButton = document.getElementsByClassName("operation");
const operationArray = Array.from(operationButton);





