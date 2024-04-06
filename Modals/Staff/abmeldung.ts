import { ModalSubmitInteraction, ButtonBuilder, ActionRowBuilder, EmbedBuilder, Colors, TextChannel } from 'discord.js'

export default {
    id: 'abmeldung',

    async execute(interaction: ModalSubmitInteraction) {
        const reason = interaction.fields.getTextInputValue('reason')
        const zeitraum = interaction.fields.getTextInputValue('zeitraum')
        const bemerkungen = interaction.fields?.getTextInputValue('bemerkungen')

        const channel = interaction.guild!.channels.cache.get('1201604935943475250') as TextChannel

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

        const row = new ActionRowBuilder().addComponents([
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
        // const ping = 'PINGS'
        const ping = '<@&1170957646942191688> <@&1181259236408311828>'
        //@ts-ignore
        await channel.send({ content: ping, embeds: [embed], components: [row] })
        await interaction.reply({ content: 'Dein Antrag auf Abmeldung wurde übermittelt!', ephemeral: true })
    }
}