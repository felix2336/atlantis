import { CommandInteraction, ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits, GuildMember, Role, EmbedBuilder, Colors } from 'discord.js';
import Casino from '../../Schemas/casino';

export default {
    data: new SlashCommandBuilder()
        .setName('addmoney')
        .setDescription('Füge dem Konto eines Users Geld hinzu')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(input => input.setName("user").setDescription("Der User, der das Geld erhält.").setRequired(true))
        .addNumberOption(input => input.setName("amount").setDescription("Wie viel soll hinzugefügt werden?").setRequired(true)),

    async execute(interaction: CommandInteraction) {
        const user = interaction.options.getUser('user') || interaction.user,
            //@ts-ignore
            amount = interaction.options.getNumber('amount');

        const member = interaction.member as GuildMember

        if (amount < 1) return interaction.reply({ content: 'Deine Eingabe ist ungültig. (Sie darf nicht negativ oder 0 sein)', ephemeral: true })

        const minRole = interaction.guild!.roles.cache.get('1170957646942191688') as Role
        if (member.roles.highest.position < minRole.position) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Du hast nicht die erforderlichen Berechtigungen für diesen Command', color: Colors.DarkRed, timestamp: new Date() })] })


        let User
        User = await Casino.findOne({ user: user.id });
        if (!User) {
            User = await Casino.create({
                user: user.id,
                wallet: 0,
                bank: 0,
                inventory: {}
            })
        }
        User.wallet += amount
        await User.save()
        interaction.reply({ content: `Du hast ${user} erfolgreich 💰${amount} gegeben.`, ephemeral: true })
    }
}