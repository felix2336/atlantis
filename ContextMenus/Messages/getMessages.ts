import { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType, PermissionFlagsBits, GuildMember } from 'discord.js'
import DB from '../../Schemas/messages'

export default {
    data: new ContextMenuCommandBuilder()
        .setName('Weekly Messages')
        .setType(ApplicationCommandType.User),

    async execute(interaction: UserContextMenuCommandInteraction) {
        const member = interaction.member as GuildMember;
        const target = interaction.targetMember as GuildMember
        if (!member.roles.cache.has('1156298949301379212')) return interaction.reply({ content: 'Du bist nicht im Serverteam und darfst diesen Befehl nicht nutzen', ephemeral: true })

        const User = await DB.findOne({ user: target.user.id })
        if(!User) return interaction.reply({content: 'Dieser Nutzer hat keinen Eintrag in der Datenbank.', ephemeral: true})

        interaction.reply({content: `${target} hat in dieser Woche bereits ${User.total} Nachrichten gesendet!`, ephemeral: true})
    }
}