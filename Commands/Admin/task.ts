import { ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { SlashCommand } from '../../contents'

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('task')
		.setDescription('Gib den Devs eine Aufgabe')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction: ChatInputCommandInteraction){
		const modal = new ModalBuilder()
			.setCustomId('taskmodal')
			.setTitle('Neue Task')
			
				
		const title = new TextInputBuilder()
			.setCustomId('tasktitle')
			.setLabel('Titel der Aufgabe')
			.setStyle(TextInputStyle.Short)
            .setRequired(true)
		
		const description = new TextInputBuilder()
			.setCustomId('taskdescription')
			.setLabel('Beschreibung der Aufgabe')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)
			
				
		const row = new ActionRowBuilder().addComponents(title)
		const row2 = new ActionRowBuilder().addComponents(description)
		//@ts-ignore
		modal.addComponents(row, row2)
        await interaction.showModal(modal)
	}
}
export default command