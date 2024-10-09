let oper1, oper2, operation;
const displayPrevOperand = document.querySelector("#prev-operand");
const displayCurrentOperand = document.querySelector("#current-operand");

function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function operator(operand1, operand2, operator) {
    if (operator === "add") {
        return add(operand1, operand2);
    
    } else if (operator === "subtract") {
        return subtract(operand1, operand2);
    
    } else if (operator === "multiply") {
        return multiply(operand1, operand2);

    } else if (operator === "divide") {
        return divide(operand1, operand2);

    }
}

document.querySelectorAll(".number-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
        if (!(event.target.dataset.value === "." && displayCurrentOperand.textContent.includes("."))) {
            displayCurrentOperand.textContent += event.target.dataset.value;

        }
    });
});

document.querySelector("#delete-btn").addEventListener("click", event => {
    displayCurrentOperand.textContent = displayCurrentOperand.textContent.slice(0, -1);
})