const {CommandInteraction, ApplicationCommandOptionType} = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'addmoney',
    description: 'Füge dem Konto eines Users Geld hinzu',
    permission: 'Administrator',
    dev: true,
    options: [
        {
            name: 'amount',
            description: 'Wie viel Geld willst du dem Konto hinzufügen?',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'user',
            description: 'Wähle hier den User aus',
            type: ApplicationCommandOptionType.User
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction){
        const user = interaction.options.getUser('user') || interaction.user,
            amount = interaction.options.getNumber('amount');
        
            if(amount < 1) return interaction.reply({content: 'Deine Eingabe ist ungültig. (Sie darf nicht negativ oder 0 sein)', ephemeral: true})

        const User = await Casino.findOne({user: user.id});
        User.wallet += amount
        await User.save()
        interaction.reply({content: `Du hast ${user} erfolgreich 💰${amount} gegeben.`, ephemeral: true})
    }
}