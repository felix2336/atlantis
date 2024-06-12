import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember, Colors } from "discord.js";
import { SlashCommand } from "contents";
import Warns from '../../Schemas/warns'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('clearwarnings')
        .setDescription('Lösche alle Verwarnungen von einem User')
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const target = interaction.options.getMember('user') as GuildMember
        await Warns.findOne({ userId: target.user.id })
            .then(async User => {
                if (!User || User.warns.length == 0) {
                    interaction.reply({ content: `${target} hat keine Verwarnungen!`, ephemeral: true })
                    return
                } else {
                    User.warns = []
                    await User.save()
                    interaction.reply({ content: `Du hats alle Verwarnungen von ${target} gelöscht!`, ephemeral: true })
                }
            })
            .catch(console.log)
    },
}
export default command