import { SlashCommand } from "dcbot";
import { SlashCommandBuilder } from "discord.js";

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('dev-changenickname')
        .setDescription('Ändere den Nicknamen des Bots')
        .addStringOption(input => input.setName('username').setDescription('Gib hier den neuen Benutzernamen für den Bot ein').setRequired(true)),
    devOnly: true,
    async execute(interaction, client) {
        const newUsername = interaction.options.getString('username', true)

        await client.user!.setUsername(newUsername)
        await interaction.reply(`Der Username des Bots wurde erfolgreich auf **${newUsername}** gesetzt!`)
    },
})