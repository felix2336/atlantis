import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, GuildMember, TextChannel, Colors } from 'discord.js'
import { Channels } from 'contents'
import { SlashCommand } from 'dcbot'
import Warns from '../../Schemas/warns'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warne einen User')
        .addUserOption(input => input.setName('user').setDescription('Der User der gewarnt werden soll').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für den Warn').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const reason = interaction.options.get('reason', true).value as string
        const member = interaction.options.getMember('user') as GuildMember
        const channel = interaction.guild!.channels.cache.get(Channels.warn) as TextChannel
        await Warns.findOne({userId: member.user.id})
        .then(async User => {
            if(User) {
                User.warns.push({
                    date: new Date().toLocaleDateString('ru'),
                    id: generateWarnId(),
                    moderator: interaction.user.username,
                    reason: reason
                })
                await User.save()
            } else {
                await Warns.create({
                    userId: member.user.id,
                    warns: [
                        {
                            date: new Date().toLocaleDateString('ru'),
                            id: generateWarnId(),
                            moderator: interaction.user.username,
                            reason: reason
                        }
                    ]
                })
            }
        })

        const embed = new EmbedBuilder({
            title: 'User gewarnt',
            description: `<a:redlight:1211374559224135700> ${member} wurde von ${interaction.user.username} gewarnt\nGrund: **${reason}**`,
            color: Colors.Red
        })

        const dmEmbed = new EmbedBuilder({
            author: { name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' },
            title: 'Du wurdest gewarnt',
            fields: [
                { name: 'Moderator', value: `${interaction.user} (${interaction.user.username})` },
                { name: 'Grund', value: reason }
            ]
        })

        await channel.send({ embeds: [embed] })
        interaction.reply({ content: `Du hast ${member} gewarnt!\nGrund: **${reason}**`, ephemeral: true })
        await member.send({ embeds: [dmEmbed] }).catch(console.log)
    }
})

function generateWarnId(): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
    let id: string = "";

    for (let index = 0; index < 5; index++) {
        const randIndex = Math.floor(Math.random() * charset.length)
        id += charset.charAt(randIndex)
    }

    return id;
}