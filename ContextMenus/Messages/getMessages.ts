import { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType, PermissionFlagsBits, GuildMember } from 'discord.js'
import { MessageUser } from '../../contents';
import { readFileSync } from 'fs'

export default {
    data: new ContextMenuCommandBuilder()
        .setName('Weekly Messages')
        .setType(ApplicationCommandType.User),

    async execute(interaction: UserContextMenuCommandInteraction) {
        const member = interaction.member as GuildMember;
        const target = interaction.targetMember as GuildMember
        if (!member.roles.cache.has('1156298949301379212')) return interaction.reply({ content: 'Du bist nicht im Serverteam und darfst diesen Befehl nicht nutzen', ephemeral: true })
        const DB = JSON.parse(readFileSync('./JSON/messages.json', 'utf8')) as MessageUser[]
        const UserData = DB.find(u => u.userid == target.user.id)
        if (!UserData) return interaction.reply({ content: 'Dieser Nutzer hat keinen Eintrag in der Datenbank.', ephemeral: true })
        const User = new MessageUser().assignData(UserData)

        interaction.reply({ content: `${target} hat in dieser Woche bereits ${User.getTotalMessages()} Nachrichten gesendet!`, ephemeral: true })
    }
}