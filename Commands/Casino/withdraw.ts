import { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder } from 'discord.js'
import Casino from '../../Schemas/casino'

export default {
    data: new SlashCommandBuilder()
        .setName('withdraw')
        .setDescription('Hebe Geld von deinem Bankkonto ab')
        .addNumberOption(input => input.setName('amount').setDescription('Wie viel möchtest du abheben? (-1 für alles)').setRequired(true)),

    async execute(interaction: CommandInteraction) {
        let User = await Casino.findOne({ user: interaction.user.id })

        if (!User || User.bank! <= 0) {
            const embed = new EmbedBuilder({
                title: 'Abhebung fehlgeschlagen',
                description: 'Du kannst nichts von deinem Bankkonto abheben, weil dort kein Geld drauf ist.',
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            return;
        }
        //@ts-ignore
        let amount = interaction.options.getNumber('amount')

        if (amount > User.bank!) {
            const embed = new EmbedBuilder({
                title: 'Abhebung fehlgeschlagen',
                description: 'Du willst mehr Geld abheben, als du hast.',
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            return;
        }

        if (amount == -1) amount = User.bank

        const embed = new EmbedBuilder({
            title: 'Abhebung erfolgreich',
            description: `Du hast erfolgreich 💰${amount} von der Bank abgehoben.`,
            color: 0x77ff00
        })
        User.bank! -= amount
        User.wallet += amount
        await User.save()
        interaction.reply({ embeds: [embed] })
    }
}