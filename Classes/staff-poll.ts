class StaffPoll {
    id: string
    question: string
    multiple: boolean
    options: { name: string, votes: string[] }[]
    participants: string[]

    constructor(id?: string, question?: string, multiple?: boolean) {
        this.id = id || ''
        this.question = question || ''
        this.multiple = multiple || false
        this.participants = []
        this.options = []
    }

    public addOption(name: string) {
        this.options.push({ name: name, votes: [] })
        return true
    }

    public voteForOption(optionIndex: number, userId: string) {
        if (this.isVotedForOption(optionIndex, userId)) return false
        this.options[optionIndex].votes.push(userId)
        this.participants.push(userId)
        return true
    }

    public assignData(data: this): StaffPoll{
        this.id = data.id
        this.question = data.question
        this.multiple = data.multiple
        this.options = data.options
        this.participants = data.participants

        return this
    }

    private isVotedForOption(optionIndex: number, userId: string): boolean {
        const option = this.getOptionByName(optionIndex)
        if (!option) throw new Error("Invalid Option Index")
        return option.votes.includes(userId)
    }

    private getOptionByName(index: number): { name: string, votes: string[] } | undefined {
        return this.options[Math.floor(index)]
    }
}

export default StaffPoll