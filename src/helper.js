const digits = /(-{0,1}\d+)/mg;

const stringifyRow = row => {
    let s = "";
    for(let i = 0; i < row.length; i++){
        s += `\t${row[i]}`;
    }
    return s;
};

exports.stringify = matrix => {
    let s = [];
    for(let i = 0; i < matrix.length; i++){
        s.push(stringifyRow(matrix[i]));
    }
    return s.join("\n");
}

const toIntegers = (line) => {
    return line.match(digits).map(d => parseInt(d));
}

exports.lex = (s) => {
    const lines = s.split('\n');
    const matrix = [];
    lines.forEach(line => {
        if(line === "") 
            return;
        matrix.push(toIntegers(line));
    });
    return matrix;
};