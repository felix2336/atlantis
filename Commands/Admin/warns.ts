import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, CommandInteraction, GuildMember } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import Warn from '../../Classes/warn'

export default {
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Lasse dir alle Warns von einem User anzeigen')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du die Warns sehen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction) {
        const warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as Warn[]
        const member = interaction.options.getMember('user') as GuildMember

        const memberWarns = warns.filter(w => w.userid == member.user.id)

        const embed = new EmbedBuilder({
            description: `## Warns von ${member}\n${memberWarns.map(w => w.reason + ` (\`${w.id}\`)`).join('\n')}`
        })

        interaction.reply({ embeds: [embed] })

    }

}