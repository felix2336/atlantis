const { CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Warns = require('../../Schemas/warns');

module.exports = {
    name: 'warn',
    description: 'Verwarne einen User',
    permission: 'Administrator',
    dev: true,
    options: [
        {
            name: 'user',
            description: 'Welchen User möchtest du verwarnen?',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason',
            description: 'Gib den Grund für die Verwarnung ein',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const target = interaction.options.getUser("user"),
            reason = interaction.options.getString('reason'),
            channel = interaction.guild.channels.cache.get('1160607902210470009');

        let Warn = await Warns.findOne({ user: target.id })
        if (!Warn) {
            Warn = await Warns.create({
                user: target.id,
                warns: []
            })
        }
        Warn.warns.push(reason)
        await Warn.save()
        
        const embed = new EmbedBuilder({
            title: 'Warn',
            fields: [
                {name: '**User**', value: `${target}`},
                {name: '**Grund**', value: reason}
            ],
            timestamp: Date.now(),
            color: 0xff9900
        })

        if(Warn.warns.length == 3){
            const member = interaction.guild.members.cache.get(target.id)
            await member.roles.remove(["1156298949301379212", "1146113684570124342", "1146116364243832963", "1148217519631499384", "1146113684570124343", "1147206142548787372", ]).catch(err => console.error(err))
            interaction.reply({ content: `${target} wurde erfolgreich gewarnt mit dem Grund **${reason}**\n${target} hat jetzt den dritten Warn erhalten. Die Team Rollen wurden ihm entfernt!`, ephemeral: true})
            return
        }

        await interaction.reply({content: `${target} wurde erfolgreich gewarnt mit dem Grund **${reason}**`, ephemeral: true})
        await channel.send({embeds: [embed]})
    }
}