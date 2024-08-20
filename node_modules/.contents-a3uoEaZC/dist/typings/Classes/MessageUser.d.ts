import { MessageUserData } from "../Interfaces/MessageUserData";
export declare class MessageUser {
    userid?: string;
    username?: string;
    private totalMessages;
    private messages;
    constructor(data?: MessageUserData);
    addMessage(dayNumber: number): void;
    getMessagesOfDay(dayNumber: number): number;
    getTotalMessages(): number;
    resetMessages(): void;
    assignData(data: MessageUser): MessageUser;
    private getDayByIndex;
}
