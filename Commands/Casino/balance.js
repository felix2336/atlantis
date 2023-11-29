const { CommandInteraction, EmbedBuilder, Client } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'balance',
    description: 'Lasse dir deinen Kontostand anzeigen',
    permission: 'SendMessages',
    dev: true,

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        let User;

        User = await Casino.findOne({ user: interaction.user.id })
        if (!User) {
            const embed = new EmbedBuilder({
                title: 'Kontostand',
                fields: [
                    { name: 'Bargeld', value: '💰0' },
                    { name: 'Bankguthaben', value: '💰0' },
                    { name: 'Gesamt', value: '💰0' }
                ],
                color: 0xfca903
            })
            interaction.reply({ embeds: [embed] })
            return;
        }

        const embed = new EmbedBuilder({
            title: 'Kontostand',
            fields: [
                { name: 'Bargeld', value: `💰${User.wallet}` },
                { name: 'Bankguthaben', value: `💰${User.bank}` },
                { name: 'Gesamt', value: `💰${User.wallet + User.bank}` }
            ],
            color: 0xfca903
        })

        interaction.reply({ embeds: [embed] })
    }
}