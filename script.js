const calculator = document.querySelector('.main');
const keys = calculator.querySelector('.body');
const display = document.querySelector('.display');

const calculate = (n1, operator, n2) => {
	//console.log(n1,operator, n2);
	let result = '';
	
	if(operator === 'add'){
		result = parseFloat(n1) + parseFloat(n2);
	}
	if(operator === 'subtract'){
		result = parseFloat(n1) - parseFloat(n2);
	}
	if(operator === 'multiply'){
		result = parseFloat(n1) * parseFloat(n2);
	}
	if(operator === 'divide'){
		result = parseFloat(n1) / parseFloat(n2);
	}
	
	return result;
}


keys.addEventListener('click', event => {
	if(event.target.matches('button')){ //any button pressed
		const key = event.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;

		if (!action) { //when number clicked display content changed
			
			if(
				displayedNum === '0' ||
			    previousKeyType === 'operator' ||
	    		previousKeyType === 'calculate'
  			){
    			display.textContent = keyContent;
  			}else{
    			display.textContent = displayedNum + keyContent;
  			}
  				calculator.dataset.previousKeyType = 'number';
		}

		if (action === 'decimal') {
			if (!displayedNum.includes('.')) {
				display.textContent = displayedNum + '.';
			}else if(
    			previousKeyType === 'operator' ||
    			previousKeyType === 'calculate'
			){
				display.textContent = '0.';
			}
			calculator.dataset.previousKeyType = 'decimal';
		}

		if ( //operations
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'divide'
		) {
			calculator.dataset.firstValue = displayedNum;
			calculator.dataset.operator = action;
			calculator.dataset.previousKeyType = 'operator';
		}
		
		if (action === 'calculate') { //equal button pressed
			let firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNum;

			if (firstValue) {
			  if (previousKeyType === 'calculate') {
			    firstValue = displayedNum;
			    secondValue = calculator.dataset.modValue;
			  }
				display.textContent = calculate(firstValue, operator, secondValue);
			}

			calculator.dataset.modValue = secondValue;
			calculator.dataset.previousKeyType = 'calculate';
		}
		if (action !== 'clear') {
		  const clearButton = calculator.querySelector('[data-action=clear]')
		  clearButton.textContent = 'CE'
		}
		if (action === 'clear') {
			if (key.textContent === 'AC') {
				calculator.dataset.firstValue = '';
				calculator.dataset.modValue = '';
				calculator.dataset.operator = '';
				calculator.dataset.previousKeyType = '';
		}else{
			key.textContent = 'AC';
		}

			display.textContent = 0;
			calculator.dataset.previousKeyType = 'clear';
		}
	}
});