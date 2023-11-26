const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const Casino = require('../../Schemas/casino')
const cooldowns = new Map()

module.exports = {
    name: 'rob',
    description: 'Versuche einem User etwas Geld zu stehlen (MAX 40%)',
    dev: true,
    options: [
        {
            name: 'target',
            description: 'Wähle hier den User aus, von dem du Geld stehlen möchtest',
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ],

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        if (cooldowns.has(`${interaction.user.id}_rob`)) {
            const lastExecute = cooldowns.get(`${interaction.user.id}_work`)
            const now = Date.now()
            const cooldownTime = 10800000 //3 Stunden

            const timestamp = Math.floor((lastExecute + cooldownTime) / 1000)
            if (now - lastExecute < cooldownTime) {
                const embed = new EmbedBuilder({
                    title: 'Plan gescheitert',
                    description: `Du musst dich erstmal versteckt halten, bevor du den nächsten um sein Geld erleichterst.\n<t:${timestamp}:R> kannst du dem nächsten sein Geld entwenden.`,
                    color: 0xff1414
                })
                interaction.reply({ embeds: [embed] })
                return;
            }

            const target = interaction.options.getUser('target')
            if (target.id == interaction.user.id) {
                const embed = new EmbedBuilder({
                    title: 'Plan gescheitert',
                    description: 'Du kannst dich nicht selber bestehlen',
                    color: 0xff1414
                })
                interaction.reply({ embeds: [embed] })
                return;
            }
            const Target = await Casino.findOne({ user: target.id })
            if (!Target || Target.wallet <= 0) {
                const embed = new EmbedBuilder({
                    title: 'Plan gescheitert',
                    description: `Du kannst <@${target.id}> kein Geld stehlen, weil er keins hat`,
                    color: 0xff1414
                })
                interaction.reply({ embeds: [embed] })
                return;
            }
            cooldowns.set(`${interaction.user.id}_rob`, Date.now())
            const User = await Casino.findOne({ user: interaction.user.id })
            const chance = Math.floor(Math.random() * 100)
            if (chance > 35) {
                const percentage = ((Math.random() * 40) / 100).toFixed(2)
                const robbed = Math.floor(Target.wallet * percentage)
                const embed = new EmbedBuilder({
                    title: 'Erfolgreicher Diebstahl',
                    description: `Du hast <@${target.id}> erfolgreich 💰${robbed} gestohlen`,
                    color: 0x77ff00
                })
                interaction.reply({embeds: [embed]})
                Target.wallet -= robbed
                User.wallet += robbed
                await Target.save()
                await User.save()
            }else{
                const percentage = ((Math.random() * 40) / 100).toFixed(2)
                const fined = Math.floor(User.wallet * percentage)
                const embed = new EmbedBuilder({
                    title: 'Diebstahl fehlgeschlagen',
                    description: `Du wurdest bei dem Versuch <@${target.id}> Geld zu stehlen erwischt und musstest 💰${fined} Strafe an ihn zahlen`,
                    color: 0xff1414
                })
                interaction.reply({embeds: [embed]})
                User.wallet -= fined
                Target.wallet += fined
                await User.save()
                await Target.save()
            }
        }
    }
}