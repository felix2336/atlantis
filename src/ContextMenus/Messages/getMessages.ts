import { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType, PermissionFlagsBits, GuildMember, CacheType, EmbedBuilder, Colors } from 'discord.js'
import { UserContextMenu } from 'dcbot'
import Messages from '../../Schemas/messages'

export default new UserContextMenu({
    data: new ContextMenuCommandBuilder()
        .setName('Weekly Messages')
        .setType(ApplicationCommandType.User),

    async execute(interaction) {
        const member = interaction.member as GuildMember;
        const target = interaction.targetMember as GuildMember
        if (!member.roles.cache.has('1156298949301379212')){
            interaction.reply({ content: 'Du bist nicht im Serverteam und darfst diesen Befehl nicht nutzen', ephemeral: true })
            return
        }
        const DBuser = await Messages.findOne({userId: target.user.id})
        if(!DBuser) {
            const embed = new EmbedBuilder({
                title: 'Keine Nachrichten gefunden',
                description: 'Der User hat keine Nachrichten gesendet',
                color: 0x00ff00
            })
            await interaction.reply({embeds: [embed]})
            return;
        }

        const embed = new EmbedBuilder({
            title: 'Gesendete Nachrichten',
            description: `${target} hat bereits ${DBuser.messagesSent} nachrichten gesendet`,
            color: Colors.Gold
        })

        await interaction.reply({ embeds: [embed] })
    },
})