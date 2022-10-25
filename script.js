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

let displayValue = '';
const display = document.querySelector('.display');

const numBtns = document.querySelectorAll('.num');

numBtns.forEach(btn => btn.addEventListener('click', (e) => {
    displayValue += e.target.innerHTML;
    display.textContent = displayValue;
}));