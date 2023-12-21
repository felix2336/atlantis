const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const Warns = require('../../Schemas/warns')

module.exports = {
    name: 'unwarn',
    description: 'Lösche eine Verwarnung von einem User',
    permission: 'Administrator',
    dev: true,
    options: [
        {
            name: 'user',
            description: 'Von welchem User möchtest du eine Verwarnung löschen?',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction){
        const target = interaction.options.getUser("user")
        const Warn = await Warns.findOne({user: target.id})

        if(!Warn || Warn.warns.length == 0) return interaction.reply({content: 'Dieser User besitzt keine Verwarnungen', ephemeral: true})

        Warn.warns.splice(0, 1)
        await Warn.save()

        interaction.reply({content: `Es wurde erfolgreich eine Verwarnung von ${target} gelöscht`, ephemeral: true})
    }
}