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
    let result;

    if (operation === "add") {
        result = add(oper1, oper2);
    
    } else if (operation === "subtract") {
        result = subtract(oper1, oper2);
    
    } else if (operation === "multiply") {
        result = multiply(oper1, oper2);

    } else if (operation === "divide") {
        result = oper2 === 0 ? "ERROR" : divide(oper1, oper2);

    }

    return result % 1 === 0 || typeof result === "string" ? result : result.toFixed(3);
}

document.querySelector("#keys").addEventListener("click", event => {
    if (event.target.dataset.type === "number" && !(event.target.textContent === "." && displayCurrentOperand.textContent.includes("."))) {
        // Remove temporary numbers whenever a new number is entered
        if (displayCurrentOperand.textContent === "0" || displayCurrentOperand.classList.contains("temp")) {
            displayCurrentOperand.textContent = "";
            displayCurrentOperand.classList.remove("temp");
        }
        
        displayCurrentOperand.textContent += event.target.textContent;
        
    } else if (event.target.dataset.type === "operator") {
        // Check if there is a previous operand and don't perform the same operation
        // on a temporary number
        if (Number(displayPrevOperand.textContent) && !displayCurrentOperand.classList.contains("temp")) {
            let result = operate(Number(displayPrevOperand.textContent), Number(displayCurrentOperand.textContent), event.target.dataset.operation);
            displayCurrentOperand.textContent = result;
            displayPrevOperand.textContent = result;
        
        // If no previous operand, make the current one (or a zero in case of temporary zero)  
        } else {
            displayPrevOperand.textContent = displayCurrentOperand.textContent || 0;
            displayCurrentOperand.textContent = displayCurrentOperand.textContent || 0;
        }
        
        displayCurrentOperand.classList.add("temp");
        displayOperator.textContent = event.target.textContent;
        displayOperator.dataset.operation = event.target.dataset.operation;
        
    } else if (event.target.dataset.type === "equal" && displayCurrentOperand.textContent !== "" && displayPrevOperand.textContent !== "" && displayOperator.textContent !== "" && !displayCurrentOperand.classList.contains("temp")) {        
        displayCurrentOperand.textContent = operate(Number(displayPrevOperand.textContent), Number(displayCurrentOperand.textContent), displayOperator.dataset.operation);
        displayCurrentOperand.classList.add("temp");
        displayPrevOperand.textContent = "";
        displayOperator.textContent = "";        
    } 
    
});

document.querySelector("#delete-btn").addEventListener("click", event => {
    displayCurrentOperand.textContent = displayCurrentOperand.textContent.slice(0, -1);
    
    // Add a temporary zero in case everything's deleted
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

document.addEventListener("keydown", event => {
    if (allowedKeys.includes(event.key)) {
        document.querySelectorAll(".key").forEach(key => {
            if (key.textContent === event.key) {
                let clickEvent = new Event('click', { bubbles: true });
                key.dispatchEvent(clickEvent);
            }
        });        
    
    } else if (event.key === "Backspace" || event.key === "Delete") {
        let clickEvent = new Event('click');
        document.querySelector("#delete-btn").dispatchEvent(clickEvent);     
    }
});

document.addEventListener("paste", (event) => { 
    let paste = Number(event.clipboardData.getData("text"));

    if (paste)
        displayCurrentOperand.textContent = paste;
        displayCurrentOperand.classList.remove("temp");
    }
);