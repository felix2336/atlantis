const { CommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, Colors } = require('discord.js')

module.exports = {
    name: 'report',
    description: 'Reporte einen anderen User',
    // permission: 'SendMessages',
    dev: true,
    options: [
        {
            name: 'user',
            description: 'Bitte wähle den User aus, den du reporten möchtest',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'reason',
            description: 'Bitte gib den Grund für den Report ein',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'image',
            description: 'Erlaubte Dateien: png, jpg, jpeg, webp',
            type: ApplicationCommandOptionType.Attachment,
            required: false
        }
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const user = interaction.options.getUser('user'),
            reason = interaction.options.getString('reason'),
            attachment = interaction.options.getAttachment('image')

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