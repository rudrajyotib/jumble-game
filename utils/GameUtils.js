export function createAnswerSheet(input) {
    let answerSheet = {}
    answerSheet.answer = input
    answerSheet.userInput = []
    answerSheet.answerLetters = []
    for (let iter = 0; iter < input.length; iter++) {
        answerSheet.userInput.push(-1);
        answerSheet.answerLetters.push(
            {
                key: iter,
                value: " "
            })
    }
    answerSheet.lastAnswerPoint = -1;
    return answerSheet;
}