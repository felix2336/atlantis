import { CommandInteraction, EmbedBuilder, InteractionResponse, SlashCommandBuilder } from 'discord.js';
import Casino from '../../Schemas/casino';
import Cooldowns from '../../Schemas/cooldowns';

export default {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Hole dir deine tägliche Belohnung ab'),

    async execute(interaction: CommandInteraction) {
        let CD;
        CD = await Cooldowns.findOne({ user: interaction.user.id })
        if (CD && CD.daily) {
            const now = Date.now()
            const lastExecute = parseInt(CD.daily)
            const cooldownTime = 86400000 //1 Tag, logisch bei daily reward ig XD
            const timestamp = Math.floor((lastExecute + cooldownTime) / 1000)
            if (now - lastExecute < cooldownTime) {
                const embed = new EmbedBuilder({
                    title: 'Fehlgeschlagen',
                    description: `Du kannst erst wieder <t:${timestamp}:R> deine tägliche Belohnung abholen`,
                    color: 0xff1414
                })
                interaction.reply({ embeds: [embed] })
                return;
            }
        }
        if (!CD) {
            CD = await Cooldowns.create({
                user: interaction.user.id,
                crime: String,
                work: String,
                rob: String,
                daily: String
            })
        }
        CD.daily = Date.now()
        await CD.save()

        const dailyIncome = 750

        const embed = new EmbedBuilder({
            title: 'Tägliches Einkommen erhalten',
            description: `Du hast erfolgreich dein tägliches Einkommen in Höhe von 💰${dailyIncome} erhalten`,
            color: 0x77ff00
        })
        interaction.reply({ embeds: [embed] })
        let User;
        User = await Casino.findOne({ user: interaction.user.id })
        if (!User) {
            User = await Casino.create({
                user: interaction.user.id,
                wallet: 0,
                bank: 0,
                inventory: {}
            })
        }
        User.wallet += dailyIncome
        await User.save()
    }
}