const {CommandInteraction,ApplicationCommandOptionType, EmbedBuilder} = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
	name: 'pay',
	description: 'Gib etwas von deinem Geld an einen anderen Spieler',
	permission: 'SendMessages',
	options: [
		{
			name: 'user',
			description: 'Wähle den Spieler aus',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'amount',
			description: 'Wie viel möchtest du dem Spieler geben?',
			type: ApplicationCommandOptionType.Number,
			required: true,
		},
	],
	
	/**
	  * @param {CommandInteraction} interaction
	  */

	async execute(interaction){
		const target = interaction.options.getUser('user')
		const amount = interaction.options.getNumber('amount')
		if(ammount < 1) return interaction.reply({content: 'Du kannst einem User nicht weniger als 1 geben, du Genie', ephemeral: true})
		else if(amount < User.wallet) return interaction.reply({content: 'Du kannst einem User nicht mehr Geld geben, als du hast', ephemeral: true})
		
		const User = Casino.findOne({user: interaction.user.id})
		let Target = Casino.findOne({user: target.id})
		if(!Target){
			Target = Casino.createOne({
				user: target.id,
				wallet: 0,
				bank: 0,
			})
		}
		
		User.wallet -= amount;
		Target.wallet += amount;
		await User.save();
		await Target.save();
		
		const embed = new EmbedBuilder({
			title: 'Überweisung',
			description: `Du hast erfolgreich ${amount} an ${target} gegeben`,
			color: 0x0af248
		})
		
		interaction.reply({embeds: [embed]})	
	}
}