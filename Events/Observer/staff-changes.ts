import { Events, Role, GuildMember, Client, EmbedBuilder, TextChannel, RoleMention } from 'discord.js'
import { Channels } from '../../config'
export default {
    name: Events.ClientReady,

    async execute(client: Client) {
        const guild = client.guilds.cache.get('1146113684435898439')
        const channel = client.channels.cache.get(Channels.teamliste) as TextChannel
        const staff: string[] = [
            '1170957646942191688', //Eigentümer
            '1181259236408311828', //Serverleitung
            '1196522075691679754', //Verwaltung-Management
            '1146117778483450048', //Dev
            '1146113684570124344', //Admin
            '1190695364584538122', //Test Admin
            '1147206142548787372', //mod
            '1146113684570124343', //test mod
            '1148217519631499384', //sup
            '1146113684570124342', //test sup
            '1201591226143608912', //Marketing
            '1201591186272555150', //Test marketing
            '1228063213288161340', //marketing content creator
            '1228063079774949406', //test marketing content creator
            '1180773957708820551', //Server-Management
            '1216758777290690710', //Event Team
        ]
        const message = await channel.messages.fetch('1227354357452898377')
        const check = async () => {
            const mainEmbed = new EmbedBuilder({
                title: 'Teamliste',
                description: ''
            })

            for (const id of staff) {
                const role = guild!.roles.cache.get(id) as Role
                const guildMembers = await guild!.members.fetch()
                let members: GuildMember[] = []
                mainEmbed.data.description += `${role}\n`
                members = guildMembers.filter(m => m.roles.cache.has(id)).map(m => m)
                if(members.length == 0){
                    mainEmbed.data.description += `**/**\n\n`
                } else {
                    mainEmbed.data.description += `${members.join(', ')}\n\n`
                }
            }
            return await message.edit({ embeds: [mainEmbed] })
            // await channel.send({embeds: [mainEmbed]})
        }
        await check();
        setInterval(check, 3600000)
    }
}