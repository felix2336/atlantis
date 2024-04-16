export default class Suggestion {
    user: string
    suggestion: string
    type: number

    constructor(type: number, user: string, suggestion: string) {
        this.type = type
        this.suggestion = suggestion
        this.user = user
    }
}