import { Events, Role, GuildMember, Client, EmbedBuilder, TextChannel } from 'discord.js'
import { Channels } from 'contents'
import { Event } from 'dcbot'

export default new Event({
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
      '1236722805660324033', //Mod Leitung
      '1147206142548787372', //mod
      '1237032478196236380', //test mod
      '1236722501115969586', //Sup Leitung
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

    const getRoleMembers = async (roleId: string) => {
      const role = guild!.roles.cache.get(roleId) as Role
      const members = await guild!.members.fetch()
      return members.filter((m) => m.roles.cache.has(roleId)).map((m) => m)
    }

    const updateEmbed = async () => {
      const mainEmbed = new EmbedBuilder({
        title: 'Teamliste',
        description: '',
      })

      for (const id of staff) {
        const members = await getRoleMembers(id)
        const role = guild!.roles.cache.get(id) as Role
        mainEmbed.data.description += `${role}\n`
        mainEmbed.data.description += members.length === 0 ? `**/**\n\n` : `${members.join(', ')}\n\n`
      }

      return await message.edit({ embeds: [mainEmbed] })
    }

    await updateEmbed()
    setInterval(updateEmbed, 3600000)
  },
})