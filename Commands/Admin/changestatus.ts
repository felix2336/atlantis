import {SlashCommandBuilder, ActivityType, Client, PermissionFlagsBits, CommandInteraction} from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName("changestatus")
		.setDescription("Ändere den Status des Bots")
		.addStringOption(o => o.setName("status").setDescription("Gib hier den Status ein, den der Bot haben soll").setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction: CommandInteraction, client: Client){
		const status = interaction.options.get("status").value as string
		client.user.setActivity({
			type: ActivityType.Custom,
			name: 'customstatus',
			state: status
		})
	}
}