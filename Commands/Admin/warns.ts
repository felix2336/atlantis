import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import { Warn, WarnData } from '../../contents'

export default {
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Lasse dir alle Warns von einem User anzeigen')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du die Warns sehen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction) {
        const warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as WarnData[]
        //@ts-ignore
        const member = interaction.options.getMember('user') as GuildMember

        const warnData = warns.find(w => w.userid == member.user.id)
        if (!warnData || !warnData.warns) return interaction.reply({ content: `${member} hat keine Verwarnungen!`, ephemeral: true })

        const warnUser = new Warn(warnData)
        const embed = warnUser.getWarnsAsEmbed()

        interaction.reply({ embeds: [embed] })

    }

}