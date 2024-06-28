import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, PermissionFlagsBits, GuildMember, EmbedBuilder, Colors } from "discord.js";
import { UserContextMenu } from "dcbot";
import Warns from "../../Schemas/warns";

export default new UserContextMenu( {
    data: new ContextMenuCommandBuilder()
        .setName('Warns')
        .setType(ApplicationCommandType.User),

    async execute(interaction) {
        const member = interaction.options.getMember('user') as GuildMember

        await Warns.findOne({ userId: member.user.id })
            .then(async User => {
                if (!User || User.warns.length == 0) {
                    interaction.reply({ content: `${member} hat keine Verwarnungen!`, ephemeral: true })
                } else {
                    const embed = new EmbedBuilder({
                        title: `Warns von ${member.displayName}`,
                        description: '',
                        color: Colors.Gold
                    })

                    for (const warn of User.warns) {
                        embed.data.description += `${warn.date} von ${warn.moderator}\nGrund: **${warn.reason}**\nWarn-ID: \`${warn.id}\`\n\n`
                    }

                    interaction.reply({ embeds: [embed] })
                    return
                }
            })
            .catch(console.log)
    }
})