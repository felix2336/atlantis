const {Message, ChannelType} = require('discord.js');
const { setDriver } = require('mongoose');

module.exports = {
    name: 'messageCreate',

    /**@param {Message} message */

    async execute(message){
        if(message.channel.type !== ChannelType.GuildAnnouncement) return; 
        if(message.guild.id !== '1146113684435898439') return; 
        if(message.channelId !== '1153922545834262550') return;
        
        try{
            message.crosspost()
        }catch(err){
            return;
        }
    }
}