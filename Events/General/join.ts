import { GuildMember, Client, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, TextChannel } from 'discord.js'
import { Channels } from '../../contents'
export default {
    name: 'guildMemberAdd',

    async execute(member: GuildMember) {
        member.roles.add('1149971550578147378')
        const channel = member.guild.channels.cache.get(Channels.welcome) as TextChannel
        const embed = new EmbedBuilder({
            title: "Willkommen",
            description: `Hallo ${member} und ein herzliches Willkommen auf unserem Server! 👋\nWir freuen uns, dass du unserer Community beitreten bist ❤️\n\n🤝 Falls du Lust hast, kannst du dich in <#1182194022010322975> unserer Community vorstellen - teile uns gerne etwas über dich, deine Interessen und was dich hierhin führt mit.\n\n📜 Bevor du loslegen kannst, nimm dir bitte einen Moment Zeit, um unsere Serverregeln durchzulesen. Wir möchten, dass jeder hier eine tolle Zeit hat, und die Einhaltung der Richtlinien trägt dazu bei, ein positives Umfeld für alle zu schaffen.\n\nWir freuen uns dass du unserem Server beigetreten bist. 🎉\n\nWir sind jetzt **136 Mitglieder**\n\nMit freundlichen Grüßen:\n**Das Server-Team**`,
            color: Colors.DarkGrey,
            fields: [
                {
                    name: "Wichtige Channel",
                    value: "- Unsere Regeln in <#1146113685962625128> \n- Selfroles in <#1148123116590071828> \n- Support in <#1153007107688386752>",
                }
            ]
        })

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                label: 'Mitglied begrüßen',
                customId: 'greet',
                style: 2
            })
        ])

        await channel.send({ content: `${member}`, embeds: [embed], components: [row] })
    }
}