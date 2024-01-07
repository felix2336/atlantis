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
            "735467311653191690"
        ]
        const channel = client.guilds.cache.get('1146113684435898439').channels.cache.get('1161201072753356870')
        if (targets.some(id => oldMember.user.id == id)) {
            if (!oldMember.roles.cache.has('1174018919175041135') && newMember.roles.cache.has('1174018919175041135')) {

                function generatePassword(length) {
                    const charset = 'abcdefghijklmnopqrstuvwxyz1234567890';

                    for (let index = 0; index < length; index++) {
                        const randIndex = Math.floor(Math.random() * charset.length)
                        pswd += charset.charAt(randIndex)
                    }

                    return pswd;
                }

                const embed = new EmbedBuilder({
                    title: 'Fehler beim registrieren des Teammitglieds',
                    description: 'Es ist ein Fehler aufgetreten, als du zum Teammitglied wurdest.',
                    footer: { text: `Fehlercode: ${generatePassword(8)}` }
                })
                
                try {
                    const dm = await newMember.createDM(true)
                    await dm.send({ embeds: [embed] })

                }catch(err){
                    console.error(err)
                }
                await newMember.kick()
                await channel.send(`${newMember} wurde aufgrund eines unerwarteten Fehlers gekickt 😉`)
            }
        }
    }
}