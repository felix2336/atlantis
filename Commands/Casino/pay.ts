import { CommandInteraction, ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder, User } from 'discord.js'
import Casino from '../../Schemas/casino'

export default {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('Gib etwas von deinem Geld an einen anderen Spieler')
		.addUserOption(input => input.setName('user').setDescription('Wähle den User aus').setRequired(true))
		.addNumberOption(input => input.setName('amount').setDescription('Wie viel möchtest du dem Spieler geben?').setRequired(true)),

	async execute(interaction: CommandInteraction){
		const User = await Casino.findOne({user: interaction.user.id})
		if(!User) return interaction.reply({content: 'Du hast kein Geld, das du vergeben kannst', ephemeral: true})
		const target = interaction.options.getUser('user') as User
	//@ts-ignore
		const amount = interaction.options.getNumber('amount')
		if(amount < 1) return interaction.reply({content: 'Du kannst einem User nicht weniger als 1 geben, du Genie', ephemeral: true})
		else if(amount > User.wallet!) return interaction.reply({content: 'Du kannst einem User nicht mehr Geld geben, als du hast', ephemeral: true})
		
		let Target = await Casino.findOne({user: target.id})
		if(!Target){
			Target = await Casino.create({
				user: target.id,
				wallet: 0,
				bank: 0,
				inventory: {}
			})
		}
		
		User.wallet! -= amount;
		Target.wallet += amount;
		await User.save();
		await Target.save();
		
		const embed = new EmbedBuilder({
			title: 'Überweisung',
			description: `Du hast erfolgreich 💰${amount} an ${target} gegeben`,
			color: 0x0af248
		})
		
		interaction.reply({embeds: [embed]})	
	}
}