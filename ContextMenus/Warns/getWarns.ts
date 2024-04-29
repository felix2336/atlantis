import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, PermissionFlagsBits, GuildMember, EmbedBuilder } from "discord.js";
import { readFileSync } from 'fs'
import { Warn } from "../../contents";

export default {
    data: new ContextMenuCommandBuilder()
        .setName('Warns')
        .setType(ApplicationCommandType.User),

    async execute(interaction: UserContextMenuCommandInteraction) {
        const target = interaction.targetMember as GuildMember

        const warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as Warn[]
        const memberWarns = warns.filter(w => w.userid == target.user.id)

        const embed = new EmbedBuilder({
            description: `## Warns von ${target}\n${memberWarns.map(w => w.reason + ` (\`${w.id}\`)`).join('\n')}`
        })

        interaction.reply({embeds: [embed], ephemeral: true})
    }
}