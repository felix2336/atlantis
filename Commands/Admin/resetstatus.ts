import {SlashCommandBuilder, CommandInteraction, Client, PermissionFlagsBits, ActivityType} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('resetstatus')
        .setDescription('Setze den Status des Bots auf den Standard zurück')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction){
        interaction.client.user!.setActivity({ type: ActivityType.Competing, name: 'Atlantis Lounge' })
        interaction.reply({content: 'Der Status wurde zurückgesetzt!', ephemeral: true})
    }
}