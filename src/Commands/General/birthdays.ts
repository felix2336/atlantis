import { SlashCommand } from "dcbot";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Birthdays from "../../Schemas/birthdays";

/**
 * Befehl zum Auflisten aller Geburtstage.
 */
export default new SlashCommand({
    /**
     * Definition des Befehls.
     */
    data: new SlashCommandBuilder()
        .setName("birthdays")
        .setDescription('Liste Alle Geburtstage auf'),

    /**
     * Funktion, die aufgerufen wird, wenn der Befehl ausgeführt wird.
     * @param interaction - Die Interaktion, die den Befehl ausgelöst hat.
     * @param client - Der Client, der den Befehl ausführt.
     */
    async execute(interaction, client) {
        // Antwort auf die Interaktion verzögern, um die Verarbeitung anzuzeigen.
        await interaction.deferReply()

        // Erstellen eines Embeds, um die Geburtstage anzuzeigen.
        const embed = new EmbedBuilder({
            title: 'Geburtstage',
            description: 'Hier sind alle Geburtstage aufgelistet',
            fields: [
                { name: 'Januar', value: '' },
                { name: 'Februar', value: '' },
                { name: 'März', value: '' },
                { name: 'April', value: '' },
                { name: 'Mai', value: '' },
                { name: 'Juni', value: '' },
                { name: 'Juli', value: '' },
                { name: 'August', value: '' },
                { name: 'September', value: '' },
                { name: 'Oktober', value: '' },
                { name: 'November', value: '' },
                { name: 'Dezember', value: '' }
            ]
        })

        // Alle Geburtstage aus der Datenbank abrufen.
        const birthdays = await Birthdays.find()

        // Durchlaufen aller Geburtstage und Hinzufügen zu den entsprechenden Feldern im Embed.
        for (const birthday of birthdays) {
            const { userId, month, day } = birthday
            const field = embed.data.fields![month - 1]
            field.value += `<@${birthday.userId}> - ${day}.${month < 10 ? `0${month}` : month}`
        }

        // Antwort auf die Interaktion mit dem Embed senden.
        await interaction.editReply({ embeds: [embed] })
    }
})
