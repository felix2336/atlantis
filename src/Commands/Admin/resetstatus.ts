import {SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, ActivityType} from 'discord.js'
import { SlashCommand } from 'dcbot'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('resetstatus')
        .setDescription('Setze den Status des Bots auf den Standard zurück')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction){
        interaction.client.user!.setActivity({ type: ActivityType.Competing, name: 'Atlantis Lounge' })
        interaction.reply({content: 'Der Status wurde zurückgesetzt!', ephemeral: true})
    }
})
