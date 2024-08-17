import { ExtendedClient } from 'dcbot';
import { ClientOptions, Guild } from 'discord.js';
import { VoiceConnection, AudioPlayer, CreateAudioPlayerOptions } from '@discordjs/voice';
export declare class MyClient extends ExtendedClient {
    guild?: Guild;
    connection?: VoiceConnection;
    queue: {
        title: string;
        url: string;
        thumbnail: string;
        duration: string;
    }[];
    player?: AudioPlayer;
    constructor(options: ClientOptions);
    setGuild(guild: Guild): void;
    enableAudioPlayer(options?: CreateAudioPlayerOptions): void;
}
