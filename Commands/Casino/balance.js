const { CommandInteraction, EmbedBuilder, Client, ApplicationCommandOptionType } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'balance',
    description: 'Lasse dir deinen Kontostand anzeigen',
    permission: 'SendMessages',
    cmdid: '1181332198016688180',
    options: [
        {
            name: 'user',
            description: 'Gib den User an, von dem du den KOntostand wissen möchtest',
            type: ApplicationCommandOptionType.User
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const target = interaction.options.getUser('user');
        let User;

        User = await Casino.findOne({ user: interaction.user.id })
        if (!User) {
            const embed = new EmbedBuilder({
                title: 'Dein Kontostand',
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
        if(target){
            const User = await Casino.findOne({user: target.id})
            if(!User) return interaction.reply({content: 'Dieser User hat momentan noch kein Geld', ephemeral: true})
            const embed = new EmbedBuilder({
                title: `Kontostand von ${target.displayName}`,
                fields: [
                    { name: 'Bargeld', value: `💰${User.wallet}` },
                    { name: 'Bankguthaben', value: `💰${User.bank}` },
                    { name: 'Gesamt', value: `💰${User.wallet + User.bank}` }
                ],
                color: 0xfca903
            })
            interaction.reply({embeds: [embed]})
            return
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