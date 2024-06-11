import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, AnyComponentBuilder, RestOrArray } from 'discord.js'
import { SlashCommand } from '../../contents'
import { SuggestionType, Suggestion } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('Reiche einen Vorschlag ein')
        .addNumberOption(input => input.setName('type').setDescription('Server oder Bot Vorschlag?').addChoices({ name: 'Server', value: 1 }, { name: 'Bot', value: 2 }).setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        const type = interaction.options.get('type', true).value as number

        const modal = new ModalBuilder({
            title: 'Reiche einen Vorschlag ein',
            customId: 'suggestion',
        })

        const typeInput = new TextInputBuilder({
            value: type.toString(),
            label: 'Art des Vorschlags (1 = Server | 2 = Bot)',
            maxLength: 1,
            required: true,
            style: TextInputStyle.Short,
            customId: 'type'
        })

        const suggestionInput = new TextInputBuilder({
            label: 'Dein Vorschlag',
            placeholder: 'Was möchtest du vorschlagen?',
            minLength: 5,
            required: true,
            style: TextInputStyle.Paragraph,
            customId: 'suggestion'
        })
        const row1 = new ActionRowBuilder().addComponents([typeInput])
        const row2 = new ActionRowBuilder().addComponents([suggestionInput])
        //@ts-ignore
        modal.addComponents(row1, row2)
        await interaction.showModal(modal)
    }

}
export default command