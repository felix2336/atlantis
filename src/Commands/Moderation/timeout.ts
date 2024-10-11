import { SlashCommand } from "dcbot";
import { Colors, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ms } from 'utils'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeoute einen User')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(input => input.setName('user').setDescription('Welchen User möchtest du timeouten?').setRequired(true))
        .addStringOption(input => input.setName('duration').setDescription('Wie lange soll der Timeout dauern? ( bspw. 1d2h3m)').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für den Timeout')),

    async execute(interaction, client) {
        const member = interaction.options.getMember('user') as GuildMember;
        const timeString = interaction.options.getString('duration', true);
        const reason = interaction.options.getString('reason');
        const moderator = interaction.member as GuildMember;
        if (!member.moderatable) {
            interaction.reply({ content: 'Der Bot hat nicht genug Rechte, um diesen User zu timeouten!', ephemeral: true });
            return;
        }

        ms(timeString, async (error, result) => {
            if (error) {
                interaction.reply({ content: error.message, ephemeral: true });
                return;
            } else {
                if (result) {
                    await member.timeout(result, reason ? reason : 'Kein Grund angegeben').catch(err => {
                        interaction.reply({ content: 'Etwas ist schiefgelaufen. Versuche es erneut oder melde einen Bug', ephemeral: true });
                        return;
                    });
                    const dmEmbed = new EmbedBuilder({
                        author: { name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' },
                        title: 'Du wurdest getimeouted',
                        fields: [
                            { name: 'Moderator', value: moderator.user.username, inline: true },
                            { name: 'Grund', value: reason || '*Kein Grund angegeben*' }
                        ],
                        timestamp: new Date,
                        color: Colors.Red
                    })
                    await member.send({ embeds: [dmEmbed] }).catch(err => null);
                    await interaction.reply({ content: `Du hast ${member} erfolgreich getimeouted!`, ephemeral: true })
                }
            }
        })
    },
})