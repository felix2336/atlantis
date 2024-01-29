const {CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js')

module.exports = {
	name: 'task',
	description: 'Füge eine Aufgabe für den Bot hinzu',
	permission: 'Administrator',
	
	/**
	  * @param {CommandInteraction} interaction
	  */

	async execute(interaction){
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
		
		modal.addComponents(row, row2)
        await interaction.showModal(modal)
	}
}