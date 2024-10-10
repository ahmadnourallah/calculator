let oper1, oper2, operator;
const displayPrevOperand = document.querySelector("#prev-operator");
const displayCurrentOperand = document.querySelector("#current-operator");

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

function operator(oper1, oper2, operation) {
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
    if (event.target.classList.contains("number-btn") && !(event.target.textContent === "." && displayCurrentOperand.textContent.includes("."))) {
        displayCurrentOperand.textContent += event.target.textContent;

    }
});

document.querySelector("#delete-btn").addEventListener("click", event => {
    displayCurrentOperand.textContent = displayCurrentOperand.textContent.slice(0, -1);
})