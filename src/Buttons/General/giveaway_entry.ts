import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { Giveaway } from "../../contents";
import { Button } from 'dcbot'
import { readFileSync, writeFileSync } from 'fs'

export default new Button( {
    id: 'giveaway_entry',

    async execute(interaction, client) {
        let giveaways = JSON.parse(readFileSync('./JSON/giveaways.json', 'utf8')) as Giveaway[]
        const giveaway = giveaways.find(g => g.messageId == interaction.message.id)
        if (!giveaway) {
            interaction.reply({ content: 'Dieses Giveaway konnte nicht gefunden werden!', ephemeral: true });
            return
        } 

        const embed = EmbedBuilder.from(interaction.message.embeds[0])

        if (giveaway.participants.find(p => p == interaction.user.id)) {
            interaction.reply({ content: 'Du nimmst bereits an diesem Gewinnspiel Teil', ephemeral: true })
            return
        } 
        giveaway.participants.push(interaction.user.id)
        giveaways = giveaways.filter(g => g.messageId != giveaway.messageId)
        giveaways.push(giveaway)
        embed.data.fields![0].value = giveaway.participants.length.toString()
        await interaction.message.edit({ embeds: [embed] })
        interaction.reply({ content: 'Deine Teilnahme an dem Gewinnspiel war erfolgreich!', ephemeral: true })
        writeFileSync('./JSON/giveaways.json', JSON.stringify(giveaways, null, 2))
    },
})