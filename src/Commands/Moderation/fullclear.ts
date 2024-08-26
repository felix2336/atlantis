import { ChatInputCommandInteraction, Client, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType, SlashCommandBuilder, GuildTextBasedChannel } from 'discord.js';
import { SlashCommand } from 'dcbot';

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('fullclear')
        .setDescription('Lösche alle Nachrichten in diesem Kanal')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const channel = interaction.channel as GuildTextBasedChannel;
        await interaction.deferReply({ ephemeral: true })
        await interaction.editReply('Vorgang: ``Fetching Messages``')
        let messagesToDelete = await channel.messages.fetch({ limit: 100 })


        while (messagesToDelete.size > 0) {
            await interaction.editReply(`Vorgang: \`\`Deleting ${messagesToDelete.size} Messages\`\``)
            const promise = messagesToDelete.map(message => {
                if (message.deletable) {
                    setTimeout(() => {
                        return message.delete().catch(err => console.log(err))
                    }, 1500)
                }
            })

            await Promise.all(promise)
            await interaction.editReply(`Vorgang: \`\`Fetching Messages\`\``)
            messagesToDelete = await channel.messages.fetch({ limit: 100 })
        }

        await interaction.editReply('Channel cleared!').catch(err => console.log(err))
    }
})