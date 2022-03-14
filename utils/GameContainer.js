
export class GameContainer {
    constructor(gameType, question, answer) {
        this.question = question
        this.answer = answer
        this.gameType = gameType
        this.scores = [0, 0]
    }
}

