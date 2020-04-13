const { infixToPostfix } = require('./postfix');
const helper = require('./helper');
const matrix = require('./matrix');

const registry = {};

const copy = (source) => {
    const destination = [];
    for(let i = 0; i < source.length; i++){
        destination.push([...source[i]]);
    }
    return destination;
}
exports.init = (key, s) => {
    registry[key] = helper.lex(s);
    return copy(registry[key]);
}

const get = (key) => copy(registry[key]);
exports.get = get;

const PERMITTED_KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const isKey = char => PERMITTED_KEYS.indexOf(char) >= 0;

const raiseToPower = (op1, op2) => {
    let acc = copy(op1);
    for(let i = 1; i < op2; i++){
        acc = matrix.product(acc, op1);
    }
    return acc;
}

const parseOperand = (char) => {
    let value;
    if(isKey(char)) {
        value = get(char);
    }
    else {
        value = Number.parseInt(char);
    }
    return value;
}

exports.do = (infix, showlog) => {
    const postfix = infixToPostfix(infix.replace(/ /g,''));
    const stack = [];
    const entries = [];
    showlog = showlog || false;
    entries.push(`${infix} converted to ${postfix}.`);
    for(let i=0; i < postfix.length; i++){
        const char = postfix.charAt(i);
        entries.push(`Next term is ${char}.`);
        if(helper.isNumberOrLetter(char)){
            const newOp = parseOperand(char);
            const newOpMessage = Array.isArray(newOp) ?
                `Get matrix for ${char}.` : `Parsed scalar ${char}`;
            stack.push(newOp);
            entries.push(newOpMessage);
            continue;
        }
        const op2 = stack.pop();
        const op1 = stack.pop();
        let result;
        if (char == '+') {
            entries.push('Add operands');
            result = matrix.add(op1, op2);
        }
        else if(char == '-') {
            entries.push('Subtract operands');
            result = matrix.subtract(op1, op2);
        }
        else if(char == '*') { 
            const isScalar = !isNaN(op1);
            entries.push(isScalar ? 
                `Multiply matrix op2 by scalar ${op1}` : 'Get matrix product of op1 times op2');
            result = isScalar ? matrix.scale(op2, op1) : matrix.product(op1, op2);
        }
        else {
            // Assume operation to do is exponentiation.
            entries.push('Raise matrix to a positive power');
            result = raiseToPower(op1, op2);
        }
        entries.push('Push result of operation to stack.\n', helper.stringify(result));
        stack.push(result);
    }
    const finalResult = stack.pop();
    if (showlog) {
        console.log(`Computation of ${infix}\n`, entries);
        console.log(`Final result of ${infix}\n`, helper.stringify(finalResult));
    }
    return finalResult;
};

exports.transpose = (src, key) => {
    registry[key] = matrix.transpose(copy(registry[src]));
    return copy(registry[key]);
};
