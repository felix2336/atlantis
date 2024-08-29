import { Event } from 'dcbot'
import { Client, Events, Guild, VoiceChannel } from 'discord.js'

const GUILD_ID = '1146113684435898439';
const CHANNEL_IDS = {
  member: '1146113685962625130',
  bot: '1146113685962625132',
  totalMembers: '1173321127582498846',
  boost: '1173321542927650906',
};

export default new Event({
  name: Events.ClientReady,

  async execute(client) {
    const guild = client.guilds.cache.get(GUILD_ID) as Guild;
    const channels = {
      member: guild.channels.cache.get(CHANNEL_IDS.member) as VoiceChannel,
      bot: guild.channels.cache.get(CHANNEL_IDS.bot) as VoiceChannel,
      totalMembers: guild.channels.cache.get(CHANNEL_IDS.totalMembers) as VoiceChannel,
      boost: guild.channels.cache.get(CHANNEL_IDS.boost) as VoiceChannel,
    };

    async function updateStats() {
      const humanMembers = guild.members.cache.filter(m => !m.user.bot).size;
      const botCount = guild.members.cache.filter(member => member.user.bot).size;
      const totalMembers = guild.memberCount;
      const boosts = guild.premiumSubscriptionCount;

      await Promise.all([
        channels.member.edit({ name: `Mitglieder: ${humanMembers}` }),
        channels.bot.edit({ name: `Bots: ${botCount}` }),
        channels.totalMembers.edit({ name: `Alle Mitglieder: ${totalMembers}` }),
        channels.boost.edit({ name: `Anzahl der Boosts: ${boosts}` }),
      ]);
    }

    await updateStats();
    setInterval(updateStats, 300000);
  },
});