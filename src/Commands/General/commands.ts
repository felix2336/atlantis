import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, Colors, AutoModerationActionExecution } from 'discord.js'
import { SlashCommand } from 'dcbot'
import { MyClient } from 'contents'

/**
 * Ein neuer Slash-Befehl, der alle verfügbaren Befehle auflistet.
 */
export default new SlashCommand<MyClient>({
    /**
     * Die Daten des Befehls, wie Name und Beschreibung.
     */
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Gibt alle Slash Commands des Bots wieder'),

    /**
     * Die Funktion, die aufgerufen wird, wenn der Befehl ausgeführt wird.
     * @param interaction Die Interaktion, die den Befehl ausgelöst hat.
     * @param client Der Client, der den Befehl ausführt.
     */
    async execute(interaction, client) {
        /**
         * Ein Embed, das die Liste der Befehle enthält.
         */
        const embed = new EmbedBuilder({
            title: 'Slash Commands',
            /**
             * Die Beschreibung des Embeds, die die Liste der Befehle enthält.
             * Die Befehle werden sortiert und durch Zeilenumbrüche getrennt.
             */
            description: `\`${client.commands.map((c, k) => `/${k} - ${c.data.description}`).sort().join('\`\n\n\`')}\``,
            color: Colors.Gold
        })

        /**
         * Die Antwort auf die Interaktion, die das Embed enthält.
         */
        await interaction.reply({ embeds: [embed] })
    }
})
