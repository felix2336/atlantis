const { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Colors } = require('discord.js')

module.exports = {
    id: 'decline',

    /**
     * @param {ModalSubmitInteraction} interaction 
     */

    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true })

        const userid = interaction.message.embeds[0].fields[0].value.split('@')[1].split('>')[0]
        const reason = interaction.fields?.getTextInputValue('reason') || '*Kein Grund angegeben*'

        const member = interaction.guild.members.cache.get(userid)

        const embed = new EmbedBuilder({
            title: 'Abmeldung abgelehnt',
            fields: [
                { name: 'Grund', value: reason }
            ],
            color: Colors.Red,
            timestamp: new Date()
        })

        const dm = await member.createDM(true).catch(err => {
            console.error(err)
            interaction.editReply({ content: 'Etwas ist schiefgelaufen' })
            return
        })
        await dm.send({ embeds: [embed] })
        interaction.editReply({ content: 'Die Abmeldung wurde erfolgreich abgelehnt' })
        await interaction.message.edit({ components: [new ActionRowBuilder().addComponents([new ButtonBuilder({ label: 'Nicht genehmigt', style: 4, customId: '1', disabled: true })])] })

    }
}