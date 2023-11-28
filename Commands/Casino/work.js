const { CommandInteraction, Client, EmbedBuilder } = require('discord.js')
const Casino = require('../../Schemas/casino')
const Cooldowns = require('../../Schemas/cooldowns')

module.exports = {
    name: 'work',
    description: 'Gehe arbeiten für ein Wenig Geld',
    dev: true,

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client){
        let CD;
        CD = await Cooldowns.findOne({user: interaction.user.id})
        if (CD && CD.work) {
            const lastExecute = CD.work
            const now = Date.now();
            const cooldownTime = 3600000 //1 Stunde

            const timestamp = Math.floor((lastExecute + cooldownTime) / 1000)
            if (now - lastExecute < cooldownTime){
                const embed = new EmbedBuilder({
                    title: 'Arbeit fehlgeschlagen',
                    description: `Du kannst erneut arbeiten <t:${timestamp}:R>`,
                    color: 0xff1414
                })
                interaction.reply({embeds: [embed]})
                return;
            };
        }
        if(!CD){
            CD = await Cooldowns.create({
                user: interaction.user.id,
                crime: Number,
                work: Number,
                rob: Number,
                daily: Number
            })
        }
        CD.work = Date.now()
        await CD.save()
        
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