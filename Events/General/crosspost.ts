import { Event } from 'dcbot';
import { Message, ChannelType } from 'discord.js';

export default new Event( {
    name: 'messageCreate',

    async execute(client, message: Message){
        if(message.channelId !== '1153922545834262550') return;
        
        try{
            message.crosspost()
        }catch(err){
            console.log(err)
        }
    }
})