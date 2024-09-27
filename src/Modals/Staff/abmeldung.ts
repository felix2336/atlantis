import { Modal } from 'dcbot'
import { ButtonBuilder, ActionRowBuilder, EmbedBuilder, TextChannel } from 'discord.js'

export default new Modal({
    // ID des Modals
    id: 'abmeldung',

    // Funktion, die ausgeführt wird, wenn der Modal ausgeführt wird
    async execute(interaction) {
        // Eingabe des Grundes für die Abmeldung
        const reason = interaction.fields.getTextInputValue('reason')
        // Eingabe des Zeitraums für die Abmeldung
        const zeitraum = interaction.fields.getTextInputValue('zeitraum')
        // Eingabe von eventuellen Bemerkungen
        const bemerkungen = interaction.fields?.getTextInputValue('bemerkungen')

        // Abrufen des Kanals, in dem die Abmeldung gesendet werden soll
        const channel = interaction.guild!.channels.cache.get('1201604935943475250') as TextChannel

        // Erstellung eines Embeds für die Abmeldung
        const embed = new EmbedBuilder({
            title: 'Antrag auf Abmeldung',
            fields: [
                { name: 'Antragsteller', value: `${interaction.member}` },
                { name: 'Grund', value: reason },
                { name: 'Zeitraum', value: zeitraum },
                { name: 'Bemerkungen', value: bemerkungen || '*Keine weiteren Anmerkungen*' }
            ],
            timestamp: new Date(),
            color: 0xe62731
        })

        // Erstellung einer Reihe von Buttons für die Abmeldung
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                label: 'Akzeptieren',
                style: 3,
                customId: 'accept',
                emoji: '✅'
            }),
            new ButtonBuilder({
                label: 'Ablehnen',
                style: 4,
                customId: 'decline',
                emoji: '📛'
            })
        ])

        // Ping für die Rolle, die die Abmeldung bearbeiten soll
        const ping = '<@&1170957646942191688> <@&1181259236408311828>'

        // Senden der Abmeldung im Kanal
        await channel.send({ content: ping, embeds: [embed], components: [row] })

        // Antwort an den Nutzer, dass die Abmeldung übermittelt wurde
        await interaction.reply({ content: 'Dein Antrag auf Abmeldung wurde übermittelt!', ephemeral: true })
    }
})
