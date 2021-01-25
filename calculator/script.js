class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        if (this.currentOperand === ''){
            if (this.previousOperand === '') return
            this.currentOperand = this.previousOperand.slice(0,this.previousOperand.length-1)
            this.previousOperand = ''
            this.operation = undefined
            return
        }
        this.currentOperand = this.currentOperand.slice(0,this.currentOperand.length-1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand === ''){
            this.previousOperand = this.currentOperand
            this.operation = operation
            this.currentOperand = ''
        }
        else {
            this.previousOperand = this.compute(1)
            this.operation = operation
            this.currentOperand = ''
        }
    }

    compute(option){
        if (this.previousOperand === '' || this.currentOperand === '') return
        const o1 = parseFloat(this.previousOperand)
        const o2 = parseFloat(this.currentOperand)
        const c = this.operation
        if(option === 0){
            switch(c){
                case '+' : this.currentOperand = (o1+o2).toString(); this.previousOperand = ''; break;
                case '-' : this.currentOperand = (o1-o2).toString(); this.previousOperand = ''; break;
                case '*' : this.currentOperand = (o1*o2).toString(); this.previousOperand = ''; break;
                case '÷' : this.currentOperand = (o1/o2).toString(); this.previousOperand = ''; break;
                case '^' : this.currentOperand = Math.pow(o1,o2).toString();this.previousOperand = ''; break;
            }
            this.operation = undefined
        }
        else if(option === 1){
            switch(c){
                case '+' : return (o1+o2).toString();
                case '-' : return (o1-o2).toString();
                case '*' : return (o1*o2).toString();
                case '÷' : return (o1/o2).toString();
                case '^' : return Math.pow(o1,o2).toString();
            }
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerHTML = this.currentOperand
        this.previousOperandTextElement.innerHTML = this.previousOperand
        if (this.operation === undefined) return
        this.previousOperandTextElement.innerHTML += this.operation
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click',() => {
    calculator.clear()
    calculator.updateDisplay()
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute(0)
    calculator.updateDisplay()
})