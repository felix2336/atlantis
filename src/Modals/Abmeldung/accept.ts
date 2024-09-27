import { ModalSubmitInteraction, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, DMChannel } from 'discord.js'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'accept',

    // Funktion, die aufgerufen wird, wenn das Modal ausgeführt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Grund für die Abmeldung aus dem Modal auslesen
        const reason = interaction.fields?.getTextInputValue('accept_reason') || '*Kein Grund angegeben*'

        // Antwort auf die Interaktion verzögern, um die Verarbeitung zu ermöglichen
        await interaction.deferReply({ ephemeral: true })

        // ID des Benutzers aus dem Embed auslesen
        const userid = interaction.message!.embeds[0].fields[0].value.split('@')[1].split('>')[0]
        // Benutzer aus der Guild auslesen
        const member = await interaction.guild!.members.fetch(userid)
        if (!member) {
            // Fehlermeldung, wenn der Benutzer nicht gefunden wird
            interaction.editReply({ content: 'Der User wurde nicht gefunden!' })
            return
        }

        // Embed für die Benachrichtigung erstellen
        const embed = new EmbedBuilder({
            title: 'Abmeldung akzeptiert',
            fields: [
                { name: 'Grund', value: reason }
            ],
            color: Colors.Green,
            timestamp: new Date()
        })

        // Rolle zuweisen
        member.roles.add('1201848061819891774')

        // Direktnachricht an den Benutzer senden
        const dm = await member.createDM(true).catch(err => {
            console.error(err)
            interaction.editReply({ content: 'Etwas ist schiefgelaufen' })
            return
        })
        if (!(dm instanceof DMChannel)) return;
        await dm.send({ embeds: [embed] })
        // Erfolgsmeldung senden
        await interaction.editReply({ content: 'Die Abmeldung wurde erfolgreich genehmigt' })
        // Button für die Genehmigung erstellen
        const button = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                label: 'Genehmigt',
                style: 3,
                customId: '2',
                disabled: true
            })])

        // Embed aktualisieren
        const emb = interaction.message!.embeds[0]
        emb.fields.push({ name: 'Akzeptiert - Grund:', value: reason })
        await interaction.message!.edit({ embeds: [emb], components: [button] })

    }
})
