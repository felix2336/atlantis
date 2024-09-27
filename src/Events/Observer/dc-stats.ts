import { Event } from 'dcbot'
import { Client, Events, Guild, VoiceChannel } from 'discord.js'

// Die ID der Discord-Gilde, für die die Statistiken aktualisiert werden sollen
const GUILD_ID = '1146113684435898439';

// Die IDs der Kanäle, in denen die Statistiken angezeigt werden sollen
const CHANNEL_IDS = {
  member: '1146113685962625130', // Kanal für die Anzahl der Mitglieder
  bot: '1146113685962625132', // Kanal für die Anzahl der Bots
  totalMembers: '1173321127582498846', // Kanal für die Gesamtzahl der Mitglieder
  boost: '1173321542927650906', // Kanal für die Anzahl der Boosts
};

export default new Event({
  // Der Name des Events, das ausgelöst wird, wenn der Client bereit ist
  name: Events.ClientReady,

  // Die Funktion, die ausgeführt wird, wenn das Event ausgelöst wird
  async execute(client) {
    // Die Gilde, für die die Statistiken aktualisiert werden sollen
    const guild = client.guilds.cache.get(GUILD_ID) as Guild;

    // Die Kanäle, in denen die Statistiken angezeigt werden sollen
    const channels = {
      member: guild.channels.cache.get(CHANNEL_IDS.member) as VoiceChannel,
      bot: guild.channels.cache.get(CHANNEL_IDS.bot) as VoiceChannel,
      totalMembers: guild.channels.cache.get(CHANNEL_IDS.totalMembers) as VoiceChannel,
      boost: guild.channels.cache.get(CHANNEL_IDS.boost) as VoiceChannel,
    };

    // Funktion, die die Statistiken aktualisiert
    async function updateStats() {
      // Die Anzahl der menschlichen Mitglieder
      const humanMembers = guild.members.cache.filter(m => !m.user.bot).size;
      // Die Anzahl der Bots
      const botCount = guild.members.cache.filter(member => member.user.bot).size;
      // Die Gesamtzahl der Mitglieder
      const totalMembers = guild.memberCount;
      // Die Anzahl der Boosts
      const boosts = guild.premiumSubscriptionCount;

      // Aktualisierung der Kanalnamen
      await Promise.all([
        channels.member.edit({ name: `Mitglieder: ${humanMembers}` }),
        channels.bot.edit({ name: `Bots: ${botCount}` }),
        channels.totalMembers.edit({ name: `Alle Mitglieder: ${totalMembers}` }),
        channels.boost.edit({ name: `Anzahl der Boosts: ${boosts}` }),
      ]);
    }

    // Initialisierung der Statistiken
    await updateStats();
    // Aktualisierung der Statistiken alle 5 Minuten
    setInterval(updateStats, 300000);
  },
});