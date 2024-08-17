import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember, Colors } from 'discord.js'
import { SlashCommand } from 'dcbot'
import Warns from '../../Schemas/warns'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Lasse dir alle Warns von einem User anzeigen')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du die Warns sehen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const member = interaction.options.getMember('user') as GuildMember

        await Warns.findOne({userId: member.user.id})
        .then(async User => {
            if(!User || User.warns.length == 0) {
                interaction.reply({content: `${member} hat keine Verwarnungen!`, ephemeral: true})
            } else {
                const embed = new EmbedBuilder({
                    title: `Warns von ${member.displayName}`,
                    description: '',
                    color: Colors.Gold
                })

                for (const warn of User.warns) {
                    embed.data.description += `${warn.date} von ${warn.moderator}\nGrund: **${warn.reason}**\nWarn-ID: \`${warn.id}\`\n\n`
                }

                interaction.reply({embeds: [embed]})
                return
            }
        })
        .catch(console.log)
    }
})