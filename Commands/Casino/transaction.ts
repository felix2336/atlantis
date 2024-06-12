import { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, Colors, SlashCommandBuilder, PermissionFlagsBits, GuildMember } from 'discord.js'
import Casino from '../../Schemas/casino'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('transaction')
        .setDescription('Transferiere Geld von einem Konto auf ein anderes')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addNumberOption(input => input.setName('amount').setDescription('Wie viel Geld möchtest du transferieren?').setRequired(true))
        .addUserOption(input => input.setName('user1').setDescription('Der User von dem das Geld genommen werden soll').setRequired(true))
        .addStringOption(input => input.setName('user1type').setDescription('Von wo soll das Geld genommen werden?').setRequired(true).addChoices({name: 'Wallet', value: 'wallet'}, {name: 'Bank', value: 'bank'}))
        .addUserOption(input => input.setName('user2').setDescription('Der User, der das Geld erhalten soll').setRequired(true))
        .addStringOption(input => input.setName('user2type').setDescription('Wo soll das Geld hingehen?').setRequired(true).addChoices({ name: 'Wallet', value: 'wallet' }, { name: 'Bank', value: 'bank' })),

    async execute(interaction: ChatInputCommandInteraction) {
        const user1 = interaction.options.getMember('user1') as GuildMember
        const user2 = interaction.options.getMember('user2') as GuildMember
        //@ts-ignore
        const user1type = interaction.options.getString('user1type', true)
        //@ts-ignore
        const user2type = interaction.options.getString('user2type', true)
        //@ts-ignore
        const amount = parseInt(interaction.options.getNumber('amount'))

        let User1 = await Casino.findOne({ user: user1.id })
        if (!User1) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Dieser User hat kein Konto, von dem du Geld nehmen kannst', color: Colors.Yellow, timestamp: new Date() })] })
        if (User1[user1type] < amount) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: `Der User hat nicht so viel Geld`, color: Colors.Yellow, timestamp: new Date() })] })

        let User2 = await Casino.findOne({ user: user2.id })
        if (!User2) {
            User2 = await Casino.create({
                user: `${user2.id}`,
                wallet: 0,
                bank: 0,
                inventory: {}
            })
        }

        User1[user1type] -= amount
        User2[user2type] += amount

        await User1.save()
        await User2.save()

        interaction.reply({embeds: [new EmbedBuilder({title: 'Erfolg', description: `Du hast erfolgreich ${amount} von ${user1}'s ${user1type} auf ${user2}'s ${user2type} verschoben.`, color: Colors.DarkGreen, timestamp: new Date()})]})
    }
}
export default command