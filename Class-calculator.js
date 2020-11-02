const numbers = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const allClearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const pointButton = document.querySelector(".point");
const percentButton = document.querySelector(".percent");
const computeButton = document.querySelector(".compute");
const currentOperandDisplay = document.querySelector(".current-operand");
const previousOperandDisplay = document.querySelector(".previous-operand");

class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.currentOperandDisplay = currentOperandDisplay;
        this.previousOperandDisplay = previousOperandDisplay;
        this.allClear();
    }

    allClear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(num) {
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    updateDisplay() {
        this.currentOperandDisplay.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandDisplay.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandDisplay.innerText = "";
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand.length === 0) return;
        if (this.previousOperand.length !== 0) {
            compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    point() {
        if (this.currentOperand.length <= 0) {
            return;
        } else if (this.currentOperand.includes(".")) {
            return;
        } else {
            this.currentOperand += ".";
        }
    }

    percent() {
        this.currentOperand = parseFloat(this.currentOperand / 100);
    }

    compute() {
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        let result;
        if(isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "*":
                result = previous * current;
                break;
            case "÷":
                result = previous / current;
                break;
            default: 
                return;
        }
        this.currentOperand = result;
        this.previousOperand = "";
        this.operation = undefined;
    }
}

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

numbers.forEach(number => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

computeButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.allClear();
    calculator.updateDisplay();
});

percentButton.addEventListener("click", () => {
    calculator.percent();
    calculator.updateDisplay();
})

pointButton.addEventListener("click", () => {
    calculator.point();
    calculator.updateDisplay();
});