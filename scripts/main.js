const add = (first, last) => first + last;
const subtract = (first, last) => first - last;
const divide = (first, last) => first / last;
const multiply = (first, last) => first * last;

const operate = (first, last, operator) => {
    first = +first;
    last = +last;
    if (Number.isNaN(first) || Number.isNaN(last)) return "OOPS";
    switch (operator) {
        case '+':
            return add(first, last);
            break;
        case '-':
            return subtract(first, last);
            break;
        case '÷':
            return divide(first, last);
            break;
        case '*':
            return multiply(first, last);
            break;
        default:
            return "OOPS";
            break;
    }
};


const buttons = Array.from(document.querySelectorAll('.calculator-button'));
const backspace = Array.from(document.querySelectorAll('#backspace'));
const fullclear = Array.from(document.querySelectorAll('#fullclear'));
const equals = Array.from(document.querySelectorAll('#equals'));
const decimal = Array.from(document.querySelectorAll('#decimal'));
const minusPlus = Array.from(document.querySelectorAll('#minus-plus'));
const digits = Array.from(buttons.filter(x => !equals.includes(x) && !decimal.includes(x) && !minusPlus.includes(x) && !backspace.includes(x) && !fullclear.includes(x)));

const holder = document.querySelector('#holder');
const resault = document.querySelector('#resault');

function OnDigitClick(e) {
    const ops = ['-', '+', '*', '÷'];
    if (ops.includes(e.target.innerText)) {
        if (!ops.includes(resault.value[resault.value.length - 1])) {
            resault.value += e.target.innerText;
        }
    }
    else {
        resault.value += e.target.innerText;
    }
}

function Equals(e) {
    const text = resault.value;
    let array = ['0', '+'].concat(text.split('+').join(',+,').split('-').join(',-,').split('*').join(',*,').split('÷').join(',÷,').split(','));
    while (array.includes('')) {
        array[array.indexOf('')] = '0';
        console.log(array);
    }
    while (array.includes('*')) {
        let first = array[array.indexOf('*') - 1];
        let last = array[array.indexOf('*') + 1];
        array.splice(array.indexOf("*") - 1, 3, operate(first, last, '*'));
    }
    while (array.includes('÷')) {
        let first = array[array.indexOf('÷') - 1];
        let last = array[array.indexOf('÷') + 1];
        array.splice(array.indexOf("÷") - 1, 3, operate(first, last, '÷'));
    }

    var a = array
        .reduce((resault, now) => {
            if (!resault.operator) {
                if (!resault.first && resault.first !== 0) {
                    return { first: now };
                }
                else {
                    return { first: resault.first, operator: now };
                }
            }
            else {
                if (!resault.final)
                    return { first: +operate(resault.first, now, resault.operator), final: +operate(resault.first, now, resault.operator) };
                else
                    return { first: +operate(resault.first, now, resault.operator), final: resault.final + +operate(resault.first, now, resault.operator) };
            }
        }, { final: 0 })
        .final;

    holder.value = resault.value;
    resault.value = a;
}

function InsertDecimal(e) {
    const text = resault.value;
    const a = text.split('+').join(',+,').split('-').join(',-,').split('*').join(',*,').split('÷').join(',÷,').split(',');
    let last = a[a.length - 1];
    if (last.includes('.')) return; //user have once used decimal dot
    resault.value += e.target.innerText;
}

function RemoveDigit(e) {
    resault.value = resault.value.split('').splice(0, resault.value.length - 1).join('');
}

function Clear(e) {
    resault.value = '';
    holder.value = '';
}

function MinusPlus(e) {
    const text = resault.value;
    let a = text.split('+').join(',+,').split('-').join(',-,').split('*').join(',*,').split('÷').join(',÷,').split(',');
    if (a.length !== 1) {
        if (a[1] === '-' && a.length === 3) { }
        else
            return;
    }
    if (a[1] !== '-') {
        const aaaa = resault.value.split('');
        aaaa.unshift("-")
        resault.value = aaaa.join('');
    }
    else {
        const aaaa = resault.value.split('');
        resault.value = aaaa.splice(1).join('');
    }

}

digits.forEach(element => {
    element.addEventListener('click', OnDigitClick);
});
equals[0].addEventListener('click', Equals)
decimal[0].addEventListener('click', InsertDecimal);
backspace[0].addEventListener('click', RemoveDigit)
fullclear[0].addEventListener('click', Clear);
minusPlus[0].addEventListener('click', MinusPlus);