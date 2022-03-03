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
