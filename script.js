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
        return 'Error! Division by 0.';
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a , b);
    }
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

// store the first number that is input into the calculator when a user presses an operator
// save which operation has been chosen
// operate() on them when the user presses the “=” key
// once operate() has been called, update the display with the ‘solution’ to the operation
// 
// operator click
// if first number = ''
//   first number = display value
//   operator = button value
// else
//   result = operate(operator, first, display value)
//   first number = result
//   display result
// display value = ''

// equal btn click
// if first = '' or display value = '' return
// result = operate(operator, first, display value)
// display result
// first = ''
// display value = ''