const { Message, Client } = require('discord.js')
const { exec } = require('child_process')

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     * @param {Client} client 
     */

    async execute(message, client) {
        if (message.author.id != '773072144304963624') return;
        if (message.content.startsWith(`pm2`)) {
            const split = message.content.split(' ')
            const command = split[1]
            const target = split[2]

            exec(`pm2 ${command} ${target}`, (error) => { if (error) return message.reply(`Etwas ist schiefgelaufen bei folgendem Befehl: ${error.cmd}`) })
            message.reply(`Folgender Befehl wurde erfolgreich ausgeführt: \`\`${command} ${target}\`\``)
        }
    }
}