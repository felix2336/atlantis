const { ModalSubmitInteraction, EmbedBuilder, Colors } = require('discord.js')

module.exports = {
    id: 'accept',

    /**
     * @param {ModalSubmitInteraction} interaction 
     */

    async execute(interaction) {
        const reason = interaction.fields?.getTextInputValue('accept_reason') || '*Kein Grund angegeben*'

        await interaction.deferReply({ephemeral: true})

        const userid = interaction.message.embeds[0].fields[0].value.split('@')[1].split('>')[0]
        const member = await interaction.guild.members.fetch(userid)
        if(!member) return interaction.editReply({content: 'Der User wurde nicht gefunden!'})

        const embed = new EmbedBuilder({
            title: 'Abmeldung akzeptiert',
            fields: [
                { name: 'Grund', value: reason }
            ],
            color: Colors.Green,
            timestamp: new Date()
        })

        member.roles.add('1201848061819891774')

        const dm = await member.createDM(true).catch(err => {
            console.error(err)
            interaction.editReply({content: 'Etwas ist schiefgelaufen'})
            return
        })
        await dm.send({ embeds: [embed] })
        await interaction.editReply({content: 'Die Abmeldung wurde erfolgreich genehmigt'})
        await interaction.message.delete()
    }
}