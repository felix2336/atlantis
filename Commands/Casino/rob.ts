import { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder, User } from 'discord.js'
import Casino from '../../Schemas/casino'
import Cooldowns from '../../Schemas/cooldowns'

export default {
    data: new SlashCommandBuilder()
    .setName('rob')
    .setDescription('Versuche einem user etwas Geld zu stehlen (MAX 40% des Guthabens)')
    .addUserOption(input => input.setName("target").setDescription("Der User den du ausrauben möchtest").setRequired(true)),

    async execute(interaction: CommandInteraction) {
        const target = interaction.options.getUser('target') as User
        if (target.bot) return interaction.reply({ content: 'Du kannst keine Bots beklauen', ephemeral: true })

        let CD
        CD = await Cooldowns.findOne({user: interaction.user.id})
        if (CD && CD.rob) {
            const lastExecute = parseInt(CD.rob)
            const now = Date.now()
            const cooldownTime = 10800000 //3 Stunden

            const timestamp = Math.floor((lastExecute + cooldownTime) / 1000)
            if (now - lastExecute < cooldownTime) {
                const embed = new EmbedBuilder({
                    title: 'Plan gescheitert',
                    description: `Du musst dich erstmal versteckt halten, bevor du den nächsten Diebstahl planst.\n<t:${timestamp}:R> kannst du wieder aus deiner Deckung kommen.`,
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
        CD.rob = Date.now()
        await CD.save()
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
        if (!Target || Target.wallet! <= 0) {
            const embed = new EmbedBuilder({
                title: 'Plan gescheitert',
                description: `Du kannst <@${target.id}> kein Geld stehlen, weil er keins hat`,
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            return;
        }
        const User = await Casino.findOne({ user: interaction.user.id })
        if(!User) return interaction.reply({content: 'Dein Konto wurde nicht gefunden!', ephemeral: true})
        const chance = Math.floor(Math.random() * 100)
        if (chance > 35) {
            const percentage = parseInt(((Math.random() * 40) / 100).toFixed(2))
            const robbed = Math.floor(Target.wallet! * percentage)
            const embed = new EmbedBuilder({
                title: 'Erfolgreicher Diebstahl',
                description: `Du hast <@${target.id}> erfolgreich 💰${robbed} gestohlen`,
                color: 0x77ff00
            })
            interaction.reply({ embeds: [embed] })
            Target.wallet! -= robbed
            User.wallet! += robbed
            await Target.save()
            await User.save()
        } else {
            const fined = Math.floor(Math.random() * 2000)
            const embed = new EmbedBuilder({
                title: 'Diebstahl fehlgeschlagen',
                description: `Du wurdest bei dem Versuch <@${target.id}> Geld zu stehlen erwischt und musstest 💰${fined} Strafe an ihn zahlen`,
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            User.wallet! -= fined
            Target.wallet! += fined
            await User.save()
            await Target.save()
        }
    }
}