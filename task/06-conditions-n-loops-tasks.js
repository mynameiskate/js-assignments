'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Пожалуйста, прочтите информацию по ссылкам перед выполнением заданий:                                 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Возврщает 'Fizz','Buzz' или начальное число согласно следеющим правилам:
 * 1) если не подпадает под следйющте правила вернуть начальное число
 * 2) число делится нацело на 3 вернуть 'Fizz'
 * 3) число кратно 5 вернуть 'Buzz'
 * 4) если число кратно 3 и 5 одновременно вернуть 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
    if (num % 15) {
        if (num % 5) {
            if (num % 3) {
                return num;
            }
            else return 'Fizz';
        }
        else return 'Buzz';
    }
    else return 'FizzBuzz';
}


/**
 * Возвращает факториал переданного целого числа n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
    if (n < 1) {
        return 1;
    }
    else return n * getFactorial(n - 1);
}


/**
 * Возвращается сумму целых чисел в промежутке между переданными числами, включая их
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
    n1 = Math.ceil(n1);
    n2 = Math.floor(n2);
    let sum = 0;
    while (n1 <= n2) {
        sum += n1++;       
    }
    return sum;
}


/**
 * Возвращает true, если с помощью трех переданных длин сторон a,b,c можно
 * посроить треугольник, если нет - false
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
    return ( (a + b > c) && (a + c > b) && (b + c > a) );
}


/**
 * Возвращает true, если 2 определенных прямоуголника перекрываются, если нет false.
 * Каждый прямоуголник представлен обьектом
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Пожлауйтса используйте принцип задания координат для canvas (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * этот способ отличается от декартовой системы координат.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) { 
    return ((rect1['top'] + rect1['height'] > rect2['top']) && 
        (rect1['left'] + rect1['width'] > rect2['left']) &&
        (rect1['top'] < rect2['top'] + rect2['height']) &&
        (rect1['left'] < rect2['left'] + rect2['width']) );
}


/**
 * Возвращает true если точка лежим в пределах круга, если нет то false
 * Круг представляет собой объект:
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Точка представляет собой объект:
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {

    function calcDistance(x1, y1, x2, y2) {
        return Math.sqrt( (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    return (calcDistance(circle['center']['x'], circle['center']['y'], point['x'], point['y']) < circle['radius']);
}


/**
 * Возврщает первый неповторяющийся символ в строке, если его нет то возвращает null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
    let watched = "";
    for (let i = 0; i < str.length; i++) {
        if (watched.indexOf(str[i]) < 0) {
            let j = i + 1;
            while (str[i] !== str[j] && j < str.length) {
                j++;
            }
            if (j == str.length) {
                return str[i];
            }
            watched += str[i];
        }
    }
    return null; 
}


/**
 * Возвращает интервальную строку по 2 определенным числам и (включить / исключить) критериям.
 * Подробное описание задачи: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Обратите внимание на то, что меньшее число должно идти первым в описании
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * меньшее число должно быть впереди :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    if (a > b) {
        let temp = a;
        a = b;
        b = temp
    }

    let startBrackets = {false : '(', true : '['};
    let endBrackets = { false : ')', true : ']'};
    return startBrackets[isStartIncluded] + a + ', ' + b + endBrackets[isEndIncluded];
}


/**
 * Переворачивает переданную строку (ставит все символы строки в обратном порядке)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
    let reverseStr = "";
    let j = str.length - 1;
    while (j > -1) {
        reverseStr += str[j--];
    }
    return reverseStr;
}


/**
 * Переворачивает переданное целое число (ставит все цифры числа в обратном порядке)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    return reverseString(num + "");
}


/**
 * Проверяет на валидность CCN (credit card number) и возвращает true если CCN валиден
 * и возвращает false в противном случае.
 *
 * Описание алгоритма по ссылке : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
    ccn += "";
    let length = ccn.length;
    let multiply = 0;
    let sum = 0;

    while (length) {
        let digit = parseInt(ccn.charAt(--length), 10);
        if (multiply) {
            if ( (digit *= 2) > 9) {
                digit -=9;
            }
        }
        multiply ^= 1;
        sum += digit;
    }
    return (sum % 10 == 0);
}


/**
 * Возвращает сумму всех цифр переданного чила след. образом:
 *   step1 : найти сумму всех цифр исходного числа
 *   step2 : если сумма на step1 больше 9 нужно проделать step1 с полученной суммой
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {

    function getDigitSum(num) {
        num += "";
        let length = num.length;
        let sum = 0;
        while (length) {   
            sum += +num[--length];
        }  
        return sum;
    }

    let sum = getDigitSum(num);
    if (sum > 9) {
        sum = getDigitSum(sum);
    }
    return sum;
}


/**
 * Возвращает true если переданная строка представляет собой правильную скобочную
 * структура, если нет -false
 * Правильная скобочная структура состоит из соответствующих закрывающихся,
 * открывающихся фигурных скобок, стоящих на соответствующих местях.
 * Скобочная последовательность может содержать:  [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
    let openBrackets = ['{', '(', '[', '<'];
    let closedBrackets = ['}', ')', ']', '>'];
    let stack = [];

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (openBrackets.indexOf(char) > -1) {
            stack.push(char);
        }
        else {
            let last = closedBrackets.indexOf(char); 
            let previous = openBrackets.indexOf(stack.pop());
            if (last < 0 || last != previous )  return false;
        }
    }
    return stack.length == 0;
}


/**
 * Возвращает строку, составленной на основе периода от переданного начала и конца периода
 * Конечная строка должна удовлетворять следующим правилам:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
    let seconds = (endDate - startDate - 0.001) / 1000 
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let months = days / 30;
    let years = months / 12;

    if (days > 545) return Math.round(years) + ' years ago';
    if (days > 345) return 'a year ago';
    if (days > 45) return Math.round(months) + ' months ago';
    if (days > 25) return 'a month ago';
    if (hours > 36) return Math.round(days) + ' days ago';
    if (hours > 22) return 'a day ago';
    if (minutes > 90) return Math.round(hours) + ' hours ago';
    if (minutes > 45) return 'an hour ago';
    if (seconds > 90) return Math.round(minutes) + ' minutes ago';
    if (seconds > 45) return 'a minute ago';
    return 'a few seconds ago';  
}

/**
 * Вернуть строку с представление числа в n-ой (бинарной, десятичной, и т.д., где n<=10) системе исчисления.
 * Более подробное описание
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {

    function revertStr(str) {
        let length = str.length;
        let result = "";
        while (length) {
            result += str[--length];   
        }
        return result;
    }

    if (n == 10) return num;
    let str = "";
    while (num >= n) {
        str += num % n;
        num = Math.floor(num / n);
    }
    str += num;
    return revertStr(str);
}


/**
 * Возбращает общий путь к директории из всех путей переданных в массиве
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
    if (pathes.length == 1) return pathes[0];
    for (let i = 0; i < pathes.length; i++) {
        pathes[i] = pathes[i].split('/');
    }

    let same = true;
    let count = 0;
    let result = "";

    while (same && count < pathes[0].length) {
        let first = pathes[0][count];
        for (let i = 1; i < pathes.length; i++) {
            if (! (pathes[i][count] == first)) {
                same = false;
                break;
            }
        }
        if (same) {
            result += first + '/';
        }
        count++;
    }
    return result;
}

/**
 * Возвращает произведение двух переданных матриц.
 * Более подробное описание: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */

