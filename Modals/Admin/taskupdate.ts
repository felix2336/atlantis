import { Modal } from 'dcbot'
import { ModalSubmitInteraction } from 'discord.js'

export default new Modal({
    id: 'update_task',

    async execute(interaction: ModalSubmitInteraction) {
        const update = interaction.fields.getTextInputValue('update')

        await interaction.reply({ content: 'Das Update wurde gepostet', ephemeral: true })

        interaction.message!.embeds[0].fields.push({ name: `Update vom ${new Date().toLocaleDateString('de')}`, value: update })
        await interaction.message!.edit({ embeds: [interaction.message!.embeds[0]] })
    }
})