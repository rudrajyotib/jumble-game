import { createLettersArrayWithPosition, createArrayOfEmptyElements } from "./StringUtils.js";

export class GameController {
    constructor(jumbledInput, target) {
        this.jumbledWord = jumbledInput
        this.targetWord = target
        this.questionFrame = createLettersArrayWithPosition(this.jumbledWord)
        this.answerFrame = createArrayOfEmptyElements(this.jumbledWord)
        this.userInput = []
        this.lastAnswerPoint = -1;
    }

    moveFromQuestionToAnswerFrame(index) {
        if (this.questionFrame[index].value === ' ') {
            return
        }
        this.lastAnswerPoint = this.lastAnswerPoint + 1
        this.answerFrame[this.lastAnswerPoint].value = this.questionFrame[index].value
        this.questionFrame[index].value = " "
        this.userInput.push(index)
    }

    undoLastAnswer() {
        if (this.lastAnswerPoint === -1) {
            return
        }
        let indexInQuestionFrame = this.userInput.pop()
        this.questionFrame[indexInQuestionFrame].value = this.answerFrame[this.lastAnswerPoint].value
        this.answerFrame[this.lastAnswerPoint].value = " "
        this.lastAnswerPoint = this.lastAnswerPoint - 1
    }

    undoAll() {
        while (this.lastAnswerPoint != -1) {
            this.undoLastAnswer()
        }
    }

    answerReached() {
        if (this.lastAnswerPoint !== (this.jumbledWord.length - 1)) {
            return false
        }
        return this.answerFrame.map((frame) => frame.value.trim()).join('') === this.targetWord
    }

    presentStateOfAnswer() {
        return this.answerFrame.map((frame) => frame.value.trim()).join('')
    }

    presentStateOfQuestion() {
        return this.questionFrame.map((frame) => frame.value.trim()).join('')
    }

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