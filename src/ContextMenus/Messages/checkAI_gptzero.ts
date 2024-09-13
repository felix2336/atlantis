import { MessageContextMenu } from "dcbot";
import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from "discord.js";
import axios from 'axios'
import config from '../../System/config.json'

export default new MessageContextMenu({
    data: new ContextMenuCommandBuilder()
        .setName('Auf KI prüfen mit GPTZero')
        .setType(ApplicationCommandType.Message),

    async execute(interaction, client) {
        const options = {
            method: 'POST',
            url: 'https://api.gptzero.me/v2/predict/text',
            headers: {
                'x-api-key': config.gptzero_ai_check_key,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: { document: 'string', version: '', multilingual: true }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    },
})