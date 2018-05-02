'use strict';

/**
 * Возвращает true если слово попадается в заданной головоломке.
 * Каждое слово может быть построено при помощи прохода "змейкой" по таблице вверх, влево, вправо, вниз.
 * Каждый символ может быть использован только один раз ("змейка" не может пересекать себя).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (первая строка)
 *   'REACT'     => true   (начиная с верхней правой R и дальше ↓ ← ← ↓)
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (первая колонка)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    throw new Error('Not implemented');
}


/**
 * Возвращает все перестановки заданной строки.
 * Принимаем, что все символы в заданной строке уникальные.
 * Порядок перестановок не имеет значения.
 *
 * @param {string} chars
 * @return {Iterable.<string>} все возможные строки, построенные из символов заданной строки
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    yield (chars);

    function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    let charArr = chars.split('');
    let temp = new Array(chars.length).fill(0);
    let i = 0;

    while (i < charArr.length) {
        if (temp[i] < i) {
            (i % 2 == 0) ? swap(charArr, 0, i) : swap(charArr, temp[i], i);
            yield(charArr.join(''));
            temp[i]++;
            i = 0;
        }
        else {
            temp[i] = 0;
            i++;
        }
    }
}

/**
 * Возвращает наибольшую прибыль от игры на котировках акций.
 * Цены на акции храняться в массиве в порядке увеличения даты.
 * Прибыль -- это разница между покупкой и продажей.
 * Каждый день вы можете либо купить одну акцию, либо продать любое количество акций, купленных до этого, либо ничего не делать.
 * Таким образом, максимальная прибыль -- это максимальная разница всех пар в последовательности цен на акции.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (купить по 1,2,3,4,5 и затем продать все по 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (ничего не покупать)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (купить по 1,6,5 и затем продать все по 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let sum = 0;

    while (quotes.length) {
        let indexOfMaxValue = quotes.reduce( (iMax, num, index) => num > quotes[iMax] ? index : iMax, 0);
        for (let i = 0; i < indexOfMaxValue; i++) {
            sum += quotes[indexOfMaxValue] - quotes[i];
        }
        quotes = quotes.slice(indexOfMaxValue + 1);
    }
    return sum;
}


/**
 * Класс, предосатвляющий метод по сокращению url.
 * Реализуйте любой алгоритм, но не храните ссылки в хранилище пар ключ\значение.
 * Укороченные ссылки должны быть как минимум в 1.5 раза короче исходных.
 *
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {
    encode: function(url) {
        let result = "";
        let cur, next, newChar;
        for (let i = 0; i < url.length - 1; i += 2) {
            cur = url.charCodeAt(i); 
            next = url.charCodeAt(i + 1);
            newChar = (cur << 8) | next;
            result += String.fromCharCode(newChar);
        }
        if (url.length % 2) {
            result += String.fromCharCode(url.charCodeAt(url.length - 1) << 8);
        } 
        return result;
    },
    
    decode: function(code) {
        let result = "";
        let cur, next, oldChar;
        for (let i = 0; i < code.length; i++) {
            oldChar = code.charCodeAt(i);
            next = oldChar & 255;
            cur = oldChar >> 8;
            result += String.fromCharCode(cur) + ((next) ? String.fromCharCode(next) : '');
        }
        return result;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
