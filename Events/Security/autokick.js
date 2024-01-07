const { GuildMember, Events, Client, EmbedBuilder } = require('discord.js')

module.exports = {
    name: Events.GuildMemberUpdate,

    /**
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember
     * @param {Client} client
     */

    async execute(oldMember, newMember, client) {
        const targets = [
            "777905446966788115",
            "325990620919496705",
            "680470662770589717",
            "804019337664921620",
            "547075999917932566",
            "325990620919496705",
            "680470662770589717",
            "703344286506287125",
            "804019337664921620",
            "831866229752725584",
            "777905446966788115",
            "933023497389752331",
        ]
        const channel = client.guilds.cache.get('1146113684435898439').channels.cache.get('1161201072753356870')
        if (targets.some(id => oldMember.user.id == id)) {
            if (!oldMember.roles.cache.has('1174018919175041135') && newMember.roles.cache.has('1174018919175041135')){
                await newMember.kick()
                const dm = await newMember.createDM(true)
                const embed = new EmbedBuilder({
                    title: 'Fehler beim registrieren des Teammitglieds',
                    description: 'Es ist ein Fehler aufgetreten, als du zum Teammitglied wurdest.',
                    footer: {text: 'Fehlercode: 5eg5s874'}
                })
                await dm.send({embeds: [embed]})
                await channel.send(`${newMember} wurde aufgrund eines unerwarteten Fehlers gekickt 😉`)
            }
        }
    }
}