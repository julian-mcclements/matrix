const helper = require('./helper');

const reduce = (matrix1, matrix2, compute) => {
    const result = [];
    for(let i = 0; i < matrix1.length; i++){
        result.push([]);
        for(let j = 0; j < matrix1[i].length; j++){
            result[i].push(compute(matrix1[i][j], matrix2[i][j]));
        }
    }
    return result;
}

exports.add = (matrix1, matrix2) => reduce(matrix1, matrix2, (x, y) => x + y);

exports.subtract = (matrix1, matrix2) => reduce(matrix1, matrix2, (x, y) => x - y);

exports.scale = (matrix, scalar) => {
    const result = [];
    for(let i = 0; i < matrix.length; i++){
        result.push([]);
        for(let j = 0; j < matrix[i].length; j++){
            result[i].push(matrix[i][j] * scalar);
        }
    }
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

exports.product = (matrix1, matrix2) => {
    const product = [];
    matrix1.forEach((row) => {
        const productRow = []
        for(let i = 0; i < row.length; i++){
            const col = getColumn(matrix2, i);
            productRow.push(multiply(row, col));
        }
        product.push(productRow);
    });
    return product;
}