import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, CommandInteraction, GuildMember, TextChannel } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import { Channels } from '../../config'
import Warn from '../../Classes/warn'

export default {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warne einen User')
        .addUserOption(input => input.setName('user').setDescription('Der User der gewarnt werden soll').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für den Warn').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction) {
        const warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as Warn[]
        const reason = interaction.options.get('reason', true).value as string
        const member = interaction.options.getMember('user') as GuildMember
        const channel = interaction.guild!.channels.cache.get(Channels.warn) as TextChannel

        const warn = new Warn(member.user.id, reason)
        warns.push(warn)
        writeFileSync('./JSON/warns.json', JSON.stringify(warns, null, 2), 'utf8')
        const embed = new EmbedBuilder({
            title: 'User gewarnt',
            description: `${member} wurde von ${interaction.user.username} wegen **${reason}** gewarnt! Warn-ID: \`${warn.id}\``,
        })
        await channel.send({ embeds: [embed] })
        interaction.reply({ content: `Du hast ${member} wegen **${reason}** gewarnt!`, ephemeral: true })
    }
}