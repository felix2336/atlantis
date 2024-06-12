import { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType, Colors, SlashCommandBuilder, PermissionFlagsBits, GuildMember, Role } from 'discord.js'
import Casino from '../../Schemas/casino'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('removemoney')
        .setDescription('Entferne Geld von dem Konto eines Users')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(input => input.setName('target').setDescription('Wähle den User, von dessen Konto du Geld entfernen möchtest').setRequired(true))
        .addNumberOption(input => input.setName('amount').setDescription('Gib an, wie viel du entfernen möchtest').setRequired(true))
        .addStringOption(input => input.setName('type').setDescription('Von wo möchtest du Geld entfernen?').setRequired(true).addChoices({name: 'Wallet', value: 'wallet'}, {name: 'Bank', value: 'bank'})),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('target') as GuildMember
        const member = interaction.member as GuildMember
        let User = await Casino.findOne({ user: target.user.id })
        if (!User) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Account nicht gefunden', description: 'Der Account dieses Users wurde nicht gefunden', color: Colors.Yellow, timestamp: new Date() })] })
        const minRole = interaction.guild!.roles.cache.get('1170957646942191688') as Role
        if (member.roles.highest.position < minRole.position) return interaction.reply({embeds: [new EmbedBuilder({title: 'Fehler', description: 'Du hast nicht die erforderlichen Berechtigungen für diesen Command', color: Colors.DarkRed, timestamp: new Date()})]})
        //@ts-ignore
        const amount = interaction.options.getNumber('amount') as number
        //@ts-ignore
        const type = interaction.options.getString('type') as string
        if (User[type] < amount) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Der User hat nicht so viel Geld.', color: Colors.Yellow, timestamp: new Date() })] })

        User[type] -= amount
        await User.save()

        interaction.reply({ embeds: [new EmbedBuilder({ title: 'Erfolg', description: `Du hast erfolgreich der ${type} von ${target} ${amount} abgezogen`, color: Colors.DarkGreen })] })
    }
}
export default command