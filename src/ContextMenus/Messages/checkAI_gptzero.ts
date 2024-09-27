import { MessageContextMenu } from "dcbot";
import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from "discord.js";
import axios from 'axios'
import config from '../../System/config.json'

export default new MessageContextMenu({
    data: new ContextMenuCommandBuilder()
        .setName('Auf KI prüfen mit GPTZero')
        .setType(ApplicationCommandType.Message),

    async execute(interaction, client) {
        // Hier werden die Optionen für die API-Anfrage definiert
        const options = {
            method: 'POST',
            url: 'https://api.gptzero.me/v2/predict/text',
            headers: {
                'x-api-key': config.gptzero_ai_check_key,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            // Hier wird der Text definiert, der auf KI-Inhalte geprüft werden soll
            data: { document: interaction.targetMessage.content, version: '', multilingual: true }
        };

        try {
            // Hier wird die API-Anfrage gestartet und die Antwort geloggt
            const { data } = await axios.request(options);
            console.log(data);
        } catch (error) {
            // Hier wird der Fehler geloggt, wenn die API-Anfrage fehlschlägt
            console.error(error);
        }
    },
})
