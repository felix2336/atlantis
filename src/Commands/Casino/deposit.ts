import { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder } from 'discord.js';
import Casino from '../../Schemas/casino';
import { SlashCommand } from 'contents';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('deposit')
        .setDescription("Zahle Geld auf dein Bankkonto ein")
        .addNumberOption(input => input.setName('amount').setDescription('Wie viel möchtest du einzahlen? (-1 für alles)').setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        let User;
        User = await Casino.findOne({ user: interaction.user.id })

        if (!User || User.wallet <= 0) {
            const embed = new EmbedBuilder({
                title: 'Einzahlung fehlgeschlagen',
                description: 'Du kannst kein Geld auf deine Bank einzahlen, weil du kein Bargeld hast.',
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            return;
        }
        let amount = interaction.options.getNumber('amount', true)
        if (amount > User.wallet) {
            const embed = new EmbedBuilder({
                title: 'Einzahlung fehlgeschlagen',
                description: 'Du willst mehr Geld einzahlen, als du hast.',
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            return;
        }
        else if (amount == -1) amount = User.wallet

        User.wallet -= amount
        User.bank += amount
        await User.save()


        const embed = new EmbedBuilder({
            title: 'Einzahlung erfolgreich',
            description: `Du hast erfolgreich 💰${amount} auf dein Bankkonto eingezahlt.`,
            color: 0x77ff00
        })
        interaction.reply({ embeds: [embed] })
    }
}
export default command