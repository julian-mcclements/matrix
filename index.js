const matrix = require('./src/matrix');

const _A = `
2   9
4   1 
`;

const _B = `
3   8
5   7 
`;

const _PQR = `
2   2   0
0   3   0
`;

const _D = `
1   2   5
4   6   9
`;

const _E = `
2   5   6
1   7   2
9   6   1
`;

matrix.init('A', _A);
matrix.init('B', _B);
matrix.init('PQR', _PQR);
matrix.init('D', _D);
matrix.init('E', _E);
let _ = matrix.add('A', 'B');
_ = matrix.sub('A', 'B');
_ = matrix.scale('PQR', 2);
_ = matrix.prod('D', 'E');