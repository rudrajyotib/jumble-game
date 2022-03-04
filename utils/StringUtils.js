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