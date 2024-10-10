const displayPrevOperand = document.querySelector("#prev-operand");
const displayCurrentOperand = document.querySelector("#current-operand");
const displayOperator = document.querySelector("#operator");

function add(oper1, oper2) {
    return oper1 + oper2;
}

function subtract(oper1, oper2) {
    return oper1 - oper2;
}

function multiply(oper1, oper2) {
    return oper1 * oper2;
}

function divide(oper1, oper2) {
    return oper1 / oper2;
}

function operate(oper1, oper2, operation) {
    if (operation === "add") {
        return add(oper1, oper2);
    
    } else if (operation === "subtract") {
        return subtract(oper1, oper2);
    
    } else if (operation === "multiply") {
        return multiply(oper1, oper2);

    } else if (operation === "divide") {
        return divide(oper1, oper2);

    }
}

document.querySelector("#keys").addEventListener("click", event => {
    if (event.target.dataset.type === "number" && !(event.target.textContent === "." && displayCurrentOperand.textContent.includes("."))) {
        displayCurrentOperand.textContent += event.target.textContent;

    }
});

document.querySelector("#delete-btn").addEventListener("click", event => {
    displayCurrentOperand.textContent = displayCurrentOperand.textContent.slice(0, -1);
})