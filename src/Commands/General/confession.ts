import { SlashCommandBuilder, ChatInputCommandInteraction, Client, ModalBuilder, ActionRowBuilder, TextInputBuilder } from 'discord.js'
import { SlashCommand } from 'dcbot'

// Definiere eine neue SlashCommand-Instanz
export default new SlashCommand({
    // Definiere die Daten für die SlashCommand
    data: new SlashCommandBuilder()
        .setName('beichte') // Setze den Namen der SlashCommand
        .setDescription('Erstelle eine anonyme Beichte'), // Setze die Beschreibung der SlashCommand

    // Definiere die Ausführungsmethode für die SlashCommand
    async execute(interaction, client) {
        // Erstelle ein neues Modal-Fenster für die anonyme Beichte
        const modal = new ModalBuilder({
            title: 'Anonyme Beichte', // Setze den Titel des Modal-Fensters
            customId: 'confession', // Setze die ID des Modal-Fensters
            components: [
                // Erstelle eine neue Zeile für die Eingabe der Beichte
                new ActionRowBuilder<TextInputBuilder>({
                    components: [
                        // Erstelle ein neues Texteingabefeld für die Beichte
                        new TextInputBuilder({
                            customId: 'confession', // Setze die ID des Texteingabefelds
                            label: 'Deine Beichte', // Setze den Label des Texteingabefelds
                            required: true, // Mache das Texteingabefeld erforderlich
                            style: 2 // Setze den Stil des Texteingabefelds auf PARAGRAPH
                        })
                    ]
                })
            ]
        })

        // Zeige das Modal-Fenster an
        await interaction.showModal(modal)
    }
})
