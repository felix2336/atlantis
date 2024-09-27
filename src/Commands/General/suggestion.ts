import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction } from 'discord.js'
import { SlashCommand } from 'dcbot'

export default new SlashCommand({
    // Definition der SlashCommand-Daten
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('Reiche einen Vorschlag ein')
        .addNumberOption(input => input.setName('type').setDescription('Server oder Bot Vorschlag?').setChoices({ name: 'Server', value: 1 }, { name: 'Bot', value: 2 }).setRequired(true)),

    // Ausführung der SlashCommand-Funktion
    async execute(interaction: ChatInputCommandInteraction) {
        // Abrufen des Vorschlagstyps (1 = Server, 2 = Bot)
        const type = interaction.options.getNumber('type', true)

        // Erstellung eines Modals für die Eingabe des Vorschlags
        const modal = new ModalBuilder({
            title: 'Reiche einen Vorschlag ein',
            customId: 'suggestion',
        })

        // Definition des Eingabefelds für den Vorschlagstyp
        const typeInput = new TextInputBuilder({
            value: type.toString(),
            label: 'Art des Vorschlags (1 = Server | 2 = Bot)',
            maxLength: 1,
            required: true,
            style: TextInputStyle.Short,
            customId: 'type'
        })

        // Definition des Eingabefelds für den Vorschlag
        const suggestionInput = new TextInputBuilder({
            label: 'Dein Vorschlag',
            placeholder: 'Was möchtest du vorschlagen?',
            minLength: 5,
            required: true,
            style: TextInputStyle.Paragraph,
            customId: 'suggestion'
        })

        // Erstellung von ActionRows für die Eingabefelder
        const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents([typeInput])
        const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents([suggestionInput])

        // Hinzufügen der ActionRows zum Modal
        modal.addComponents(row1, row2)

        // Anzeigen des Modals
        await interaction.showModal(modal)
    }

})
