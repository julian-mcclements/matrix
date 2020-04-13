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

exports.add = (matrix1, matrix2) => {
    if(matrix1.length != matrix2.length || matrix1[0].length != matrix2[0].length) {
        throw('Cannot add matrices because they are different sizes.');
    }
    return reduce(matrix1, matrix2, (x, y) => x + y)
};

exports.subtract = (matrix1, matrix2) => {
    if(matrix1.length != matrix2.length || matrix1[0].length != matrix2[0].length) {
        throw('Cannot subtract matrices because they are different sizes.');
    }
    return reduce(matrix1, matrix2, (x, y) => x - y);
}

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
    if(matrix1[0].length !== matrix2.length) {
        throw('Cannot multiply matrices. Number of columns of left hand matrix does not equal number of rows of right hand matrix.')
    }
    const cols = matrix2[0].length;
    matrix1.forEach((row) => {
        const productRow = []
        for(let i = 0; i < cols; i++){
            const col = getColumn(matrix2, i);
            productRow.push(multiply(row, col));
        }
        product.push(productRow);
    });
    return product;
}

exports.transpose = (matrix) => {
    const result = [];
    const cols = matrix[0].length;
    for(let i = 0; i < cols; i++){
        const col = getColumn(matrix, i);
        result.push(col);
    }
    return result;
}