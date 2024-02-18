const { CommandInteraction, ActionRowBuilder, TextInputBuilder, Client, TextInputStyle, ModalBuilder, PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js')
const { readFileSync, writeFileSync } = require('fs')

module.exports = {
    name: 'staff-poll',
    description: 'Erstelle eine Teaminterne Umfrage',
    permission: 'Administrator',
    default_member_permissions: PermissionFlagsBits.Administrator,
    dev: true,
    options: [
        {
            name: 'mehrfachauswahl',
            description: 'Soll eine Mehrfachauswahl möglich sein?',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    async execute(interaction, client) {
        const bool = interaction.options.getBoolean('mehrfachauswahl')
        const channel = client.channels.cache.get('1208549139126812702')
        const polls = JSON.parse(readFileSync('./JSON/polls.json', 'utf8'))
        const modal = new ModalBuilder({
            title: 'Teaminterne Umfrage erstellen',
            customId: 'modal_staffpoll'
        })

        const topic = new TextInputBuilder({
            label: 'Thema der Umfrage',
            customId: 'topic',
            required: true,
            style: TextInputStyle.Short,
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

        const row1 = new ActionRowBuilder().addComponents(topic)
        const row2 = new ActionRowBuilder().addComponents(field1)
        const row3 = new ActionRowBuilder().addComponents(field2)
        const row4 = new ActionRowBuilder().addComponents(field3)
        const row5 = new ActionRowBuilder().addComponents(field4)

        modal.addComponents(row1, row2, row3, row4, row5)
        const message = await channel.send('*Umfrage wird erstellt, bitte warte einen Augenblick...*')
        if(bool){
            polls[message.id] = {
                messagsId: message.id,
                multiple: true,
                option1: [],
                option2: [],
                option3: [],
                option4: []
            }
        }else{
            polls[message.id] = {
                messageId: message.id,
                multiple: false,
                option1: [],
                option2: [],
                option3: [],
                option4: [],
                participants: []
            }
        }
        writeFileSync('./JSON/polls.json', JSON.stringify(polls, null, 2), 'utf8')
        await interaction.showModal(modal)
    }
}