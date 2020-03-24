const EXPONENT = '^';
const operators = ['+','-','*','/',EXPONENT]

const isNumberOrLetter = (char) => char.match(/[A-Z0-9]/i);

const getPrecedence = (operator) => {
    switch(operator){
        case '^':
            return 3;
        case '*':
        case '/':
            return 2;
        case '+':
        case '-':
            return 1;
        default:
            return 0;
    }
}

const infixToPostfix = (infix) => {
    let postfix = '';
	const operatorStack = [];
	for(let i=0; i < infix.length; i++){
        var char = infix.charAt(i);
		if(isNumberOrLetter(char)){
			postfix += char;
		}else if(operators.includes(char)){
            while(
                char != EXPONENT && 
                operatorStack.length > 0 && 
                (getPrecedence(char) <= getPrecedence(operatorStack[operatorStack.length - 1]))){
                postfix += operatorStack.pop();
			}
			operatorStack.push(char);
		}
	}
	while(operatorStack.length > 0){
		postfix += operatorStack.pop();
	}
    return postfix;
}

exports.infixToPostfix = infixToPostfix;