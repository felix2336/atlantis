import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits } from 'discord.js'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('customembed')
        .setDescription('Custom Embed System')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(command =>
            command
                .setName('create')
                .setDescription('Erstelle ein Custom Embed')
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder({
            author: { name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() },
            title: 'Custom Embed',
            description: 'Nutze die Buttons, um deinen Embed zu gestalten! :)'
        })

        const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                customId: 'ce_title',
                label: 'Titel ändern',
                style: 1
            }),
            new ButtonBuilder({
                customId: 'ce_description',
                label: 'Beschreibung ändern',
                style: 1
            }),
            new ButtonBuilder({
                customId: 'ce_field',
                label: 'Feld ändern',
                style: 1
            }),
            new ButtonBuilder({
                customId: 'ce_thumbnail',
                label: 'Thumbnail ändern',
                style: 1
            }),
            new ButtonBuilder({
                customId: 'ce_image',
                label: 'Bild ändern',
                style: 1
            })
        ])

        const row2 = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                customId: 'ce_color',
                label: 'Farbe ändern',
                style: 1
            }),
            new ButtonBuilder({
                customId: 'ce_footer',
                label: 'Footer ändern',
                style: 1
            }),
            new ButtonBuilder({
                customId: 'ce_send',
                label: 'In einen Channel Senden',
                style: 3
            }),
            new ButtonBuilder({
                customId: 'ce_delete',
                label: 'Embed löschen',
                style: 4
            })
        ])
        //@ts-ignore
        interaction.reply({ embeds: [embed], components: [row, row2] })
    }
}

export default command