import { ChatInputCommandInteraction, EmbedBuilder, Colors, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Melde einen User an das Serverteam')
        .addUserOption(option => option.setName('user').setDescription('Der zu meldende User').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Grund für die Meldeung').setRequired(true))
        .addAttachmentOption(input => input.setName('image').setDescription('Erlaubte Dateien: png, jpg, jpeg, webp'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction) {
        //@ts-ignore
        const user = interaction.options.getUser('user')
        //@ts-ignore
        const reason = interaction.options.getString('reason')
        //@ts-ignore
        const attachment = interaction.options.getAttachment('image')

        const embed = new EmbedBuilder({
            title: 'Neuer Report',
            description: `${user} wurde von ${interaction.member} reportet. Grund für den Report:\n***${reason}***`,
            color: Colors.DarkOrange,
            timestamp: new Date()
        })

        if (attachment) {
            if (
                attachment.name.endsWith('.png') ||
                attachment.name.endsWith('.jpg') ||
                attachment.name.endsWith('.jpeg') ||
                attachment.name.endsWith('.webp')
            ) {
                embed.setImage(attachment.url)
            }
        }

        await interaction.reply({ embeds: [embed] })
    }
}
export default command