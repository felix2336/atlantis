"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClient = void 0;
const dcbot_1 = require("dcbot");
const voice_1 = require("@discordjs/voice");
class MyClient extends dcbot_1.ExtendedClient {
    constructor(options, devId) {
        super(options, devId);
        this.queue = [];
    }
    setGuild(guild) {
        this.guild = guild;
    }
    enableAudioPlayer(options) {
        this.player = (0, voice_1.createAudioPlayer)(options);
        this.logger.info("Musikplayer aktiviert");
    }
}
exports.MyClient = MyClient;
