import { ExtendedClient } from 'dcbot'
import { ClientOptions, Guild } from 'discord.js'
import { VoiceConnection, AudioPlayer, createAudioPlayer, CreateAudioPlayerOptions } from '@discordjs/voice'
export class MyClient extends ExtendedClient {
    public guild?: Guild
    connection?: VoiceConnection
    queue: { title: string, url: string, thumbnail: string, duration: string }[]
    player?: AudioPlayer

    constructor(options: ClientOptions) {
        super(options)
        this.queue = []
    }

    public setGuild(guild: Guild) {
        this.guild = guild
    }

    public enableAudioPlayer(options?: CreateAudioPlayerOptions) {
        this.player = createAudioPlayer(options)
    }
}