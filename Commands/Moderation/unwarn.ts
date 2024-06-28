import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, GuildMember } from 'discord.js'
import {SlashCommand} from 'dcbot'
import Warns from '../../Schemas/warns'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Entferne einen Warn von einem User')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du einen Warn entfernen möchtest').setRequired(true))
        .addStringOption(input => input.setName('warn-id').setDescription('Die ID des Warns, den du entfernen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction){
        const member = interaction.options.getMember('user') as GuildMember
        const id = interaction.options.get('warn-id', true).value as string

        await Warns.findOne({userId: member.user.id})
        .then(async User => {
            if(!User || User.warns.length == 0 || !User.warns.find(w => w.id == id)) {
                interaction.reply({content: `${member} hat keine Verwarnungen oder keine mit dieser ID!`, ephemeral: true})
                return
            } else {
                User.warns = User.warns.filter(w => w.id != id)
                await User.save()
                interaction.reply(`Du hast einen Warn von ${member} entfernt!`)
            }
        })
    }
})