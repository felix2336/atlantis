const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'slot',
    description: 'Spiele an einem Spielautomaten, um mit etwas Glück etwas Geld zu gewinnen',
    permission: 'SendMessages',
    cmdid: '1181332198016688185',
    dev: true,
    options: [
        {
            name: 'bet',
            description: 'Wie viel Geld möchtest du verwenden?',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const bet = interaction.options.getNumber('bet')
        let User;
        User = await Casino.findOne({ user: interaction.user.id });
        if (!User || User.wallet <= 0 || bet > User.wallet) {
            const embed = new EmbedBuilder({
                title: 'Spiel fehlgeschlagen',
                description: 'Du hast nicht so viel Geld, wie du einsetzen möchtest!',
                color: 0xff1414,
            })
            interaction.reply({ embeds: { embed } })
            return;
        }

        const symbols = ['💰', '🤑', '💸', '💯'];
        const result = []
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * symbols.length)
            result.push(symbols[randomIndex])
        }

        const isWin = result[0] == result[1] && result[1] == result[2]
        const winnings = isWin ? bet * 2 : 0

        User.wallet = User.wallet - bet + winnings
        await User.save()

        if (winnings == 0) {
            const embed = new EmbedBuilder({
                title: 'Leider verloren',
                description: `Du hast 💰${bet} durch folgendes Ergebnis verloren:\n${result.join(' | ')}`,
                color: 0xff1414
            })
            interaction.reply({embeds: [embed]})
            return
        } else {
            const embed = new EmbedBuilder({
                title: 'Herzlichen Glückwunsch',
                description: `Du hast ${winnings} durch folgendes Ergebnis gewonnen:\n${result.join(' | ')}`,
                color: 0x77ff00
            })
            interaction.reply({embeds: [embed]})
            return
        }
    }
}