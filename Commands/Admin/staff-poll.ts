import { CommandInteraction, ActionRowBuilder, TextInputBuilder, Client, TextInputStyle, ModalBuilder, PermissionFlagsBits, ApplicationCommandOptionType, SlashCommandBuilder, TextChannel, EmbedBuilder, Colors } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import StaffPoll from '../../Classes/staff-poll'

export default {
    data: new SlashCommandBuilder()
        .setName('staff-poll')
        .setDescription('Erstelle eine Teaminterne Umfrage')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(input => input.setName('topic').setDescription('Das Thema der Umfrage').setRequired(true))
        .addBooleanOption(input => input.setName('mehrfachauswahl').setDescription('Mehrfachauswahl aktivieren?').setRequired(true)),

    async execute(interaction: CommandInteraction, client: Client) {
        const bool = interaction.options.get('mehrfachauswahl', true).value as boolean
        const topic = interaction.options.get('topic', true).value as string

        const channel = client.channels.cache.get('1208549139126812702') as TextChannel
        const polls = JSON.parse(readFileSync('./JSON/polls.json', 'utf8')) as StaffPoll[]

        const modal = new ModalBuilder({
            title: 'Teaminterne Umfrage erstellen',
            customId: 'modal_staffpoll'
        })

        const field1 = new TextInputBuilder({
            label: 'Abstimmungsmöglichkeit 1',
            customId: 'field1',
            required: true,
            style: 1
        })
        const field2 = new TextInputBuilder({
            label: 'Abstimmungsmöglichkeit 2',
            customId: 'field2',
            required: true,
            style: 1
        })
        const field3 = new TextInputBuilder({
            label: 'Abstimmungsmöglichkeit 3',
            customId: 'field3',
            required: false,
            style: 1
        })
        const field4 = new TextInputBuilder({
            label: 'Abstimmungsmöglichkeit 4',
            customId: 'field4',
            required: false,
            style: 1
        })

        const row2 = new ActionRowBuilder().addComponents(field1)
        const row3 = new ActionRowBuilder().addComponents(field2)
        const row4 = new ActionRowBuilder().addComponents(field3)
        const row5 = new ActionRowBuilder().addComponents(field4)
        //@ts-ignore
        modal.addComponents(row2, row3, row4, row5)
        const embed = new EmbedBuilder({
            title: 'Teaminterne Umfrage',
            description: `**${topic}**`,
            fields: [],
            timestamp: new Date(),
            color: Colors.DarkPurple
        })
        const message = await channel.send({content: '*Abstimmungsmöglichkeiten werden erstellt. Bitte warte einen Moment...*', embeds: [embed]})

        const poll = new StaffPoll(message.id, topic, bool)
        polls.push(poll)

        writeFileSync('./JSON/polls.json', JSON.stringify(polls, null, 2), 'utf8')
        await interaction.showModal(modal)
    }
}