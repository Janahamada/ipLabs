const display = document.getElementById('display');
const keys = document.getElementById('keys');

let firstValue = '';
let operator = '';
let previousKeyType = '';

keys.addEventListener('click', e => {
    const btn = e.target;
    if (!btn.matches('button')) return;

    const action = btn.classList;
    const val = display.value;

    if (action.contains('operator')) {
        firstValue = val;
        operator = btn.textContent;
        display.value = '';
        previousKeyType = 'operator';
    } else if (action.contains('equals')) {
        display.value = calculate(firstValue, operator, val);
    } else if (action.contains('clear')) {
        display.value = '';
        firstValue = operator = previousKeyType = '';
    } else {
        display.value = (val === '' || previousKeyType === 'operator')
            ? btn.textContent
            : val + btn.textContent;
        previousKeyType = 'number';
    }
});

function calculate(a, op, c) {
    const n1 = parseFloat(a);
    const n2 = parseFloat(c);
    switch (op) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '*': return n1 * n2;
        case '/': return n1 / n2;
        default:  return c;
    }
}