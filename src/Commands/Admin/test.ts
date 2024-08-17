import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits, GuildMember, Colors } from 'discord.js'
import {profileImage} from 'discord-arts'
import { SlashCommand } from 'dcbot'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('canvas-test')
        .setDescription('Canvas Tests')
        .setDefaultMemberPermissions(0),

    async execute(interaction, client) {
        await interaction.deferReply()
        const member = interaction.member as GuildMember
        const buffer = await profileImage(member.user.id, {
            customDate: new Date().toLocaleDateString('ru'),
            badgesFrame: true,
            customTag: 'Willkommen',
            presenceStatus: member.presence?.status,
        }).catch(console.log)

        const embed = new EmbedBuilder({
            title: "Willkommen",
            description: `Hallo ${member} und ein herzliches Willkommen auf unserem Server! 👋\nWir freuen uns, dass du unserer Community beitreten bist ❤️\n\n🤝 Falls du Lust hast, kannst du dich in <#1182194022010322975> unserer Community vorstellen - teile uns gerne etwas über dich, deine Interessen und was dich hierhin führt mit.\n\n📜 Bevor du loslegen kannst, nimm dir bitte einen Moment Zeit, um unsere Serverregeln durchzulesen. Wir möchten, dass jeder hier eine tolle Zeit hat, und die Einhaltung der Richtlinien trägt dazu bei, ein positives Umfeld für alle zu schaffen.\n\nWir freuen uns dass du unserem Server beigetreten bist. 🎉\n\nWir sind jetzt **${(await member.guild.members.fetch()).size} Mitglieder**\n\nMit freundlichen Grüßen:\n**Das Server-Team**`,
            color: Colors.DarkGrey,
            fields: [
                {
                    name: "Wichtige Channel",
                    value: "- Unsere Regeln in <#1146113685962625128> \n- Selfroles in <#1148123116590071828> \n- Support in <#1153007107688386752>",
                }
            ]
        })

        if (buffer instanceof Buffer) {
            const attachment = new AttachmentBuilder(buffer, { name: 'image.png' })
            embed.setImage('attachment://image.png')
            await interaction.editReply({ content: `${member}`, embeds: [embed], files: [attachment] })
        } else {
            await interaction.editReply({ content: `${member}`, embeds: [embed] })
        }
    },
})