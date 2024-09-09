import { Button } from "dcbot";

export default new Button({
    id: 'close-decline',

    async execute(interaction) {
        await interaction.reply({ content: 'okay', ephemeral: true })
        await interaction.message.delete()
    }
})