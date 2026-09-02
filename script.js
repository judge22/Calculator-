let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentTextElement = document.getElementById('current-operand');
const previousTextElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentTextElement.innerText = currentOperand;
    if (operation != null) {
        previousTextElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousTextElement.innerText = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;

    if (currentOperand === 'Error' || currentOperand === 'Cannot divide by 0') {
        currentOperand = '';
    }

    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
          
            if (current === 0) {
                currentOperand = 'Cannot divide by 0';
                operation = undefined;
                previousOperand = '';
                updateDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = Math.round(computation * 1000000) / 1000000;
    currentOperand = currentOperand.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}


function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}