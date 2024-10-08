import { ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, GuildMember, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { SlashCommand } from 'dcbot'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('abmeldung')
        .setDescription('Melde dich für einen gewissen Zeitraum vom Team ab'),

    async execute(interaction: ChatInputCommandInteraction) {
        const member = interaction.member as GuildMember
        if (!member.roles.cache.has('1156298949301379212')) {
            interaction.reply({ content: 'Du bist nicht im Team :wink:', ephemeral: true })
            return
        }

        const modal = new ModalBuilder({
            title: 'Abmeldung',
            customId: 'abmeldung'
        })

        const reason = new TextInputBuilder({
            customId: 'reason',
            label: 'Was ist der Grund für deine Abmeldung?',
            required: true,
            style: TextInputStyle.Short,
            placeholder: 'z.B. Ich bin im Urlaub mit meiner Familie'
        })

        const zeitraum = new TextInputBuilder({
            customId: 'zeitraum',
            label: 'In welchem Zeitraum bist du abwesend?',
            required: true,
            style: TextInputStyle.Short,
            placeholder: 'z.B. 10.05. - 26.05.',
        })

        const bemerkungen = new TextInputBuilder({
            customId: 'bemerkungen',
            label: 'Sonstige Bemerkungen',
            style: TextInputStyle.Paragraph,
            required: false,
            maxLength: 1024
        })

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(reason)
        const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(zeitraum)
        const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(bemerkungen)

        modal.addComponents(row, row1, row2)
        await interaction.showModal(modal)
    }
})