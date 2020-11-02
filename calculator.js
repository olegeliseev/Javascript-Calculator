const numbers = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const allClearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
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

    //Значение num передается из параметров функции (значение номера нажатой кнопки) и присваивается к текущему операнду
    appendNumber(num) {
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    //Значение operation передается из параметров функции (знак операции нажатой кнопки) и присваивается к текущей операции
    chooseOperation(operation) {
        if (this.currentOperand.length === 0) return;
        if (this.previousOperand.length !== 0) {
            compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    percent() {
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        let result;
        //Если предыдущего операнда нет, просто делит текущий на 100
        if (current !== 0 && isNaN(previous)) {
            result = current / 100;
        //иначе, считает сколько % составляет текущий от предыдущего и присваеивает к текущему значеню, дальше расчет делается кнопкой = и функцией compute() 
        } else if (current !== 0 && previous !== 0) {
            result = (previous * current) / 100;
        }
        this.currentOperand = result;
    }

    //Форматирование чисел
    getDisplayNumber(number) {
        //разбивает число на целое значение и десятичное точкой
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        //Если целой части не существует, то результат будет пустой строкой
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            //иначе целая часть форматируется с запятыми 
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            //Если десятичная часть существует, то она присваивается к целой через точку
            return `${integerDisplay}.${decimalDigits}`
        } else {
            //иначе результатом будет только отформатированная челая часть
            return integerDisplay;
        }
    }

    compute() {
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        let result;
        //Если предыдущий либо текущий операнд - пустые, то кнопка = не сработает
        if (isNaN(previous) || isNaN(current)) return;
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

    //Обновляет вывод на экране после каждой операции, операнды предварительно форматируются с запятыми функцией getDisplayNumber()
    updateDisplay() {
        this.currentOperandDisplay.innerText = this.getDisplayNumber(this.currentOperand);
        //Если операция выбрана, выводу предыдущего операнда присваивается значение текущего вместе со знаком операции
        if (this.operation != null) {
            this.previousOperandDisplay.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            //иначе предыдущей операнд остается пустым
            this.previousOperandDisplay.innerText = "";
        }
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
});