function getMatrixProduct(m1, m2) {
    let resultMatrix = [];
    let height = m1.length;
    let width = m2[0].length;
    let count = m1[0].length;

    for (let row = 0; row < height; row ++) {
        let newRow = [];
        for (let column = 0; column < width; column++) {
            let sum = 0;
            for (let i = 0; i < count; i ++) {
                sum += m1[row][i] * m2[i][column];
            }
            newRow.push(sum);
        }
        resultMatrix.push(newRow);
    }
    return resultMatrix; 
}


/**
 * Возвращает результат игры крестики-нолики для текущих позиций 'X', 'O'
 * Более подробное описание: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Позиции X и O представлены в виде матрицы 3x3 cо значениями: 'X','0', undefined
 * Функция должна возвращать победиля игры по текущей позиции.
 * Результат должен быть в виде: 'X' или '0' или undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
    if( position[0][0] && (position[0][0] == position[1][1]) && (position[0][0] == position[2][2]) )
        return position[0][0];
    if( position[0][2] && (position[0][2] == position[1][1]) && (position[0][2] == position[2][0]) )
        return position[0][2];

    for(let i = 0; i < position.length; i++) {
        if( position[i][0] && (position[i][0] == position[i][1]) && (position[i][0] == position[i][2]) )
            return position[i][1];
        if ( position[0][i] && (position[0][i] == position[1][i]) && (position[0][i] == position[2][i]) )
            return position[1][i];
    }
   return undefined;
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
