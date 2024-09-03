function superDigit(n, k) {
    const digitSum = n.split('').reduce((acc, digit) => acc + parseInt(digit), 0) * k;
    let procedimiento = `- (${n}) * ${k} = ${digitSum}\n`;
    function recursiveSuperDigit(num) {
        if (num < 10) {
            procedimiento += `- (${num}) = ${num}\n`;
            return num;
        }
        const sum = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        procedimiento += `- (${num}) = ${num.toString().split('').join(' + ')} = ${sum}\n`;
        return recursiveSuperDigit(sum);
    }
    const result = recursiveSuperDigit(digitSum);
    return { result, procedimiento };
}
document.getElementById('calcular').addEventListener('click', function() {
    const n = document.getElementById('numero1').value;
    const k = parseInt(document.getElementById('cantidad').value);
    
    if (n && k) {
        const { result, procedimiento } = superDigit(n, k);
        document.getElementById('resultado').innerText = result;
        document.getElementById('procedimiento').innerText = procedimiento;
    } else {
        document.getElementById('resultado').innerText = "Por favor, ingresa valores válidos";
        document.getElementById('procedimiento').innerText = "";
    }
});

//creado por Miguel Guerrero C.C 1090381839