"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUser = void 0;
class MessageUser {
    constructor(data) {
        this.userid = data === null || data === void 0 ? void 0 : data.userid;
        this.username = data === null || data === void 0 ? void 0 : data.username;
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
    addMessage(dayNumber) {
        const day = this.getDayByIndex(dayNumber);
        this.totalMessages++;
        switch (day) {
            case 'monday': {
                this.messages.monday++;
                break;
            }
            case 'tuesday': {
                this.messages.tuesday++;
                break;
            }
            case 'wednesday': {
                this.messages.wednesday++;
                break;
            }
            case 'thursday': {
                this.messages.thursday++;
                break;
            }
            case 'friday': {
                this.messages.friday++;
                break;
            }
            case 'saturday': {
                this.messages.saturday++;
                break;
            }
            case 'sunday': {
                this.messages.sunday++;
                break;
            }
        }
    }
    getMessagesOfDay(dayNumber) {
        const day = this.getDayByIndex(dayNumber);
        switch (day) {
            case 'monday': {
                return this.messages.monday;
            }
            case 'tuesday': {
                return this.messages.tuesday;
            }
            case 'wednesday': {
                return this.messages.wednesday;
            }
            case 'thursday': {
                return this.messages.thursday;
            }
            case 'friday': {
                return this.messages.friday;
            }
            case 'saturday': {
                return this.messages.saturday;
            }
            case 'sunday': {
                return this.messages.sunday;
            }
            default: {
                return 0;
            }
        }
    }
    getTotalMessages() {
        return this.totalMessages;
    }
    resetMessages() {
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
    assignData(data) {
        this.userid = data.userid;
        this.username = data.username;
        this.totalMessages = data.totalMessages;
        this.messages.monday = data.messages.monday;
        this.messages.tuesday = data.messages.tuesday;
        this.messages.wednesday = data.messages.wednesday;
        this.messages.thursday = data.messages.thursday;
        this.messages.friday = data.messages.friday;
        this.messages.saturday = data.messages.saturday;
        this.messages.sunday = data.messages.sunday;
        return this;
    }
    getDayByIndex(index) {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[index];
    }
}
exports.MessageUser = MessageUser;
