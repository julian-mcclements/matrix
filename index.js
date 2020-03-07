const matrix = require('./src/matrix');
const calculator = require('./src/calculator');

const A = `
1   2
3   -1
`;

const B = `
6   -1
5   3
`;

const C = `
-1
1
`;

calculator.init('A', A);
calculator.init('B', B);
calculator.init('C', C);

console.group('1.');

// console.log('(a)'); 
// calculator.do('A + B');
// console.log('(b)'); 
// calculator.do('B + A');
// console.log('(c)'); 
// calculator.do('B + B'); 
// console.log('(d)'); 
// calculator.do('3B');  
// console.log('(e)'); 
// calculator.do('3A + 2B'); 
// console.log('(f)'); 
// calculator.do('A + C');  
// console.log('(g)'); 
// calculator.do('B + C'); 
// console.log('(h)'); 
// calculator.do('AC');  
// console.log('(i)'); 
// calculator.do('BC'); 
// console.log('(j)'); 
// calculator.do('5A − 7BC'); 
console.log('(k)'); 
calculator.do('3AC − 2BC'); 

console.groupEnd();
