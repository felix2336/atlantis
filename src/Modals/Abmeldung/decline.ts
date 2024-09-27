import { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Colors, GuildMember, DMChannel } from 'discord.js'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'decline',

    async execute(interaction: ModalSubmitInteraction) {

        // Antwort auf die Interaktion verzögern, um die Verarbeitung zu ermöglichen
        await interaction.deferReply({ ephemeral: true })

        // Die User-ID aus dem Embed-Feld extrahieren
        const userid = interaction.message!.embeds[0].fields[0].value.split('@')[1].split('>')[0]
        // Den Grund für die Ablehnung aus dem Modal-Feld extrahieren
        const reason = interaction.fields?.getTextInputValue('reason') || '*Kein Grund angegeben*'

        // Den GuildMember anhand der User-ID aus dem Cache abrufen
        const member = interaction.guild!.members.cache.get(userid) as GuildMember

        // Ein Embed für die Ablehnung erstellen
        const embed = new EmbedBuilder({
            title: 'Abmeldung abgelehnt',
            fields: [
                { name: 'Grund', value: reason }
            ],
            color: Colors.Red,
            timestamp: new Date()
        })

        // Eine Direktnachricht an den Mitglied erstellen
        const dm = await member.createDM()
            .catch(err => {
                // Fehlermeldung ausgeben, wenn die Erstellung der Direktnachricht fehlschlägt
                console.error(err)
                interaction.editReply({ content: 'Etwas ist schiefgelaufen' })
                return
            })

        // Überprüfen, ob die Direktnachricht erfolgreich erstellt wurde
        if (!(dm instanceof DMChannel)) return;
        // Die Ablehnungsnachricht an den Mitglied senden
        await dm.send({ embeds: [embed] })
        // Bestätigungsnachricht an den Anwender senden
        interaction.editReply({ content: 'Die Abmeldung wurde erfolgreich abgelehnt' })
        // Ein Button für die Ablehnung erstellen
        const button = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                label: 'Abgelehnt',
                style: 4,
                customId: '1',
                disabled: true
            })])

        // Das ursprüngliche Embed abrufen
        const emb = interaction.message!.embeds[0]
        // Ein neues Feld für den Ablehnungsgrund hinzufügen
        emb.fields.push({ name: 'Abgelehnt - Grund:', value: reason })
        // Das ursprüngliche Embed mit dem neuen Feld und dem Button aktualisieren
        await interaction.message!.edit({ embeds: [emb], components: [button] })

    }
})
