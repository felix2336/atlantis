import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, Guild, PermissionFlagsBits, EmbedBuilder, TextChannel } from 'discord.js'
import { Channels, MemberManager, MyClient } from 'contents'
import { SlashCommand } from 'dcbot'

export default new SlashCommand<MyClient>({
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banne einen User')
        .addUserOption(input => input.setName('user').setDescription('Welchen User?').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für den Ban').setRequired(true))
        .addNumberOption(input => input.setName('deletemessageseconds').setDescription('In welcher Zeit vor dem Ban sollen die Nachrichten gelöscht werden? (in Sekunden)'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })
        const target = interaction.options.getMember('user') as GuildMember
        const deleteMessageSeconds = interaction.options.getNumber('deletemessageseconds') || undefined
        const reason = interaction.options.getString('reason', true)
        const mod = interaction.member as GuildMember
        const guild = interaction.guild!

        if (target.roles.highest.position >= mod.roles.highest.position) {
            interaction.editReply({ content: 'Du kannst diesen User nicht bannen, da er eine höhere Rolle hat als du!'})
            const embed = new EmbedBuilder({
                title: 'Versuchter Ban',
                description: `${mod} (${mod.user.username}) hat versucht ${target} (${target.user.username}) zu bannen!`,
                footer: { text: 'Tja Pech gehabt... XD' }
            })
            const channel = client.channels.cache.get(Channels.test) as TextChannel
            await channel.send({ embeds: [embed] })
            return
        }

        const manager = new MemberManager(target, guild)

        const ban = await manager.ban(mod, reason, deleteMessageSeconds)
        if (!ban) {
            await interaction.editReply('Der Ban ist fehlgeschlagen!');
            return
        }
        else {
            await interaction.editReply(`Du hast ${target} erfolgreich gebannt!`)
            return
        }
    }
})