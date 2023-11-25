const { CommandInteraction, Client, EmbedBuilder } = require('discord.js')
const Casino = require('../../Schemas/casino')
const cooldowns = new Map()

module.exports = {
    name: 'work',
    description: 'Gehe arbeiten für ein Wenig Geld',
    dev: true,

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client){
        const income = Math.floor(Math.random() * 100)
        const messages = [
            `Du hast im REWE um die Ecke geholfen, die Regale aufzufüllen und hast 💰${income} erhalten`,
        ]

        const embed = new EmbedBuilder({
            title: 'Erfolgreiche Arbeit',
            description: messages[Math.floor(Math.random() * messages.length)],
            color: 0x77ff00,
        })

        let User;
        User = await Casino.findOne({user: interaction.user.id})
        if(!User){
            User = await Casino.create({
                user: interaction.user.id,
                wallet: 0,
                bank: 0,
                inventory: {}
            })
        }

        User.wallet += income
        await User.save()
        interaction.reply({embeds: [embed]})
    }
}