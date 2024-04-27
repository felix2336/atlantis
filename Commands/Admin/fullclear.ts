import { CommandInteraction, Client, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType, SlashCommandBuilder, GuildTextBasedChannel } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('fullclear')
        .setDescription('Lösche alle Nachrichten in diesem Kanal')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction, client: Client) {
        const channel = interaction.channel as GuildTextBasedChannel;
        interaction.deferReply({ ephemeral: true })

        let messagesToDelete = await channel.messages.fetch({ limit: 100 })

        while (messagesToDelete.size > 0) {
            const promise = messagesToDelete.map(message => {
                if (message.deletable) return message.delete().catch(err => console.log(err))
            })

            await Promise.all(promise)

            messagesToDelete = await channel.messages.fetch({ limit: 100 })
        }

        interaction.editReply('Channel cleared!').catch(err => console.log(err))
    }
};
