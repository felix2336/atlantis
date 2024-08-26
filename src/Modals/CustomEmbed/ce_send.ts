import { Modal } from 'dcbot'
import { EmbedBuilder, GuildTextBasedChannel, ModalSubmitInteraction, } from 'discord.js'

export default new Modal({
    id: 'ce_send',

    async execute(interaction: ModalSubmitInteraction) {
        const id = interaction.fields.getTextInputValue('channel')
        const channel = interaction.guild!.channels.cache.get(id) as GuildTextBasedChannel
        if (!channel) {
            interaction.reply({ content: 'Die angegebene ID führt zu keinem Channel auf diesem Server', ephemeral: true })
            return
        }
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        await interaction.reply({ content: `Das Embed wird in ${channel} geschickt!`, ephemeral: true })
        await channel.send({ embeds: [embed] })
    }
})