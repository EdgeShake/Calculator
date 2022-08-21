const digits={
    X:10,
    IX:9,
    V:5,
    IV:4,
    I:1
};

function rome2arab (string) {
    return string.toUpperCase().split('').reduce(function (s,v, i, arr) {
        const [a, b, c] = [
            digits[arr(i)],
            digits[arr(i+1)],
            digits[arr(i+2)],
        ];
        return b>a ? s-a : s+a;
    },0)
}
function arab2rome(num) {
    if (num<1) return'';
    let result ='';
    for (key in digits)
        while (num>=digits[key]){
        result +=key;
        num -=digits[key];
        }
    return result;
}
function calculator(string) {
    let letter=[];
    string= string.replace(/[^IVXLCDHZ\d+\-*\/]/gi, ch=> {
        if (ch !== ' ') letter.push(ch);
        return '';
    });
    if(letter.length>0)
        throw Error('введите верные символы' + letter);
    let vars = string.split(/[+\-*\/]/g)
    if (vars.length !== 2)
        throw Error ('введите два числа');
    const isRome = /[^IVXLCDHZ]+$/i;

    const r = vars.reduce((s,v) => s +isRome.test(v), 0);
    if (r == 1)
        throw Error ('обе цифры должны быть либо арабскими, либо римскими');
    else if (r == 2)
        vars = vars.map(v=> rome2arab(v));
    if(vars.some(v=> v<1 || v>10))
        throw Error ('введите числа от 1 до 10');
    let per =string.match(/[+\-*\/]/)[0]
    let result = Math.floor(eval(vars.join(per)))
    //console.log(result)
    return r===0 ? result.toString() : arab2rome(result);
}