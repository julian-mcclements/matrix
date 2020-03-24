const EXPONENT = '^';
const OPEN_PARENTHESIS = '(';
const CLOSING_PARENTHESIS = ')';
const operators = ['+','-','*','/',EXPONENT]

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

// const appendOperator = (expression, stack) => {
//     const operator = stack.pop();
//     result = notParenthesis(operator) ? 
//         expression + operator : expression;
//     console.log(`Postfix written so far === ${result}`);
//     return result;
// }

const infixToPostfix = (infix) => {
    let parsed = '';
    let postfix = '';
	const operatorStack = [];
	for(let i=0; i < infix.length; i++){
        const char = infix.charAt(i);
        parsed += char;
        if(isNumberOrLetter(char)){
            postfix += char;
            console.log(`Infix === ${parsed}, Stack === ${operatorStack.join('')}, Postfix === ${postfix}`);
		}else if(operators.includes(char)){
            while(
                char != EXPONENT && 
                operatorStack.length > 0 && 
                (getPrecedence(char) <= getPrecedence(operatorStack[operatorStack.length - 1])))
            {
                const operator = operatorStack.pop();
                if(notParenthesis(operator)){
                    postfix += operator;
                }
                console.log(`Infix === ${parsed}, Stack === ${operatorStack.join('')}, Postfix === ${postfix}`);
			}
			operatorStack.push(char);
		}else if(char === OPEN_PARENTHESIS) {
            operatorStack.push(char);
            console.log(`Infix === ${parsed}, Stack === ${operatorStack.join('')}, Postfix === ${postfix}`);
        }else if(char === CLOSING_PARENTHESIS) {
            while(
                operatorStack.length > 0 && 
                operatorStack[operatorStack.length - 1] !== OPEN_PARENTHESIS) {
                postfix += operatorStack.pop();
                console.log(`Infix === ${parsed}, Stack === ${operatorStack.join('')}, Postfix === ${postfix}`);
            }
            if(operatorStack[operatorStack.length - 1] === OPEN_PARENTHESIS) {
                operatorStack.pop();
                console.log(`Infix === ${parsed}, Stack === ${operatorStack.join('')}, Postfix === ${postfix}`);
            }
        }
	}
	while(operatorStack.length > 0){
        const operator = operatorStack.pop();
        if(notParenthesis(operator)){
            postfix += operator;
        }
        console.log(`Infix === ${parsed}, Stack === ${operatorStack.join('')}, Postfix === ${postfix}`);
	}
    return postfix;
}

exports.infixToPostfix = infixToPostfix;