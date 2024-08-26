import { Button } from 'dcbot'
import { ButtonInteraction } from 'discord.js'

export default new Button({
    id: 'ce_delete',

    async execute(interaction: ButtonInteraction) {
        if (interaction.user.username != interaction.message.embeds[0].author!.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        }

        await interaction.message.delete()
        interaction.reply({ content: 'Das Embed wurde erfolgreich gelöscht', ephemeral: true })
    }
})