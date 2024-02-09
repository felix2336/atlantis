const { Client, CommandInteraction, EmbedBuilder, InteractionType, Colors, Collection } = require("discord.js");
const fs = require('fs')
const devs = [
    '773072144304963624',
    '731990066158895175'
]
module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription(`${msgconfig.errors.command}`)
                        .setColor(Colors.Red)
                ], ephemeral: true
            }) && client.commands.delete(interaction.commandName);

            if (command.dev && !command.permission && !devs.some(dev => interaction.user.id == dev)) {
                return interaction.reply({ content: 'Dieser befehl ist nur für den Dev des Bots gedacht!', ephemeral: true });
            } else if (command.dev && devs.some(dev => interaction.user.id == dev)) {
                command.execute(interaction, client)
                return
            }

            if (!interaction.guild.members.cache.get(`${client.user.id}`).permissions.has(command.permission)) return interaction.reply({ content: `Ich besitze nicht genügend Berechtigungen dafür!`, ephemeral: true }).catch((err) => console.error(err.message));
            if (!interaction.member.permissions.has(`${command.permission}`)) return interaction.reply({ content: `Du besitzt nicht genügend Berechtigungen für diesen Command!`, ephemeral: true }).catch((err) => console.error(err.message));
            command.execute(interaction, client);

        }
    }
}