import {PermissionFlagsBits, SlashCommandBuilder} from 'discord.js'
import { SlashCommand } from '../../contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('fetch-members')
        .setDescription('Fetche alle User des Servers')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const members = client.users.cache.size
        await interaction.deferReply({ephemeral: true})
        await interaction.guild!.members.fetch()
        await interaction.editReply(`Member gefetcht!\n**Vorher:** ${members}\n**Nachher:** ${client.users.cache.size}`)
    }
}

export default command