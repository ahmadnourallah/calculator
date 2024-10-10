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
    if(displayCurrentOperand.classList.contains("temp")) {
        displayCurrentOperand.textContent = "";
        displayCurrentOperand.classList.toggle("temp");
    }

    if (event.target.dataset.type === "number" && !(event.target.textContent === "." && displayCurrentOperand.textContent.includes("."))) {
        displayCurrentOperand.textContent += event.target.textContent;

    } else if (event.target.dataset.type === "operator") {
        if (Number(displayPrevOperand.textContent)) {
            let result = operate(Number(displayPrevOperand.textContent), Number(displayCurrentOperand.textContent), event.target.dataset.operation);
            displayCurrentOperand.textContent = result;
            displayPrevOperand.textContent = result;
            displayCurrentOperand.classList.toggle("temp");
        
        } else {
            displayPrevOperand.textContent = displayCurrentOperand.textContent;
            displayCurrentOperand.classList.toggle("temp");
        }

        displayOperator.textContent = event.target.textContent;
    }
});

document.querySelector("#delete-btn").addEventListener("click", event => {
    displayCurrentOperand.textContent = displayCurrentOperand.textContent.slice(0, -1);
});

document.querySelector("#clear-btn").addEventListener("click", () => {
    displayOperator.textContent = "";
    displayPrevOperand.textContent = "";
    displayCurrentOperand.textContent = "0";
    displayCurrentOperand.classList.add("temp");
});