const { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType, PermissionFlagsBits, GuildMember } = require('discord.js')
const DB = require('../../Schemas/messages')

module.exports = {
    name: 'Weekly Messages',
    type: ApplicationCommandType.User,

    /**
     * @param {UserContextMenuCommandInteraction} interaction 
     */

    async execute(interaction) {
        const member = interaction.member;
        const target = interaction.targetMember
        if (!member.roles.cache.has('1156298949301379212')) return interaction.reply({ content: 'Du bist nicht im Serverteam und darfst diesen Befehl nicht nutzen', ephemeral: true })

        const User = await DB.findOne({ user: target.user.id })
        if(!User) return interaction.reply({content: 'Dieser Nutzer hat keinen Eintrag in der Datenbank.', ephemeral: true})

        interaction.reply({content: `${target} hat in dieser Woche bereits ${User.total} Nachrichten gesendet!`, ephemeral: true})
    }
}