import { SuggestionTypes } from '../Enums/SuggestionTypes';
export interface SuggestionData {
    user: string;
    suggestion: string;
    type: SuggestionTypes;
}
