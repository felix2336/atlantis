import { Events, Role, GuildMember, Client, EmbedBuilder, TextChannel } from 'discord.js'
import { Channels } from 'contents'
import { Event } from 'dcbot'

export default new Event({
  // Ereignisname, wenn der Client bereit ist
  name: Events.ClientReady,

  // Funktion, die ausgeführt wird, wenn das Ereignis eintritt
  async execute(client: Client) {
    // Abrufen des Servers
    const guild = client.guilds.cache.get('1146113684435898439')
    // Abrufen des Kanals für die Teamliste
    const channel = client.channels.cache.get(Channels.teamliste) as TextChannel
    // Liste der Rollen, die in der Teamliste angezeigt werden sollen
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
    // Abrufen der Nachricht, die die Teamliste enthält
    const message = await channel.messages.fetch('1227354357452898377')

    // Funktion, um die Mitglieder einer Rolle abzurufen
    const getRoleMembers = async (roleId: string) => {
      // Abrufen der Rolle
      const role = guild!.roles.cache.get(roleId) as Role
      // Abrufen aller Mitglieder des Servers
      const members = await guild!.members.fetch()
      // Filtern der Mitglieder, die die angegebene Rolle haben
      return members.filter((m) => m.roles.cache.has(roleId)).map((m) => m)
    }

    // Funktion, um die Teamliste zu aktualisieren
    const updateEmbed = async () => {
      // Erstellen eines neuen Embeds für die Teamliste
      const mainEmbed = new EmbedBuilder({
        title: 'Teamliste',
        description: '',
      })

      // Durchlaufen aller Rollen in der Liste
      for (const id of staff) {
        // Abrufen der Mitglieder der aktuellen Rolle
        const members = await getRoleMembers(id)
        // Abrufen der aktuellen Rolle
        const role = guild!.roles.cache.get(id) as Role
        // Hinzufügen der Rolle und ihrer Mitglieder zum Embed
        mainEmbed.data.description += `${role}\n`
        mainEmbed.data.description += members.length === 0 ? `**/**\n\n` : `${members.join(', ')}\n\n`
      }

      // Aktualisieren der Nachricht mit der Teamliste
      return await message.edit({ embeds: [mainEmbed] })
    }

    // Initialisieren der Teamliste
    await updateEmbed()
    // Aktualisieren der Teamliste alle 60 Minuten
    setInterval(updateEmbed, 3600000)
  },
})
