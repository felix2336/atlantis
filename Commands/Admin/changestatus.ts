import {Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ActivityType} from 'discord.js'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('changestatus')
        .setDescription('Ändere den Status des Bots')
        .addStringOption(input => input.setName('status').setDescription('Gib hier den Status ein, den der Bot haben soll').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction){
        const customStatus = interaction.options.getString('status', true)
        interaction.client.user!.setActivity({
            type: ActivityType.Custom,
            name: 'customstatus',
            state: customStatus
        })
        interaction.reply({content: `Der Status wurde erfolgreich auf **${customStatus}** gesetzt`, ephemeral: true})
    }
}

export default command