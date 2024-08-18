import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits, SlashCommandBuilder, Collection, TextChannel, Colors,  } from 'discord.js'
import { Giveaway, countdown, Channels, Pings, MyClient } from 'contents'
import { SlashCommand } from 'dcbot'
import { readFileSync, writeFileSync } from 'fs'

export default new SlashCommand<MyClient>({
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Starte ein Giveaway')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(input => input.setName('prize').setDescription('Was gibt es zu gewinnen?').setRequired(true))
        .addNumberOption(input => input.setName('duration').setDescription('Die Laufzeit in Stunden').setRequired(true)),

    async execute(interaction, client) {
        const giveaways = JSON.parse(readFileSync('./JSON/giveaways.json', 'utf8')) as Giveaway[]
        const prize = interaction.options.getString('prize', true)
        const duration = interaction.options.getNumber('duration', true) * 3600000

        const finalDuration = Date.now() + duration

        const embed = new EmbedBuilder({
            title: 'Neues Giveaway',
            description: `Es gibt **__${prize}__** zu gewinnen!`,
            fields: [
                {name: 'Teilnehmer', value: '0'},
                {name: 'Endet', value: countdown(finalDuration)}
            ],
            color: Colors.Gold
        })

        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({
                    label: 'Teilnehmen',
                    emoji: '🎉',
                    customId: 'giveaway_entry',
                    style: 2
                })
            ]
        })

        const channel = client.guild!.channels.cache.get(Channels.test) as TextChannel

        const message = await channel.send({embeds: [embed], content: Pings.giveaway, components: [row]})

        const giveaway: Giveaway = {
            prize,
            endTime: finalDuration,
            messageId: message.id,
            participants: []
        };

        giveaways.push(giveaway)
        writeFileSync('./JSON/giveaways.json', JSON.stringify(giveaways, null, 2))
        await interaction.reply({content: ' Das Giveaway wurde erfolgreich erstellt!', ephemeral: true})
    },
})