import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, GuildMember } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import {Warn, WarnData} from '../../contents'

export default {
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Entferne einen Warn von einem User')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du einen Warn entfernen möchtest').setRequired(true))
        .addStringOption(input => input.setName('warn-id').setDescription('Die ID des Warns, den du entfernen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction){
        let warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as WarnData[]
        //@ts-ignore
        const member = interaction.options.getMember('user') as GuildMember
        const id = interaction.options.get('warn-id', true).value as string

        const warnData = warns.find(w => w.userid == member.user.id)
        if(!warnData || !warnData.warns) return interaction.reply({content: `${member} hat keine Verwarnungen!`, ephemeral: true})

        const warnUser = new Warn(warnData)
        const success = warnUser.removeWarn(id)
        if(!success) return interaction.reply({content: `${member} hat keine Verwarnung mit der ID \`${id}\`!`, ephemeral: true})
        warnUser.save()

        interaction.reply(`Du hast einen Warn von ${member} entfernt!`)
    }
}