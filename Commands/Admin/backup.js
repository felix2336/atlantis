const { CommandInteraction, Client, ApplicationCommandOptionType, ChannelType } = require('discord.js')
const Backup = require('../../Schemas/backup')

module.exports = {
    name: 'backup',
    description: 'Erstelle oder lade ein Backup',
    dev: true,
    options: [
        {
            name: 'save',
            description: 'Speichere den aktuellen Server als Backup',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'load',
            description: 'Lade das letzte Backup auf diesen Server',
            type: ApplicationCommandOptionType.Subcommand
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    async execute(interaction, client) {
        const guild = interaction.guild
        const subcommand = interaction.options.getSubcommand()


        switch (subcommand) {
            case 'save': {
                const backup = await Backup.create({ categories: {}, roles: {} })
                interaction.deferReply({ ephemeral: true })
                const categories = guild.channels.cache.filter(channel => channel.type == ChannelType.GuildCategory)

                // for(const [_, category] of categories){
                //     backup.categories[category.name] = {}

                //     const channelsInCategory = guild.channels.cache.filter(channel => channel.parentId == category.id)

                //     for(const [_, channel] of channelsInCategory){
                //         backup.categories[category.name][channel.name] = channel.type
                //     }
                // }


                // categories.forEach(category => {
                //     backup.categories[category.name] = {}

                //     const channelsInCategory = guild.channels.cache.filter(channel => channel.parentId == category.id)

                //     channelsInCategory.forEach(channel => {
                //         backup.categories[category.name][channel.name] = channel.type
                //     })
                // })


                guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).forEach(category => {
                    backup.categories[category.name] = {};

                    // Iteriere durch die Kanäle in der aktuellen Kategorie
                    guild.channels.cache.filter(channel => channel.parentId === category.id).forEach(channel => {
                        backup.categories[category.name][channel.name] = channel.type;
                    });
                });

                setTimeout(async () => {
                    await backup.save()
                        .catch(err => console.error(err))
                        .then(() => console.log('Gesichert'))
                        interaction.editReply({ content: 'Ein Backup wurde erstellt', ephemeral: true })
                }, 10000);

                console.log(backup)
                
            }
        }
    }
}