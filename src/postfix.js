const { isNumberOrLetter } = require('./helper');

const OPEN_PARENTHESIS = '(';
const CLOSING_PARENTHESIS = ')';
const operators = ['+','-','*','/','^'];

const entries = [];
const pad = (str) => ''.padEnd(15 - str.length);
const log = (parsed, stack, postfix) => {
    const stackStr = stack.join('');
    const message = `${parsed}${pad(parsed)}, ${stackStr}${pad(stackStr)}, ${postfix}${pad(postfix)}`;
    entries.push(message);
}

const SHOULD_LOG = false;
const showLogs = () => {
    if(SHOULD_LOG) {
        console.log(`Input${pad('Input')}, Stack${pad('Stack')}, Postfix${pad('Postfix')}\n`, entries);
        entries.length = 0;
    }
}

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

const infixToPostfix = (infix) => {
    let parsed = '';
    let postfix = '';
	const stack = [];
	for(let i=0; i < infix.length; i++){
        const char = infix.charAt(i);
        parsed += char;
        if(isNumberOrLetter(char)){
            postfix += char;
            log(parsed, stack, postfix);
        }
        else if(char === OPEN_PARENTHESIS){
            stack.push(char);
            log(parsed, stack, postfix);
        }
        else if(char === CLOSING_PARENTHESIS) {
            while(
                stack.length > 0 && 
                stack[stack.length - 1] !== OPEN_PARENTHESIS) {
                postfix += stack.pop();
                log(parsed, stack, postfix);
            }
            // Pop the opening parenthesis
            stack.pop();
            log(parsed, stack, postfix);
        }
        else if(operators.includes(char)){
            while(
                stack.length > 0 && 
                (getPrecedence(char) <= getPrecedence(stack[stack.length - 1])))
            {
                postfix += stack.pop();
                log(parsed, stack, postfix);
			}
			stack.push(char);
		}
	}
	while(stack.length > 0){
        const operator = stack.pop();
        if(operator !== OPEN_PARENTHESIS) {
            postfix += operator;
        }
        log(parsed, stack, postfix);
    }
    showLogs();
    return postfix;
}

exports.infixToPostfix = infixToPostfix;