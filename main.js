let currentNumber = '0';
let previousNumber = null;
let operator = null;

const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');
const clearButton = document.querySelector('[onclick="clearDisplay()"]');

// Format the number with commas
function formatNumber(num) {
  if (num === 'Error') return num;
  const [integer, decimal] = num.split('.');
  const formattedInteger = parseInt(integer, 10).toLocaleString();
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}

// Update the display with formatted number
function updateDisplay() {
  display.textContent = formatNumber(currentNumber);
  toggleClearButton(); // Check and toggle the clear button text
}

// Toggle the clear button between "AC" and "X"
function toggleClearButton() {
  if (currentNumber === '0' && previousNumber === null && operator === null) {
    clearButton.textContent = 'AC';
  } else {
    clearButton.textContent = 'X';
  }
}

// Append a number
function appendNumber(number) {
  if (currentNumber === '0') {
    currentNumber = number.toString();
  } else {
    currentNumber += number;
  }
  updateDisplay();
}

// Append a dot
function appendDot() {
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
  }
  updateDisplay();
}

// Clear the display or last digit
function clearDisplay() {
  if (clearButton.textContent === 'X') {
    clearLastDigit(); // If the button says "X", clear the last digit
  } else {
    currentNumber = '0';
    previousNumber = null;
    operator = null;
    updateDisplay();
  }
}

// Clear the last digit
function clearLastDigit() {
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.slice(0, -1);
  } else {
    currentNumber = '0';
  }
  updateDisplay();
}

// Toggle sign
function toggleSign() {
  currentNumber = (parseFloat(currentNumber) * -1).toString();
  updateDisplay();
}

// Apply percent
function applyPercent() {
  currentNumber = (parseFloat(currentNumber) / 100).toString();
  updateDisplay();
}

// Set the operator
function setOperator(op) {
  if (previousNumber === null) {
    previousNumber = currentNumber;
    currentNumber = '0';
  } else if (operator) {
    calculate();
  }
  operator = op;
}

// Perform calculation
function calculate() {
  if (operator && previousNumber !== null) {
    const num1 = parseFloat(previousNumber.replace(/,/g, '')); // Remove commas
    const num2 = parseFloat(currentNumber.replace(/,/g, '')); // Remove commas

    switch (operator) {
      case '+':
        currentNumber = (num1 + num2).toString();
        break;
      case '-':
        currentNumber = (num1 - num2).toString();
        break;
      case '*':
        currentNumber = (num1 * num2).toString();
        break;
      case '/':
        currentNumber = num2 === 0 ? 'Error' : (num1 / num2).toString();
        break;
    }

    previousNumber = null;
    operator = null;
    updateDisplay();
  }
}
document.querySelector('.image-button').addEventListener('click', () => {
  alert('Image button clicked!');
});



