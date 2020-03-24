const { infixToPostfix } = require('./postfix');

test('Can convert infix expression to postfix expression', () => {
    const testCases = [
        { infix: '2+3*4', expectedResult: '234*+' },
        { infix: '2*3-4^2', expectedResult: '23*42^-' },
        { infix: '3+4*5/6', expectedResult: '345*6/+' },
        { infix: '4+8*6-5/3-2*2+2', expectedResult: '486*+53/-22*-2+' },
        { infix: 'A+B-C', expectedResult: 'AB+C-' },
        { infix: 'A+B*C', expectedResult: 'ABC*+' },
        { infix: 'A*(B+C)', expectedResult: 'ABC+*' },
        { infix: '2*A+C*D', expectedResult: '2A*CD*+' },
        { infix: 'A+B*(C-D)', expectedResult: 'ABCD-*+' }
    ];

    testCases.forEach((testCase) => {
        const result = infixToPostfix(testCase.infix);
        console.log(`Infix expression == ${testCase.infix}; Postfix expression == ${testCase.expectedResult}`);
        expect(result).toBe(testCase.expectedResult);
    });
});
