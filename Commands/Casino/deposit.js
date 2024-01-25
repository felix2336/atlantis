const {CommandInteraction, EmbedBuilder, ApplicationCommandOptionType} = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'deposit',
    description: 'Zahle Geld auf dein Bankkonto ein',
    permission: 'SendMessages',
    cmdid: '1181332198016688183',
    dev: true,
    options: [
        {
            name: 'amount',
            description: 'Wie viel möchtest du einzahlen? (-1 für alles)',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction){
        let User;
        User = await Casino.findOne({user: interaction.user.id})

        if(!User || User.wallet <= 0) {
            const embed = new EmbedBuilder({
                title: 'Einzahlung fehlgeschlagen',
                description: 'Du kannst kein Geld auf deine Bank einzahlen, weil du kein Bargeld hast.',
                color: 0xff1414
            })
            interaction.reply({embeds: [embed]})
            return;
        }
        let amount = interaction.options.getNumber('amount')
        if(amount > User.wallet){
            const embed = new EmbedBuilder({
                title: 'Einzahlung fehlgeschlagen',
                description: 'Du willst mehr Geld einzahlen, als du hast.',
                color: 0xff1414
            })
            interaction.reply({embeds: [embed]})
            return;
        }
        else if(amount == -1) amount = User.wallet
        
        User.wallet -= amount
        User.bank += amount
        await User.save()


        const embed = new EmbedBuilder({
            title: 'Einzahlung erfolgreich',
            description: `Du hast erfolgreich 💰${amount} auf dein Bankkonto eingezahlt.`,
            color: 0x77ff00
        })
        interaction.reply({embeds: [embed]})
    }
}