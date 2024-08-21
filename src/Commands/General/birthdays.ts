import { SlashCommand } from "dcbot";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Birthdays from "../../Schemas/birthdays";

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName("birthdays")
        .setDescription('Liste Alle Geburtstage auf'),

    async execute(interaction, client) {
        await interaction.deferReply()
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
        const birthdays = await Birthdays.find()
        for (const birthday of birthdays) {
            const { userId, month, day } = birthday
            const field = embed.data.fields![month - 1]
            field.value += `<@${birthday.userId}> - ${birthday}.${month < 10 ? `0${month}` : month}`
        }

        await interaction.editReply({ embeds: [embed] })
    }
})