import { ModalSubmitInteraction, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, DMChannel } from 'discord.js'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'accept',

    async execute(interaction: ModalSubmitInteraction) {
        const reason = interaction.fields?.getTextInputValue('accept_reason') || '*Kein Grund angegeben*'

        await interaction.deferReply({ ephemeral: true })

        const userid = interaction.message!.embeds[0].fields[0].value.split('@')[1].split('>')[0]
        const member = await interaction.guild!.members.fetch(userid)
        if (!member) {
            interaction.editReply({ content: 'Der User wurde nicht gefunden!' })
            return
        }

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
            interaction.editReply({ content: 'Etwas ist schiefgelaufen' })
            return
        })
        if (!(dm instanceof DMChannel)) return;
        await dm.send({ embeds: [embed] })
        await interaction.editReply({ content: 'Die Abmeldung wurde erfolgreich genehmigt' })
        const button = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                label: 'Genehmigt',
                style: 3,
                customId: '2',
                disabled: true
            })])

        const emb = interaction.message!.embeds[0]
        emb.fields.push({ name: 'Akzeptiert - Grund:', value: reason })
        //@ts-ignore
        await interaction.message!.edit({ embeds: [emb], components: [button] })

    }
})