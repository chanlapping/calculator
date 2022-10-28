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


// event listeners
numBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (displayValue.length >= 10) {
        return;
    }
    displayValue += e.target.value;
    display.textContent = displayValue;
}));

operatorBtns.forEach(btn => btn.addEventListener('click', (e) => {
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
    operator = e.target.value;
    displayValue = '';
}));

equalBtn.addEventListener('click', () => {
    if (storedValue === '' || displayValue === '') {
        return;
    }
    display.textContent = operate(operator, storedValue, +displayValue);
    storedValue = '';
    displayValue = '';
    operator = '';
});

clearBtn.addEventListener('click', () => {
    displayValue = '';
    storedValue = '';
    operator = '';
    display.textContent = '0';
})


