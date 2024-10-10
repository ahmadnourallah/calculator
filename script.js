const allowedKeys = "123456789+-/*=.";
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
        if (displayCurrentOperand.textContent === "0" || displayCurrentOperand.classList.contains("temp")) {
            displayCurrentOperand.textContent = "";
            displayCurrentOperand.classList.toggle("temp");
        }
        
        displayCurrentOperand.textContent += event.target.textContent;
        
    } else if (event.target.dataset.type === "operator") {
        if (!displayCurrentOperand.classList.contains("temp")) {
            if (Number(displayPrevOperand.textContent)) {
                let result = operate(Number(displayPrevOperand.textContent), Number(displayCurrentOperand.textContent), event.target.dataset.operation);
                displayCurrentOperand.textContent = result;
                displayPrevOperand.textContent = result;
                displayCurrentOperand.classList.toggle("temp");
            
            } else {
                displayPrevOperand.textContent = displayCurrentOperand.textContent || 0;
                displayCurrentOperand.textContent = displayCurrentOperand.textContent || 0;
                displayCurrentOperand.classList.toggle("temp");
            }
        
        } 

        displayOperator.textContent = event.target.textContent;
        displayOperator.dataset.operation = event.target.dataset.operation;
        
    } else if (event.target.dataset.type === "equal" && Number(displayCurrentOperand.textContent) && Number(displayPrevOperand.textContent) && displayOperator.textContent !== "" && !displayCurrentOperand.classList.contains("temp")) {        
        displayCurrentOperand.textContent = operate(Number(displayPrevOperand.textContent), Number(displayCurrentOperand.textContent), displayOperator.dataset.operation);
        displayCurrentOperand.classList.toggle("temp");
        displayPrevOperand.textContent = "";
        displayOperator.textContent = "";        
    } 
    
});

document.querySelector("#delete-btn").addEventListener("click", event => {
    displayCurrentOperand.textContent = displayCurrentOperand.textContent.slice(0, -1);
    
    if (displayCurrentOperand.textContent === "") {
        displayCurrentOperand.textContent = "0";
        displayCurrentOperand.classList.add("temp");
    }
});

document.querySelector("#clear-btn").addEventListener("click", () => {
    displayOperator.textContent = "";
    delete displayOperator.dataset.operation;
    displayPrevOperand.textContent = "";
    displayCurrentOperand.textContent = "0";
    displayCurrentOperand.classList.add("temp");
});

document.addEventListener("keypress", event => {
    if (allowedKeys.includes(event.key)) {
        document.querySelectorAll(".key").forEach(key => {
            if (key.textContent === event.key) {
                let clickEvent = new Event('click', { bubbles: true });
                key.dispatchEvent(clickEvent);
            }
        });        
    }
});