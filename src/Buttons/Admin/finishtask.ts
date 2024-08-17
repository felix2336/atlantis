import { Button } from 'dcbot'
import { ButtonInteraction, GuildMember } from 'discord.js'

export default new Button({
    id: 'taskfinished',

    async execute(interaction: ButtonInteraction) {
        const member = interaction.member as GuildMember
        if (!member.roles.cache.has('1146117778483450048')) {
            interaction.reply({ content: 'Dazu bist du nicht berechtigt', ephemeral: true })
            return
        }
        await interaction.message.delete().catch(err => {
            console.log(err)
            interaction.reply({ content: 'Etwas ist schiefgelaufen', ephemeral: true })
            return
        })

        interaction.reply({ content: 'Nice Nice, wieder eine Task weniger C:', ephemeral: true })
    }
})