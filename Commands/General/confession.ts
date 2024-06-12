import { SlashCommandBuilder, ChatInputCommandInteraction, Client, ModalBuilder, ActionRowBuilder, TextInputBuilder } from 'discord.js'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('beichte')
        .setDescription('Erstelle eine anonyme Beichte'),

    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        const modal = new ModalBuilder({
            title: 'Anonyme Beichte',
            customId: 'confession',
            components: [
                new ActionRowBuilder<TextInputBuilder>({
                    components: [
                        new TextInputBuilder({
                            customId: 'confession',
                            label: 'Deine Beichte',
                            required: true,
                            style: 2
                        })
                    ]
                })
            ]
        })

        await interaction.showModal(modal)
    }
}
export default command