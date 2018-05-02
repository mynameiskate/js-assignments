'use strict';

/**
 * Возвращает номер банковского счета, распаршеный из предоставленной строки.
 *
 * Вы работаете в банке, который недавно приобрел аппарат, помогающий в чтении писем и факсов, отправленных филиалами.
 * Аппарат сканирует бумажный документ и генерирует строку с банковсчким счетом, который выглядит следующим образом:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Каждая строка содержит номер счета, записанный с помощью '|' и '_'.
 * Каждый счет должен иметь 9 цифр в диапазоне от 0 до 9.
 *
 * Ваша задача -- написать функцию, которая будет принимать номер счета строкой, как описано выше, и парсить ее в обычные числа.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
       const top =  [' _ ', '   ', ' _ ', ' _ ', '   ', ' _ ', ' _ ', ' _ ', ' _ ', ' _ '];
    const middle =  ['| |', '  |', ' _|', ' _|', '|_|', '|_ ', '|_ ', '  |', '|_|', '|_|'];
    const bottom =  ['|_|', '  |', '|_ ', ' _|', '  |', ' _|', '|_|', '  |', '|_|', ' _|'];

    function getStringDigit(index, arr) {
        let digit = [];
        for (let i = 0; i < arr.length; i++) {
            digit.push( arr[i].slice(index * 3, (index + 1) * 3));
        }
        return digit;
    }

    let stringAccount = bankAccount.split('\n');
    const numOfDigits = bankAccount.length / 3 - 1;
    let result = '';

    for (let i = 0; i < numOfDigits; i++) {
        const digit = getStringDigit(i, stringAccount);
        for (let j = 0; j < numOfDigits; j++) {
            if (top[j] == digit[0] && middle[j] == digit[1] && bottom[j] == digit[2]) {
                result += j;
                break;
            }

        }
    } 
    return result;
}


/**
 * Возвращает строку, в которой будут вставлены переносы строки в правильных местах. Каждая часть до переноса строки должна быть не больше, чем переданное в функцию число.
 * Строка может быть перенесена только по границе слов.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let startOfLine = 0, endOfWord = 0;
    let count = 0, i = 0;
    while(text[i]) {
        count++;
        if (text[i] == ' ') endOfWord = i;
        if (count > columns) {
            yield text.substring(startOfLine, endOfWord);
            startOfLine = endOfWord + 1;
            count = 0;
            i = endOfWord;
        }
        i++;
    }
    yield text.substring(startOfLine);
}


/**
 * Возвращает ранг заданной покерной комбинации.
 * Ранги смотрите тут: https://en.wikipedia.org/wiki/List_of_poker_hands
 * https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BA%D0%B5%D1%80
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    const getIndex = card => 'A234567891JQK'.indexOf(card.slice(0,1));
    const sortCards = (a, b) => getIndex(a) - getIndex(b);
    const getKind = card => card[card.length - 1];

    hand.sort(sortCards);
    if (getIndex(hand[0]) == 0 && getIndex(hand[hand.length -1]) == 12) {
        hand.push(hand.shift());
    }
    let allCardsCounts = getOneOfKindCount(hand);

   function isStraight(hand){
        for (let i = 0; i < hand.length - 1; i ++) {
            const diff = getIndex(hand[i]) - getIndex(hand[i + 1]);
            if (diff != -1 && diff != 12) {
                return false;
            }
        }
        return true;
    }  

    function isFlush(hand) {
        for (let i = 0; i < hand.length - 1; i ++) {
            if (getKind(hand[i]) != getKind(hand[i + 1])) return false;
        }
        return true;
    }

    function getOneOfKindCount(hand) {
        let allCounts = [];
        let current = 0, count = 1;
        while(current < hand.length - 1) {
            if (getIndex(hand[current]) == getIndex(hand[current + 1])) {
                count++;
            }
            else {
                allCounts.push(count);
                count = 1;
            }
            current++;
        }
        allCounts.push(count);
        return allCounts.sort( (a, b) => b - a);
    }

    const isStraightFlush = hand => isFlush(hand) && isStraight(hand);
    const isFullHouse = allCardsCounts => allCardsCounts.length == 2 && allCardsCounts[0] == 3 && allCardsCounts[1] == 2;
    const isFourOfKind = allCardsCounts => allCardsCounts[0] == 4;
    const isThreeOfKind = allCardsCounts => allCardsCounts[0] == 3;
    const isTwoPairs = allCardsCounts => allCardsCounts.length == 3 && allCardsCounts[0] == 2 && allCardsCounts[1] == 2;
    const isOnePair = allCardsCounts => allCardsCounts.some( count => count == 2);

    if (isStraightFlush(hand)) return PokerRank.StraightFlush;
    if (isFourOfKind(allCardsCounts)) return PokerRank.FourOfKind;
    if (isFullHouse(allCardsCounts)) return PokerRank.FullHouse;
    if (isFlush(hand)) return PokerRank.Flush;
    if (isStraight(hand)) return PokerRank.Straight;
    if (isThreeOfKind(allCardsCounts)) return PokerRank.ThreeOfKind;
    if (isTwoPairs(allCardsCounts)) return PokerRank.TwoPairs;
    if (isOnePair(allCardsCounts)) return PokerRank.OnePair;
    return PokerRank.HighCard;
} 

/**
 * Возвращает набор прямоугольников из заданной фигуры.
 * Фигура -- это многострочный набор ASCII символов из '-', '+', '|' и пробелов.
 * Ваша задача -- разбить фигуру на прямоугольники, из которых она составлена.
 *
 * К СВЕДЕНИЮ: Порядок прямоугольников не имеет значения.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
