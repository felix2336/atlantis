import {Client, CommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ActivityType} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('changestatus')
        .setDescription('Ändere den Status des Bots')
        .addStringOption(input => input.setName('status').setDescription('Gib hier den Status ein, den der Bot haben soll').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction){
        const customStatus = interaction.options.get('status')!.value as string
        //@ts-ignore
        interaction.client.user!.setActivity({
            type: ActivityType.Custom,
            name: 'customstatus',
            state: customStatus
        })
        interaction.reply({content: `Der Status wurde erfolgreich auf **${customStatus}** gesetzt`, ephemeral: true})
    }
}