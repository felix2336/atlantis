const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const Warns = require('../../Schemas/warns')

module.exports = {
    name: "warns",
    description: 'Lasse dir die Warns eines User anzeigen',
    permission: 'Administrator',
    dev: true,
    options: [
        {
            name: 'user',
            description: 'Von welchem User möchtest du die Warns sehen?',
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const target = interaction.options.getUser('user')
        const Warn = await Warns.findOne({ user: target.id })
        if (!Warn || Warn.warns.length == 0) {
            const embed = new EmbedBuilder({
                title: 'Warns',
                fields: [
                    { name: '**User**', value: `${target}` },
                    { name: '**Warns**', value: 'Für diesen User wurden keine Warnungen gefunden' }
                ],
                timestamp: Date.now(),
                color: 0xff9900
            })

            await interaction.reply({ embeds: [embed] })
        } else {
            const embed = new EmbedBuilder({
                title: 'Warns',
                fields: [
                    { name: '**User**', value: `${target}` },
                    {
                        name: '**Warns**', value: `${Warn.warns
                            .map((value, index) => {
                                index++
                                return `${index}. ${value}`
                            })
                            .join('\n')}`
                    }
                ],
                timestamp: Date.now(),
                color: 0xff9900
            })
            interaction.reply({ embeds: [embed] })
        }
    }
}