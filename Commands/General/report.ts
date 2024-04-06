import { CommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, Colors, SlashCommandBuilder } from 'discord.js'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Melde einen User an das Serverteam')
        .addUserOption(option => option.setName('user').setDescription('Der zu meldende User').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Grund für die Meldeung').setRequired(true))
        .addAttachmentOption(input => input.setName('image').setDescription('Erlaubte Dateien: png, jpg, jpeg, webp')),

    async execute(interaction: CommandInteraction) {
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