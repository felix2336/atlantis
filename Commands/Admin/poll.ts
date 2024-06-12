import { ChatInputCommandInteraction, PermissionFlagsBits, Poll, PollData, PollLayoutType, SlashCommandBuilder, TextChannel } from 'discord.js'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Erstelle eine Umfrage')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(input => input.setName('question').setDescription('Welche Frage?').setRequired(true))
        .addStringOption(input => input.setName('options').setDescription('Gib hier die Optionen ein (Durch "," getrennt)').setRequired(true))
        .addNumberOption(input => input.setName('duration').setDescription('Dauer der Umfrage (in Std.)').setRequired(true))
        .addBooleanOption(input => input.setName('multiselect').setDescription('Multiselect?').setRequired(true))
        .addChannelOption(input => input.setName('channel').setDescription('Welcher Channel?').setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
        const question = interaction.options.getString("question", true)
        const rawOptions = interaction.options.getString('options', true)
        const multiselect = interaction.options.getBoolean('multiselect', true)
        const duration = interaction.options.getNumber('duration', true)
        const channel = interaction.options.getChannel('channel') as TextChannel

        const options = rawOptions.split(',')

        const poll: PollData = {
            allowMultiselect: multiselect,
            question: { text: question },
            answers: [
                ...options.map((option, index) => ({ text: option.trim(), emoji: emojis[index] })),
            ],
            duration: duration
        }
        channel.send({poll: poll})
        interaction.reply({content: 'Die Umfrage wurde erfolgreich gepostet', ephemeral: true})
    }
}
export default command