const helper = require('./helper');

const registry = {};

exports.init = (key, s) => {
    const matrix = helper.lex(s);
    registry[key] = matrix;
    console.log(`Created matrix ${key}.\n`, helper.stringify(registry[key]));
}

const reduce = (key1, key2, compute) => {
    const matrix1 = registry[key1];
    const matrix2 = registry[key2];
    const result = [];
    for(let i = 0; i < matrix1.length; i++){
        result.push([]);
        for(let j = 0; j < matrix1[i].length; j++){
            result[i].push(compute(matrix1[i][j], matrix2[i][j]));
        }
    }
    return result;
}

const add = (x, y) => x + y;

exports.add = (key1, key2) => {
    const result = reduce(key1, key2, add);
    console.log(`${key1} + ${key2} =\n`, helper.stringify(result));
    return result;
}

const sub = (x, y) => x - y;

exports.sub = (key1, key2) => {
    const result = reduce(key1, key2, sub);
    console.log(`${key1} - ${key2} =\n`, helper.stringify(result));
    return result;
}

exports.scale = (key, scalar) => {
    const matrix = registry[key];
    const result = [];
    for(let i = 0; i < matrix.length; i++){
        result.push([]);
        for(let j = 0; j < matrix[i].length; j++){
            result[i].push(matrix[i][j] * scalar);
        }
    }
    console.log(`${scalar}${key} =\n`, helper.stringify(result));
    return result;
}

const getColumn = (m, i) => {
    const col = [];
    m.forEach(row => col.push(row[i]));
    return col;
}

const multiply = (row, col) => {
    let result = 0;
    for(let i = 0; i < row.length; i++){
        result += row[i] * col[i];
    }
    return result;
};

exports.prod = (key1, key2) => {
    const matrix1 = registry[key1];
    const matrix2 = registry[key2];
    const product = [];
    matrix1.forEach((row) => {
        const productRow = []
        for(let i = 0; i < row.length; i++){
            const col = getColumn(matrix2, i);
            productRow.push(multiply(row, col));
        }
        product.push(productRow);
    });
    console.log(`${key1} * ${key2} =\n`, helper.stringify(product));
    return product;
}