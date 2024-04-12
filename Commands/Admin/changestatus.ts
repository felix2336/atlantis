import {Client, CommandInteraction, SlashCommandBuilder, PermissionFlagsBits} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('changestatus')
        .setDescription('Ändere den Status des Bots')
        .setDefaultMemberPermissions(0),

    async execute(interaction: CommandInteraction, client: Client){
    }
}