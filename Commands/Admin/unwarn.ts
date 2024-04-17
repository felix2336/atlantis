import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, GuildMember } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import {Warn} from '../../contents'

export default {
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Entferne einen Warn von einem User')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du einen Warn entfernen möchtest').setRequired(true))
        .addStringOption(input => input.setName('warn-id').setDescription('Die ID des Warns, den du entfernen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction){
        let warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as Warn[]
        const member = interaction.options.getMember('user') as GuildMember
        const id = interaction.options.get('warn-id', true).value as string

        warns = warns.filter(w => w.id != id)
        writeFileSync('./JSON/warns.json', JSON.stringify(warns, null, 2), 'utf8')
        interaction.reply(`Du hast einen Warn von ${member} entfernt!`)
    }
}