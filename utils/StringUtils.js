export function createLettersArrayWithPosition(input) {
    const len = input.length;
    let result = [];
    for (let iter = 0; iter < len; iter++) {
        result.push({
            key: iter,
            value: input.charAt(iter)
        });
    }
    return result;
}

export function createArrayOfEmptyElements(input) {
    const len = input.length;
    let result = [];
    for (let iter = 0; iter < len; iter++) {
        result.push({
            key: iter,
            value: " "
        });
    }
    return result;
}

export function checkStringsAnagram(a, b) {
    if (a.length !== b.length) {
        return false
    }
    let str1 = a.split('').sort().join('');
    let str2 = b.split('').sort().join('');
    return (str1 === str2);
}

function arrayRandomiser(inputArray) {
    n = inputArray.length;
    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = inputArray[i];
        inputArray[i] = inputArray[j];
        inputArray[j] = tmp;
    }
    return inputArray
}


export function randomiseString(word) {
    return arrayRandomiser(word.split('')).join('')
}