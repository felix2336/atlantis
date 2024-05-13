import { Client, Events, Guild, VoiceChannel } from 'discord.js'
export default {
    name: Events.ClientReady,

    async execute(client: Client) {
        async function updateStats() {
            const guild = client.guilds.cache.get('1146113684435898439') as Guild

            const memberChannel = guild.channels.cache.get('1146113685962625130') as VoiceChannel
            const botChannel = guild.channels.cache.get('1146113685962625132') as VoiceChannel
            const totalMembersChannel = guild.channels.cache.get('1173321127582498846') as VoiceChannel
            const boostChannel = guild.channels.cache.get('1173321542927650906') as VoiceChannel

            const humanMembers = (await guild.members.fetch()).filter(m => !m.user.bot).size
            const botCount = (guild.members.cache.filter(member => member.user.bot)).size
            const totalMembers = guild.memberCount
            const boosts = guild.premiumSubscriptionCount


            await memberChannel.edit({name: `Mitglieder: ${humanMembers}`})
            await botChannel.edit({name: `Bots: ${botCount}`})
            await totalMembersChannel.edit({name: `Alle Mitglieder: ${totalMembers}`})
            await boostChannel.edit({name: `Anzahl der Boosts: ${boosts}`})
        }

        await updateStats()
        setInterval(updateStats, 300000)

    }
}