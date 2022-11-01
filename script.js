function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Division by 0.';
    }
    return a / b;
}

function operate(operator, a, b) {
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a , b);
            break;
    }
    if (result === 'Division by 0.') {
        return result;
    }
    if (result.toString().length > 10) {
        result = result.toPrecision(10);
    }
    return result;
}

// initialize state of machine
let displayValue = '';
let storedValue = '';
let operator = '';

// UI components
const display = document.querySelector('.display');
const numBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.operate');
const clearBtn = document.querySelector('.clear');
const signBtn = document.querySelector('.sign');
const backSpaceBtn = document.querySelector('.backspace');
const decimalBtn = document.querySelector('.decimal');

// event listeners
numBtns.forEach(btn => btn.addEventListener('click', inputNum));

function inputNum(e) {
    if (displayValue.length >= 10) {
        return;
    }
    if (displayValue === '0') {
        displayValue = '';
    }
    if (e.type === 'click') {
        displayValue += e.target.value;
    } else {
        displayValue += e.key;
    }
    
    display.textContent = displayValue;
}

operatorBtns.forEach(btn => btn.addEventListener('click', handleOperator));

function handleOperator(e) {
    if (displayValue === '') {
        return;
    }
    if (storedValue === '') {
        storedValue = +displayValue;
    }
    else {
        storedValue = operate(operator, storedValue, +displayValue);
        display.textContent = storedValue;
    }
    if (e.type === 'click') {
        operator = e.target.value;
    } else {
        operator = e.key;
    }
    
    displayValue = '';
}

equalBtn.addEventListener('click', handleEqual);

function handleEqual() {
    if (storedValue === '' || displayValue === '') {
        return;
    }
    display.textContent = operate(operator, storedValue, +displayValue);
    storedValue = '';
    displayValue = '';
    operator = '';
}

clearBtn.addEventListener('click', handleClear);

function handleClear() {
    displayValue = '';
    storedValue = '';
    operator = '';
    display.textContent = '0';
}

signBtn.addEventListener('click', changeSign);

function changeSign() {
    if (displayValue === '' || displayValue === '0') {
        return;
    }
    if (displayValue[0] === '-') {
        displayValue = displayValue.substring(1);  
    } else {
        displayValue = '-' + displayValue;
    }
    display.textContent = displayValue;
}

backSpaceBtn.addEventListener('click', backspace);

function backspace() {
    if (displayValue === '' || displayValue === '0') {
        return;
    }
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
    display.textContent = displayValue;
}

decimalBtn.addEventListener('click', handleDecimal);

function handleDecimal() {
    if (displayValue.includes('.')) {
        return;
    }
    displayValue += '.';
    display.textContent = displayValue;
}

window.addEventListener('keydown', (e) => {
    if (Number.isInteger(Number(e.key))) {
        inputNum(e);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e);
    } else if (e.key === '=') {
        handleEqual();
    } else if (e.key === 'Escape') {
        handleClear();
    } else if (e.key === 's' || e.key === 'S') {
        changeSign();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === '.') {
        handleDecimal();
    }
})