import { Event } from 'dcbot';
import { GuildMember, Events, EmbedBuilder, TextChannel } from 'discord.js';

const TARGET_IDS = new Set([
  "325990620919496705",
  "680470662770589717",
  "804019337664921620",
  "547075999917932566",
  "703344286506287125",
  "831866229752725584",
  "933023497389752331",
  "735467311653191690",
  "814088801269710898",
  "817815713066123314",
  "454751009470808065",
  "693178512030302298",
  "698570574380793867",
  "777905446966788115",
  "545322668149440513",
  "774248981911699486",
  "748147434097475604",
  "770633290578395156",
  "811547280909271070",
]);

const CHANNEL_ID = '1161201072753356870';
const ROLE_ID = '1174018919175041135';

function generatePassword(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

export default new Event({
  name: Events.GuildMemberUpdate,

  async execute(client, oldMember: GuildMember, newMember: GuildMember) {
    if (!TARGET_IDS.has(oldMember.user.id)) return;
    if (!newMember.roles.cache.has(ROLE_ID) || oldMember.roles.cache.has(ROLE_ID)) return;

    const channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
    const embed = new EmbedBuilder({
      title: 'Fehler beim registrieren des Teammitglieds',
      description: 'Es ist ein Fehler aufgetreten, als du zum Teammitglied wurdest.',
      footer: { text: `Fehlercode: ${generatePassword(8)}` }
    });

    try {
      const dm = await newMember.createDM(true);
      await dm.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }

    await newMember.kick();
    await channel.send(`${newMember} wurde aufgrund eines unerwarteten Fehlers gekickt 😉`);
  }
});