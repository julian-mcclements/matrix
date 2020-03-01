const calculator = require('./calculator');

calculator.init('A',`
    2   9
    4   1`);
calculator.init('B',`
    3   8
    5   7`);

test('Can register and initialise a new matrix', () => {
    // Arrange
    const Z = `
    47  38
    79  61`;
   
    // Act
    const result = calculator.init('Z', Z);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(47);
    expect(result[0][1]).toBe(38);
    expect(result[1][0]).toBe(79);
    expect(result[1][1]).toBe(61);
});

test('Can get a previously initialised matrix', () => {
    // Act
    const result = calculator.get('A');

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(2);
    expect(result[0][1]).toBe(9);
    expect(result[1][0]).toBe(4);
    expect(result[1][1]).toBe(1);
});

test('Can multiply a matrix by a scalar', () => {
    const result = calculator.do('2A');
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(4);
    expect(result[0][1]).toBe(18);
    expect(result[1][0]).toBe(8);
    expect(result[1][1]).toBe(2);
});

test('Can multiply two matrices', () => {
    const result = calculator.do('AB');
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(51);
    expect(result[0][1]).toBe(79);
    expect(result[1][0]).toBe(17);
    expect(result[1][1]).toBe(39);
});

test('Can scale a matrix and then multiply it by another matrix', () => {
    const result = calculator.do('2AB');
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(102);
    expect(result[0][1]).toBe(158);
    expect(result[1][0]).toBe(34);
    expect(result[1][1]).toBe(78);
});

test('Can add two matrices', () => {
    const result = calculator.do('A + B');
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(5);
    expect(result[0][1]).toBe(17);
    expect(result[1][0]).toBe(9);
    expect(result[1][1]).toBe(8);
});

test('Can subtract two matrices', () => {
    const result = calculator.do('A - B');
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(-1);
    expect(result[0][1]).toBe(1);
    expect(result[1][0]).toBe(-1);
    expect(result[1][1]).toBe(-6);
});

test('Can add two scaled matrix products', () => {
    const result = calculator.do('2AB + 2AB');
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[0][0]).toBe(204);
    expect(result[0][1]).toBe(316);
    expect(result[1][0]).toBe(68);
    expect(result[1][1]).toBe(156);
});