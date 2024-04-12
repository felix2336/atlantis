import { CommandInteraction, Client, ChannelType, SlashCommandBuilder, PermissionFlagsBits, Guild } from 'discord.js'
import Backup from '../../Schemas/backup'

export default {
    data: new SlashCommandBuilder()
        .setName('backup')
        .setDescription('Erstelle oder lade ein Backup')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(input => input
            .setName('save')
            .setDescription('Speichere die aktuellen Kanäle des Servers als Backup')
        )
        .addSubcommand(input => input
            .setName('load')
            .setDescription('Lade das neuste Backup auf diesen Server')
        ),

    async execute(interaction: CommandInteraction, client: Client) {
        const guild = interaction.guild as Guild
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand()


        switch (subcommand) {
            case 'save': {
                const oldBackups = await Backup.find()
                for(const old of oldBackups){
                    await Backup.deleteOne(old._id)
                }
                const backup = await Backup.create({ categories: {}, roles: {} })
                interaction.deferReply({ ephemeral: true })
                const categories = {}

                guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).forEach(category => {
                    categories[category.name] = {};

                    guild.channels.cache.filter(channel => channel.parentId === category.id).forEach(channel => {
                        categories[category.name][channel.name] = channel.type;
                    });
                });
                backup.categories = categories
                setTimeout(async () => {
                    await backup.save()
                        .catch(err => {
                            console.log(err)
                            interaction.editReply("Ein Fehler ist aufgetreten")
                            return;
                        })
                    interaction.editReply({ content: 'Ein Backup wurde erstellt' })
                }, 10000);
                break
            }
            case 'load': {
                const backup = await Backup.findOne().sort()
                if(!backup) return interaction.reply({content: 'Es wurde kein Backup in der Datenbank gefunden!', ephemeral: true})
                await interaction.deferReply({ ephemeral: true })

                for (const category in backup.categories) {
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
                    const channelData = backup.categories[cat.name]

                    for (const channel in channelData) {
                        const channelType = channelData[channel]

                        await interaction.guild!.channels.create({
                            name: channel,
                            type: channelType,
                            parent: cat
                        })
                    }
                }
                interaction.editReply({ content: 'Kategorien und Channels wurden vom backup geladen'})
            }
        }
    }
}
