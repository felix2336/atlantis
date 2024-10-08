import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js'
const allowed = [
    '773072144304963624',
    '1196808890227118201',
    '1035799257409667102'
]
export default new Button({
    id: 'decline',

    async execute(interaction: ButtonInteraction) {
        if (allowed.some(id => interaction.user.id == id)) {
            const modal = new ModalBuilder({
                customId: 'decline',
                title: 'Abmeldung ablehnen'
            })

            const reason = new TextInputBuilder({
                customId: 'reason',
                label: 'Grund',
                required: false,
                maxLength: 1024,
                style: TextInputStyle.Paragraph
            })

            const row = new ActionRowBuilder<TextInputBuilder>().addComponents(reason)
            modal.addComponents(row)

            await interaction.showModal(modal)
        }
        else {
            interaction.reply({ content: 'Du darfst keine Abmeldungen ablehnen!', ephemeral: true })
            return
        }
    }
})