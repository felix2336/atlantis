const { CommandInteraction, Client } = require('discord.js')
const DB = require('../../Schemas/messages')

module.exports = {
    name: 'mlb',
    description: 'Temporärer Command',
    dev: true,

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const members = interaction.guild.members.cache.filter(member => member.roles.cache.has('1156298949301379212'))

        for (const [_, member] of members) {
            let User = await DB.findOne({ user: member.user.id })
            if (!User) {
                User = await DB.create({
                    user: member.user.id,
                    messagesSent: {
                        monday: 0,
                        tuesday: 0,
                        wednesday: 0,
                        thursday: 0,
                        friday: 0,
                        saturday: 0,
                        sunday: 0
                    },
                    total: 0
                })
                console.log(`Für ${member.user.username} wurde ein neuer Eintrag in der Datenbank erstellt`)
            } else {
                console.log(`${member.user.username} hat bereits einen Eintrag in der Datenbank`)
                continue
            }
        }
    }
}