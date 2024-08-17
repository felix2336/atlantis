import { MessageUserData } from "../Interfaces/MessageUserData"
export class MessageUser {
    userid?: string
    username?: string
    private totalMessages: number
    private messages: {
        monday: number,
        tuesday: number,
        wednesday: number,
        thursday: number,
        friday: number,
        saturday: number,
        sunday: number
    }

    constructor(data?: MessageUserData) {
        this.userid = data?.userid;
        this.username = data?.username;
        this.totalMessages = 0;
        this.messages = {
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        };
    }

    public addMessage(dayNumber: number) {
        const day = this.getDayByIndex(dayNumber)
        this.totalMessages++;
        switch (day) {
            case 'monday': {
                this.messages.monday++
                break
            }
            case 'tuesday': {
                this.messages.tuesday++
                break
            }
            case 'wednesday': {
                this.messages.wednesday++
                break
            }
            case 'thursday': {
                this.messages.thursday++
                break
            }
            case 'friday': {
                this.messages.friday++
                break
            }
            case 'saturday': {
                this.messages.saturday++
                break
            }
            case 'sunday': {
                this.messages.sunday++
                break
            }
        }
    }

    public getMessagesOfDay(dayNumber: number): number {
        const day = this.getDayByIndex(dayNumber)
        switch (day) {
            case 'monday': {
                return this.messages.monday
            }
            case 'tuesday': {
                return this.messages.tuesday
            }
            case 'wednesday': {
                return this.messages.wednesday
            }
            case 'thursday': {
                return this.messages.thursday
            }
            case 'friday': {
                return this.messages.friday
            }
            case 'saturday': {
                return this.messages.saturday
            }
            case 'sunday': {
                return this.messages.sunday
            }
            default: {
                return 0
            }
        }
    }

    public getTotalMessages(): number {
        return this.totalMessages
    }

    public resetMessages() {
        this.totalMessages = 0;
        this.totalMessages = 0;
        this.messages = {
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        };
    }

    public assignData(data: MessageUser): MessageUser {
        this.userid = data.userid
        this.username = data.username
        this.totalMessages = data.totalMessages
        this.messages.monday = data.messages.monday
        this.messages.tuesday = data.messages.tuesday
        this.messages.wednesday = data.messages.wednesday
        this.messages.thursday = data.messages.thursday
        this.messages.friday = data.messages.friday
        this.messages.saturday = data.messages.saturday
        this.messages.sunday = data.messages.sunday
        return this
    }

    private getDayByIndex(index: number): string {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        return days[index]
    }
}