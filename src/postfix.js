const EXPONENT = '^';
const OPEN_PARENTHESIS = '(';
const CLOSING_PARENTHESIS = ')';
const operators = ['+','-','*','/',EXPONENT];

const entries = [];
const pad = (str) => ''.padEnd(15 - str.length);
const log = (parsed, stack, postfix) => {
    const stackStr = stack.join('');
    const message = `${parsed}${pad(parsed)}, ${stackStr}${pad(stackStr)}, ${postfix}${pad(postfix)}`;
    entries.push(message);
}

const SHOULD_LOG = true;
const showLogs = () => {
    if(SHOULD_LOG) {
        console.log(`Input${pad('Input')}, Stack${pad('Stack')}, Postfix${pad('Postfix')}`);
        console.log(entries);
    }
}

const isNumberOrLetter = (char) => char.match(/[A-Z0-9]/i);

const getPrecedence = (operator) => {
    switch(operator){
        case '^':
            return 4;
        case '*':
        case '/':
            return 3;
        case '+':
        case '-':
            return 2;
        case '(':
            return 1;
        default:
            return 0;
    }
}

const notParenthesis = (char) => char !== '(' && char !== ')';

const infixToPostfix = (infix) => {
    let parsed = '';
    let postfix = '';
	const operatorStack = [];
	for(let i=0; i < infix.length; i++){
        const char = infix.charAt(i);
        parsed += char;
        if(isNumberOrLetter(char)){
            postfix += char;
            log(parsed, operatorStack, postfix);
		}else if(operators.includes(char)){
            while(
                char != EXPONENT && 
                operatorStack.length > 0 && 
                (getPrecedence(char) <= getPrecedence(operatorStack[operatorStack.length - 1])))
            {
                postfix += operatorStack.pop();
                log(parsed, operatorStack, postfix);
			}
			operatorStack.push(char);
		}else if(char === OPEN_PARENTHESIS) {
            operatorStack.push(char);
            log(parsed, operatorStack, postfix);
        }else if(char === CLOSING_PARENTHESIS) {
            while(
                operatorStack.length > 0 && 
                operatorStack[operatorStack.length - 1] !== OPEN_PARENTHESIS) {
                postfix += operatorStack.pop();
                log(parsed, operatorStack, postfix);
            }
            if(operatorStack[operatorStack.length - 1] === OPEN_PARENTHESIS) {
                operatorStack.pop();
                log(parsed, operatorStack, postfix);
            }
        }
	}
	while(operatorStack.length > 0){
        const operator = operatorStack.pop();
        if(operator !== OPEN_PARENTHESIS) {
            postfix += operator;
        }
        log(parsed, operatorStack, postfix);
    }
    showLogs();
    return postfix;
}

exports.infixToPostfix = infixToPostfix;