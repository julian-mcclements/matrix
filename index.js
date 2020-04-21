const { stringify } = require('./src/helper');
const { transpose } = require('./src/matrix');
const calculator = require('./src/calculator');

const A = [
    [-1, 4, 8],
    [-9, 1, 2]
];

const B = [
    [5, 8],
    [0, -6],
    [5, 6]
];

const C = [
    [-4, 1],
    [6, 5]
];

const D = [
    [-6, 3, 1],
    [8, 9, -2],
    [6, -1, 5]
];

calculator.init('A', A);
calculator.init('B', B);
calculator.init('C', C);
calculator.init('D', D);

calculator.transpose('A', 'E');
calculator.transpose('B', 'F');
calculator.transpose('C', 'G');
calculator.transpose('D', 'H');

calculator.initAsNegative('I', D);
const transposeOfD = calculator.get('H');
calculator.initAsNegative('J', transposeOfD);

console.group('2.');

console.log('(a)\n', stringify(transpose(calculator.do('A * B')))); 
console.log('(b)\n', stringify(transpose(calculator.do('B * C')))); 
console.log('(c)\n', stringify(calculator.do('C - G'))); 
console.log('(d)\n', stringify(calculator.do('D - H'))); 
console.log('(e)\n', stringify(transpose(calculator.get('H'))));
console.log('(f)\n', stringify(transpose(calculator.do('2 * C'))));
console.log('(g)\n', stringify(calculator.do('E + B')));
console.log('(h)\n', stringify(calculator.do('A + F')));
console.log('(i)\n', stringify(transpose(calculator.do('E + B'))));
console.log('(j)\n', stringify(transpose(calculator.do('2 * E - 5 * B'))));
console.log('(k)\n', stringify(transpose(calculator.get('I'))));
console.log('(l)\n', stringify(calculator.get('J')));
console.log('(m)\n', stringify(transpose(calculator.do('C^2'))));
console.log('(n)\n', stringify(calculator.do('G^2')));

console.groupEnd();
