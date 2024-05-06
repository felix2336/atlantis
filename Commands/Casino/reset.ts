import { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, Colors, SlashCommandBuilder, GuildMember, Role } from 'discord.js'
import Casino from '../../Schemas/casino'

export default {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Setze das Konto eines Users zurück')
        .addUserOption(input => input.setName('target').setDescription('Welcher User?').setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('target') as GuildMember
        const member = interaction.member as GuildMember
        let User = await Casino.findOne({ user: target.id })

        const minRole = interaction.guild!.roles.cache.get('1170957646942191688') as Role
        if (member.roles.highest.position < minRole.position) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Du hast nicht die erforderlichen Berechtigungen für diesen Command', color: Colors.DarkRed, timestamp: new Date() })] })


        if (!User) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Dieser User besitzt kein Konto!', color: Colors.Yellow, timestamp: new Date() })] })

        User.wallet = 0
        User.bank = 0

        await User.save()

        interaction.reply({ embeds: [new EmbedBuilder({ title: 'Erfolg', description: `Du hast erfolgreich das Konto von ${target} auf 0 zurückgesetzt`, color: Colors.DarkGreen, timestamp: new Date() })] })
    }
}