const helper = require('./helper');
const matrix = require('./matrix');

test('Can add two matrices', () => {
    // Arrange
    const A = helper.lex(`
    2   9
    4   1`);
    const B = helper.lex( `
    3   8
    5   7`);
    
    // Act
    const result = matrix.add(A, B);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(5);
    expect(result[0][1]).toBe(17);
    expect(result[1][0]).toBe(9);
    expect(result[1][1]).toBe(8);
});

test('Raise error when trying to add matrices of different sizes', ()=>{
    // Arrange
    const A = helper.lex(`
        2   9
        4   1`);
    const C = helper.lex(`
        -1
        1`);
    expect(() => matrix.add(A, C)).toThrow('Cannot add matrices because they are different sizes.');
});

test('Can subtract two matrices', () => {
    // Arrange
    const A = helper.lex(`
    2   9
    4   1`);
    const B = helper.lex( `
    3   8
    5   7`);
    
    // Act
    const result = matrix.subtract(A, B);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(-1);
    expect(result[0][1]).toBe(1);
    expect(result[1][0]).toBe(-1);
    expect(result[1][1]).toBe(-6);
});

test('Raise error when trying to subtract matrices of different sizes', ()=>{
    const A = helper.lex(`
        2   9
        4   1`);
    const C = helper.lex(`
        -1
        1`);
    expect(() => matrix.subtract(A, C)).toThrow('Cannot subtract matrices because they are different sizes.');
});

test('Can multiply a matrix by a scalar', () => {
    // Arrange
    const A = helper.lex(`
    2   2   0
    0   3   0`);

    // Act
    const result = matrix.scale(A, 2);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(3);
    expect(result[1].length).toBe(3);
    expect(result[0][0]).toBe(4);
    expect(result[0][1]).toBe(4);
    expect(result[0][2]).toBe(0);
    expect(result[1][0]).toBe(0);
    expect(result[1][1]).toBe(6);
    expect(result[1][2]).toBe(0);
});

test('Can multiply two matrices #1', ()=> {
    // Arrange
    const A = helper.lex(`
    1   2   5
    4   6   9`);   
    const B = helper.lex(`
    2   5   6
    1   7   2
    9   6   1`);

    // Act
    const result = matrix.product(A, B);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(3);
    expect(result[1].length).toBe(3);
    expect(result[0][0]).toBe(49);
    expect(result[0][1]).toBe(49);
    expect(result[0][2]).toBe(15);
    expect(result[1][0]).toBe(95);
    expect(result[1][1]).toBe(116);
    expect(result[1][2]).toBe(45);
});

test('Can multiply two matrices #2', ()=> {
    // Arrange
    const A = helper.lex(`
    1   2
    3   -1`);   
    const B = helper.lex(`
    -1
    1`);

    // Act
    const result = matrix.product(A, B);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(1);
    expect(result[1].length).toBe(1);
    expect(result[0][0]).toBe(1);
    expect(result[1][0]).toBe(-4);
});

test('Raise error when trying multiply matrices of different sizes', ()=> {
    const A = helper.lex(`
        2   9   5
        4   1   3`);
    const C = helper.lex(`
        -1
        1`);
    expect(() => matrix.product(A, C)).toThrow('Cannot multiply matrices. Number of columns of left hand matrix does not equal number of rows of right hand matrix.');

});