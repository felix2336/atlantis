const { CommandInteraction, EmbedBuilder } = require('discord.js')
const Casino = require('../../Schemas/casino')
const Cooldowns = require('../../Schemas/cooldowns')
const cooldowns = new Map()

module.exports = {
    name: 'crime',
    description: 'Begehe ein Verbrechen für etwas Geld',
    permission: 'SendMessages',
    dev: true,

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        let CD
        CD = await Cooldowns.findOne({user: interaction.user.id})
        if(CD && CD.crime){
            const now = Date.now()
            const lastExecute = parseInt(CD.crime)
            const cooldownTime = 10800000 //3 Stunden

            const timestamp = Math.floor((lastExecute + cooldownTime) / 1000)
            if (now - lastExecute < cooldownTime) {
                const embed = new EmbedBuilder({
                    title: 'Plan gescheitert',
                    description: `Du musst dich erstmal versteckt halten, bevor du dein nächstes Verbrechen planst.\n<t:${timestamp}:R> kannst du wieder aus deiner Deckung kommen.`,
                    color: 0xff1414
                })
                interaction.reply({ embeds: [embed] })
                return;
            }
        }
        if(!CD){
            CD = await Cooldowns.create({
                user: interaction.user.id,
                crime: String,
                work: String,
                rob: String,
                daily: String
            })
        }
        CD.crime = Date.now()
        await CD.save()

        let User;
        User = await Casino.findOne({ user: interaction.user.id })
        if (!User) User = Casino.create({
            user: interaction.user.id,
            wallet: 0,
            bank: 0,
            inventory: {}
        })

        const chance = Math.floor(Math.random() * 100)
        if (chance < 75) {
            const income = Math.floor(Math.random() * 500)
            const incomeMessages = [
                `Du hast bei dem Technikladen ein paar Strassen weiter ein Handy mitgehen lassen und konntest es für 💰${income} weiterverkaufen.`,
            ]

            const embed = new EmbedBuilder({
                title: 'Erfolgreiches Verbrechen',
                description: incomeMessages[Math.floor(Math.random() * incomeMessages.length)],
                color: 0x77ff00
            })

            interaction.reply({embeds: [embed]})
            User.wallet += income
            await User.save()
            return
        }else{
            const fined = Math.floor(Math.random() * 500)
            const fineMessages = [
                `Du wurdest bei dem Versuch erwischt, ein Handy zu klauen und musstest 💰${fined} Strafe bezahlen.`
            ]

            const embed = new EmbedBuilder({
                title: 'Verbrechen fehlgeschlagen',
                description: fineMessages[Math.floor(Math.random() * fineMessages.length)],
                color: 0xff1414
            })
            interaction.reply({embeds: [embed]})
            User.wallet -= fined
            await User.save()
            return
        }
    }
}