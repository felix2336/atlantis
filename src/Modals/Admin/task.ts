import { Modal } from 'dcbot'
import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, Client, ActionRowBuilder, Colors, TextChannel } from 'discord.js'

export default new Modal({
    id: 'taskmodal',

    // Funktion, die aufgerufen wird, wenn das Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Ermitteln des Titels und der Beschreibung der Aufgabe aus den Eingabefeldern des Modals
        const title = interaction.fields.getTextInputValue('tasktitle')
        const description = interaction.fields.getTextInputValue('taskdescription')

        // Ermitteln des Kanals, in dem die Aufgabe gepostet werden soll
        const channel = interaction.guild!.channels.cache.get('1200374840696246302') as TextChannel;
        if (!channel) {
            // Fehlermeldung, wenn der Kanal nicht existiert
            interaction.reply({ content: 'Der Dev Task Channel existiert nicht mehr. Bitte aktualisiere ihn im Code!', ephemeral: true })
            return
        }

        // Erstellen der Buttons für die Aufgabe
        const finishButton = new ButtonBuilder({
            label: 'Erledigt',
            customId: 'taskfinished',
            style: 3
        })
        const claimButton = new ButtonBuilder({
            label: 'Übernehmen',
            customId: 'taskclaim',
            style: 1
        })

        // Erstellen einer Zeile für die Buttons
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([finishButton, claimButton])

        // Erstellen des Embeds für die Aufgabe
        const embed = new EmbedBuilder({
            title: title,
            description: description,
            timestamp: new Date(),
            color: Colors.DarkPurple
        })

        // Posten der Aufgabe im Kanal
        const message = await channel.send({ content: '<@&1146117778483450048>', embeds: [embed], components: [row] })
        // Pinning der Nachricht
        await message.pin()
        // Bestätigungsnachricht an den Benutzer
        interaction.reply({ content: 'Die Aufgabe wurde erfolgreich übermittelt', ephemeral: true })
    }
})
