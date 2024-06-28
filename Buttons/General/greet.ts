import { Button } from 'dcbot'
import { ButtonInteraction, Colors, EmbedBuilder } from 'discord.js'

export default new Button({
    id: 'greet',

    async execute(interaction: ButtonInteraction) {
        const embed = new EmbedBuilder({
            title: 'Neues Mitglied, neue Begrüßung',
            description: `${interaction.member} begrüßt unser neues Mitglied ${interaction.message.content}!`,
            color: Colors.DarkGrey
        })

        interaction.reply({ embeds: [embed] })
    }
})