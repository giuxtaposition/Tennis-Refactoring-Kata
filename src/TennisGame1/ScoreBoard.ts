import { ScoreRule } from './ScoreRule'
export default class ScoreBoard {
    private scoreRules: ScoreRule[]

    constructor(scoreRules: ScoreRule[]) {
        this.scoreRules = scoreRules
    }

    public getScore() {
        for (let rule of this.scoreRules) {
            if (rule.isValid()) {
                return rule.getResult()
            }
        }
    }
}
