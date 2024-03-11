const { Client, CommandInteraction, EmbedBuilder, InteractionType, Colors, Collection } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
            const menu = client.menus.get(interaction.commandName);
            menu.execute(interaction, client);
        }
    }
}