import { Modal } from 'dcbot'
import { ModalSubmitInteraction, } from 'discord.js'

export default new Modal({
    id: 'ce_send',

    async execute(interaction: ModalSubmitInteraction) {
        const id = interaction.fields.getTextInputValue('channel')
        //@ts-ignore
        const channel = interaction.guild.channels.cache.get(id)
        if (!channel) {
            interaction.reply({ content: 'Die angegebene ID führt zu keinem Channel auf diesem Server', ephemeral: true })
            return
        }
        //@ts-ignore
        const embed = interaction.message.embeds[0]
        await interaction.reply({ content: `Das Embed wird in ${channel} geschickt!`, ephemeral: true })
        //@ts-ignore
        await channel.send({ embeds: [embed] })
    }
})