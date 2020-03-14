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
    console.log(`Created matrix ${key}.\n`, helper.stringify(registry[key]));
    return copy(registry[key]);
}

const get = (key) => copy(registry[key]);

exports.get = get;

const PERMITTED_KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const isKey = char => PERMITTED_KEYS.indexOf(char) >= 0;

const isScalar= x => !isNaN(x);

const raiseToPower = (expr) => {
    const operatorIndex = expr.indexOf('^');
    const key = expr.substring(0, operatorIndex);
    const exponent = Number.parseInt(expr.substring(operatorIndex + 1));
    const base = get(key);
    let acc = copy(base);
    for(let i = 1; i < exponent; i++){
        acc = matrix.product(acc, base);
    }
    console.log(`${key} raised to power of ${exponent} =\n`, helper.stringify(acc));
    return acc;
}

const computeSubExpression = (sub) => {
    try {
        // console.log(`Compute subexpression'${sub}'.`);
        const terms = sub.split('');
        let value, acc;
        acc = 1;
        terms.forEach(term => {
            if(isKey(term)) {
                value = get(term)
                // console.log(`Get matrix for '${term}'.\n`, helper.stringify(value));
            }
            else {
                value = Number.parseInt(term);
                // console.log(`Read scalar, '${term}'.`);
            }
            if(isScalar(acc)) {
                if (isScalar(value)) {
                    acc = value;
                    // console.log(`$Store scalar ${value}.`);
                }
                else {
                    const prev = acc;
                    acc = matrix.scale(value, acc);
                    // console.log(`${prev}${term} =\n`, helper.stringify(acc));
                }
            }
            else {
                acc = matrix.product(acc, value);
                // console.log(`Product of accumulator and ${term} =\n`, helper.stringify(acc));
            }
        });
        console.log(`Computed result for '${sub}' = \n`, helper.stringify(acc));
        return acc;
    }
    catch(err) {
        console.log(err);
    }
};

const computeCompositeExpression = (expression, operator) => {
    noWhiteSpace = expression.replace(/ /g,'');
    const compute = operator === "+" ? 
        (m1, m2) => matrix.add(m1, m2) : (m1, m2) => matrix.subtract(m1, m2);
    const operatorIndex = noWhiteSpace.indexOf(operator);
    const subExpression1 = noWhiteSpace.substring(0, operatorIndex);
    const subExpression2 = noWhiteSpace.substring(operatorIndex + 1);
    const result1 = computeSubExpression(subExpression1);
    const result2 = computeSubExpression(subExpression2);
    try {
        const overallResult = compute(result1, result2);
        console.log(`Computed result for '${expression}' = \n`, helper.stringify(overallResult));
        return overallResult;
    }
    catch(err){
        console.log(err);
    }
};

exports.do = (expression) => {
    if(expression.indexOf('+') >= 0) {
        return computeCompositeExpression(expression, '+');
    }
    else if(expression.indexOf('-') >= 0) {
        return computeCompositeExpression(expression, '-');
    }
    else if(expression.indexOf('^') >= 0) {
        return raiseToPower(expression);
    }
    return computeSubExpression(expression);
};
