import { Message, ChannelType } from 'discord.js';

export default {
    name: 'messageCreate',

    async execute(message: Message){
        if(message.channelId !== '1153922545834262550') return;
        
        try{
            message.crosspost()
        }catch(err){
            console.log(err)
        }
    }
}