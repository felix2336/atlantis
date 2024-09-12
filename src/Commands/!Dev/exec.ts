import {SlashCommand} from 'dcbot'
import {SlashCommandBuilder, PermissionFlagsBits} from 'discord.js'
import {exec} from 'child_process'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('exec')
        .setDescription('Führe einen Befehl am Server aus')
        .addStringOption(input => input.setName('command').setDescription('Gib hier den Command ein').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    devOnly: true,
    async execute(interaction, client) {
        const command = interaction.options.getString('command')
        exec(command, async (error, stdout, stderr) => {
            if(error) {
                await interaction.reply({content: `Folgender Fehler ist aufgetreten: \n\n${error.message}`, ephemeral: true})
            }
            if(stdout) {
                await interaction.reply({content: `${stdout}`, ephemeral: true})
            }
        })
    }
})