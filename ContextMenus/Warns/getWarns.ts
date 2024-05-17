import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, PermissionFlagsBits, GuildMember, EmbedBuilder } from "discord.js";
import { readFileSync } from 'fs'
import { ContextMenu, Warn, WarnData } from "../../contents";

const menu: ContextMenu<UserContextMenuCommandInteraction> = {
    data: new ContextMenuCommandBuilder()
        .setName('Warns')
        .setType(ApplicationCommandType.User),

    async execute(interaction) {
        const target = interaction.targetMember as GuildMember
        if(!(interaction.member as GuildMember).permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({content: 'Du darfst das nicht :)', ephemeral: true})

        const warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as WarnData[]

        const warnData = warns.find(w => w.userid == target.user.id)
        if (!warnData || !warnData.warns || warnData.warns.length == 0) return interaction.reply({ content: `${target} hat keine Verwarnungen!`, ephemeral: true })

        const warnUser = new Warn(warnData)

        const embed = warnUser.getWarnsAsEmbed()

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}
export default menu