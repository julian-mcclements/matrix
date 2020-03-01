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

const computeSubExpression = (sub) => {
    console.log(`Compute subexpression'${sub}'.`);
    const terms = sub.split('');
    let value, acc;
    acc = 1;
    terms.forEach(term => {
        if(isKey(term)) {
            value = get(term)
            console.log(`Get matrix for '${term}'.\n`, helper.stringify(value));
        }
        else {
            value = Number.parseInt(term);
            console.log(`Read scalar, '${term}'.`);
        }
        if(isScalar(acc)) {
            if (isScalar(value)) {
                acc = value;
                console.log(`$Store scalar ${value}.`);
            }
            else {
                const prev = acc;
                acc = matrix.scale(value, acc);
                console.log(`${prev}${term} =\n`, helper.stringify(acc));
            }
        }
        else {
            acc = matrix.product(acc, value);
            console.log(`Product of accumulator and ${term} =\n`, helper.stringify(acc));
        }
    });
    console.log(`Computed result for '${sub}' = \n`, helper.stringify(acc));
    return acc;
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
    const overallResult = compute(result1, result2);
    console.log(`Computed result for '${expression}' = \n`, helper.stringify(overallResult));
    return overallResult;
};

exports.do = (expression) => {
    if(expression.indexOf('+') >= 0) {
        return computeCompositeExpression(expression, '+');
    }
    else if(expression.indexOf('-') >= 0) {
        return computeCompositeExpression(expression, '-');
    }
    return computeSubExpression(expression);
};
