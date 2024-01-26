const { Message, Events } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    disabled: true,

    /**
     * @param {Message} message 
     */

    async execute(message){
        console.log(message.content)
        if(!message.partial) console.log(message.partial)
    }
}