import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, Guild } from 'discord.js'
import { MemberManager } from '../../contents'

export default {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banne einen User')
        .addUserOption(input => input.setName('user').setDescription('Welchen User?').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für den Ban').setRequired(true))
        .addNumberOption(input => input.setName('deletemessageseconds').setDescription('In welcher Zeit vor dem Ban sollen die Nachrichten gelöscht werden? (in Sekunden)')),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: true })
        const target = interaction.options.getMember('user') as GuildMember
        const deleteMessageSeconds = interaction.options.getNumber('deletemessageseconds') || undefined
        const reason = interaction.options.getString('reason', true)

        const manager = new MemberManager(target, interaction.guild as Guild)

        const ban = await manager.ban(reason, deleteMessageSeconds)
        if (!ban) return await interaction.editReply('Der Ban ist fehlgeschlagen!');
        else return await interaction.editReply(`Du hast ${target} erfolgreich gebannt!`)
    }
}