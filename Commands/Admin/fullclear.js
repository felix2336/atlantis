const { CommandInteraction, Client, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    name: 'fullclear',
    description: 'Lösche alle Nachrichten in diesem Kanal',
    permission: 'Administrator',
    default_member_permissions: PermissionFlagsBits.Administrator,

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        interaction.deferReply({ ephemeral: true })

        let messagesToDelete = await interaction.channel.messages.fetch({ limit: 100 })

        while (messagesToDelete.size > 0) {
            const promise = messagesToDelete.map(message => {
                if (message.deletable) return message.delete().catch(err => console.log(err))
            })

            await Promise.all(promise)

            messagesToDelete = await interaction.channel.messages.fetch({ limit: 100 })
        }

        interaction.editReply('Channel cleared!')
    }
};
