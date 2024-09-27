import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, Guild, PermissionFlagsBits, EmbedBuilder, TextChannel } from 'discord.js'
import { Channels, MemberManager, MyClient } from 'contents'
import { SlashCommand } from 'dcbot'

export default new SlashCommand<MyClient>({
    // Definition des Befehls
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banne einen User')
        .addUserOption(input => input.setName('user').setDescription('Welchen User?').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für den Ban').setRequired(true))
        .addNumberOption(input => input.setName('deletemessageseconds').setDescription('In welcher Zeit vor dem Ban sollen die Nachrichten gelöscht werden? (in Sekunden)'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    // Ausführung des Befehls
    async execute(interaction, client) {
        // Antwort auf die Interaktion verzögern
        await interaction.deferReply({ ephemeral: true })

        // Definition der Variablen
        const target = interaction.options.getMember('user') as GuildMember
        const deleteMessageSeconds = interaction.options.getNumber('deletemessageseconds') || undefined
        const reason = interaction.options.getString('reason', true)
        const mod = interaction.member as GuildMember
        const guild = interaction.guild!

        // Überprüfung, ob der Ziel-User eine höhere Rolle hat als der Moderator
        if (target.roles.highest.position >= mod.roles.highest.position) {
            // Wenn ja, dann senden wir eine Fehlermeldung
            interaction.editReply({ content: 'Du kannst diesen User nicht bannen, da er eine höhere Rolle hat als du!' })

            // Erstellung eines Embeds für den Log-Kanal
            const embed = new EmbedBuilder({
                title: 'Versuchter Ban',
                description: `${mod} (${mod.user.username}) hat versucht ${target} (${target.user.username}) zu bannen!`,
                footer: { text: 'Tja Pech gehabt... XD' }
            })

            // Senden des Embeds im Log-Kanal
            const channel = client.channels.cache.get(Channels.test) as TextChannel
            await channel.send({ embeds: [embed] })

            // Beenden der Funktion
            return
        }

        // Erstellung eines MemberManagers für den Ziel-User
        const manager = new MemberManager(target, guild)

        // Ausführen des Bans
        const ban = await manager.ban(mod, reason, deleteMessageSeconds)

        // Überprüfung, ob der Ban erfolgreich war
        if (!ban) {
            // Wenn nicht, dann senden wir eine Fehlermeldung
            await interaction.editReply('Der Ban ist fehlgeschlagen!');
            return
        } else {
            // Wenn ja, dann senden wir eine Erfolgsmeldung
            await interaction.editReply(`Du hast ${target} erfolgreich gebannt!`)
            return
        }
    }
})
