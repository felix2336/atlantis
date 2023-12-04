const { CommandInteraction, Client, ApplicationCommandOptionType, ChannelType } = require('discord.js')
const backup = require('../../Schemas/backup')

module.exports = {
    name: 'backup',
    description: 'Erstelle oder lade ein Backup',
    permission: 'Administrator',
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
                interaction.deferReply({ content: 'Backup wird erstellt', ephemeral: true })
                const categories = {}

                guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).forEach(category => {
                    categories[category.name] = {};

                    // Iteriere durch die Kanäle in der aktuellen Kategorie
                    guild.channels.cache.filter(channel => channel.parentId === category.id).forEach(channel => {
                        categories[category.name][channel.name] = channel.type;
                    });
                });
                backup.categories = categories
                setTimeout(async () => {
                    await backup.save()
                        .catch(err => console.error(err))
                        .then(() => console.log('Gesichert'))
                    interaction.editReply({ content: 'Ein Backup wurde erstellt', ephemeral: true })
                }, 10000);
                break
            }
            case 'load': {
                const Backup = await backup.findOne().sort({ createdAt: -1 })
                await interaction.deferReply({ ephemeral: true })

                for (const category in Backup.categories) {
                    const cat = await guild.channels.create({
                        name: category,
                        type: ChannelType.GuildCategory,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone,
                                deny: ['ViewChannel']
                            }
                        ]
                    })
                    const channelData = Backup.categories[cat.name]

                    for (const channel in channelData) {
                        const channelType = channelData[channel]

                        await interaction.guild.channels.create({
                            name: channel,
                            type: channelType,
                            parent: cat
                        })
                    }
                }
                interaction.editReply({ content: 'Kategorien und Channels wurden vom backup geladen', ephemeral: true })
            }
        }
    }
}