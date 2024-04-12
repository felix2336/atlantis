import { ButtonInteraction } from 'discord.js'

export default {
    id: 'ce_delete',

    async execute(interaction: ButtonInteraction){
        //@ts-ignore
        if(interaction.user.username != interaction.message.embeds[0].author.name) return interaction.reply({content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true})
        
        await interaction.message.delete()
        interaction.reply({content: 'Das Embed wurde erfolgreich gelöscht', ephemeral: true})
    }
}