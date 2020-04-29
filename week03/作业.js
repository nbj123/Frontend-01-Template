function converStringToNumber(string, x) {
    if (arguments.length < 2) x = 10;
    var chars = string.split("");
    var sign = (chars[0] == '-')?-1:1;
    if(sign == -1) chars = chars.slice(1);
    var number = 0;
    var i = 0;
    if (x <= 10) {
        while (i < chars.length && chars[i] != '.') {
            number = number * x;
            number += chars[i].codePointAt(0) - '0'.codePointAt(0)
            i++;
        }
        if (chars[i] == '.') i++
        var fraction = 1;
        while (i < chars.length) {
            fraction = fraction / x;
            number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
            i++;
        }
    } else if (x <= 16) {

    }
    return number * sign
}
converStringToNumber('-100.0123')

function converNumberToString(number, x = 10) {
    var sign = (number / Math.abs(number))==-1?'-':'';
    var integer = Math.floor(Math.abs(number)); //整数部分
    var fractions = false;  //是否有小数
   
    let fraction = String(number).match(/\.\d+$/);
    if (fraction) {
        fractions = true;
        fraction = Number(fraction[0].replace('.', ''));
    }
    var string = '',
        string1 = '';
    while (integer > 0) {
        string = String(integer % x) + string;
        integer = Math.floor(integer / x);
    }
    while (fractions && fraction > 0) {
        string1 = String(fraction % x) + string1;
        fraction = Math.floor(fraction / x);
    }
    return fractions?`${sign}${string}.${string1}`:(sign+string)
}
converNumberToString(124.12)
converNumberToString(-124.1e+2)