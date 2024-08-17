import { SuggestionTypes } from "../Enums/SuggestionTypes";
import { TextChannel } from 'discord.js';
import { SuggestionData } from '../Interfaces/SuggestionData';
export declare class Suggestion {
    user: string;
    suggestion: string;
    type: SuggestionTypes;
    constructor(data: SuggestionData);
    submit(channel: TextChannel): Promise<void>;
    private getTypeString;
}
