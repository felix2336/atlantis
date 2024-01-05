const { CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "customembed",
    description: "Erstelle einen CustomEmbed",
    dev: true,
    options: [
        {
            name: 'create',
            description: 'Erstelle einen Embed',
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'show',
            description: 'Lasse dir dein Embed anzeigen',
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'delete',
            description: 'Lösche deinen Embed',
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: 'send',
            description: 'Sende deinen Embed in einen bestimmten Channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'Wähle hier den Channel aus',
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                }
            ]
        },
        {
            name: 'edit',
            description: 'Bearbeite deinen Embed',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'title',
                    description: 'Ändere den Titel von deinem Embed',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'string',
                            description: 'Gib hier den Titel für das Embed ein',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                    ]
                },
                {
                    name: 'description',
                    description: 'Ändere die Beschreibung des Embeds',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'string',
                            description: 'Gib hier die Beschreibung für den embed ein',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'color',
                    description: 'Gib hier den Farbcode für den embed ein',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'colorcode',
                            description: 'Gib hier den Colorcode für den Embed ein',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'fields',
                    description: 'Bearbeite die Felder in deinem Embed',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'feldnr',
                            description: 'Welches Feld möchtest du bearbeiten? (1/2/...)',
                            type: ApplicationCommandOptionType.Number,
                            required: true
                        },
                        {
                            name: 'name',
                            description: 'Gib hier den Namen des Felds ein',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        {
                            name: 'value',
                            description: 'Gib hier das ein, was beim Feld stehen soll',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'image',
                    description: 'Bearbeite das Bild deines Embeds',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'url',
                            description: 'Gib hier die URL zu deinem Bild ein',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'author',
                    description: 'Bearbeite den Author den Embeds',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'name',
                            description: 'Gib hier den Namen ein',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        {
                            name: 'iconurl',
                            description: 'Gib hier die Icon URL ein',
                            type: ApplicationCommandOptionType.String,
                        }
                    ]
                }
            ],
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    async execute(interaction, client) {
        const group = interaction.options.getSubcommandGroup()
        const subcommand = interaction.options.getSubcommand()
        let ce = JSON.parse(fs.readFileSync('./customembeds.json', 'utf8'));
        switch (subcommand) {
            case 'create': {
                if (ce[interaction.guild.id] && ce[interaction.guild.id][interaction.user.id]) return interaction.reply({ content: 'Du besitzt bereits einen embed.', ephemeral: true })
                const embed = new EmbedBuilder()
                    .setTitle('Custom Embed')
                const embmsg = await interaction.reply({ embeds: [embed], fetchReply: true })
                ce[interaction.guild.id] = {
                    [interaction.user.id]: embmsg.id
                }
                
                fs.writeFileSync('./customembeds.json', JSON.stringify(ce, null, 2))
                break
            }
            case 'show': {
                if (!ce[interaction.guild.id] || !ce[interaction.guild.id][interaction.user.id]) return interaction.reply({ content: 'Du besitzt keinen Embed', ephemeral: true })
                const msgid = ce[interaction.guild.id][interaction.user.id]
                const msg = await interaction.channel.messages.fetch(msgid)
                const embed = msg.embeds.at(0)
                const newmsg = await interaction.reply({ embeds: [embed], fetchReply: true })
                ce[interaction.guild.id][interaction.user.id] = newmsg.id
                fs.writeFileSync('./customembeds.json', JSON.stringify(ce, null, 2), 'utf8')
                break
            }
            case 'send': {
                if (!ce[interaction.guild.id] || !ce[interaction.guild.id][interaction.user.id]) return interaction.reply({ content: 'Du besitzt keinen Embed', ephemeral: true })
                const msgid = ce[interaction.guild.id][interaction.user.id]
                const msg = await interaction.channel.messages.fetch(msgid)
                const embed = msg.embeds.at(0)
                const channel = interaction.options.getChannel('channel')
                delete ce[interaction.guild.id][interaction.user.id]
                channel.send({ embeds: [embed] })
                fs.writeFileSync('./customembeds.json', JSON.stringify(ce, null, 2), 'utf8')
                interaction.reply({ content: 'Der Embed wurde gesendet', ephemeral: true })
                break
            }
            case 'delete': {
                if (!ce[interaction.guild.id] || !ce[interaction.guild.id][interaction.user.id]) return interaction.reply({ content: 'Du besitzt keinen Embed', ephemeral: true })
                delete ce[interaction.guild.id][interaction.user.id]
                fs.writeFileSync('./customembeds.json', JSON.stringify(ce, null, 2))
                interaction.reply({ content: 'Dein Embed wurde gelöscht.', ephemeral: true })
                break
            }
        }
        switch (group) {
            case 'edit': {
                if (!ce[interaction.guild.id] || !ce[interaction.guild.id][interaction.user.id]) return interaction.reply({ content: 'Du besitzt keinen Embed', ephemeral: true })
                switch (subcommand) {
                    case 'title': {
                        const title = interaction.options.getString('string')
                        const msgid = ce[interaction.guild.id][interaction.user.id]
                        let msg = await interaction.channel.messages.fetch(msgid)
                        let embed = msg.embeds.at(0)
                        embed.data.title = title
                        msg.edit({ embeds: [embed] })
                        interaction.reply({ content: 'Erledigt', ephemeral: true })
                        break
                    }
                    case 'description': {
                        const description = interaction.options.getString('string')
                        const newDescription = description.replace(/\\n/g, '\n');
                        const msgid = ce[interaction.guild.id][interaction.user.id]
                        const msg = await interaction.channel.messages.fetch(msgid)
                        let embed = msg.embeds.at(0)
                        embed.data.description = newDescription
                        msg.edit({ embeds: [embed] })
                        interaction.reply({ content: 'Erledigt', ephemeral: true })
                        break
                    }
                    case 'color': {
                        const code = interaction.options.getString('colorcode')
                        const valid = /^#([A-Fa-f0-9]{6})$/.test(code)
                        if (!valid) return interaction.reply({ content: 'Dein eingegebener Color Code ist ungültig.', ephemeral: true })
                        const msgid = ce[interaction.guild.id][interaction.user.id]
                        const msg = await interaction.channel.messages.fetch(msgid)
                        let embed = msg.embeds.at(0)
                        embed.data.color = parseInt(code.replace('#', ''), 16)
                        msg.edit({ embeds: [embed] })
                        interaction.reply({ content: 'Erfolgreich', ephemeral: true })
                        break
                    }
                    case 'fields': {
                        const fieldnr = parseInt(interaction.options.getNumber('feldnr') - 1)
                        const name = interaction.options.getString('name')
                        const value = interaction.options.getString('value')
                        const newValue = value.replace(/\\n/g, '\n');
                        const msgid = ce[interaction.guild.id][interaction.user.id]
                        let msg = await interaction.channel.messages.fetch(msgid)
                        let embed = msg.embeds[0]
                        if (fieldnr >= embed.fields.length) {
                            let fields = embed.fields
                            embed.fields = undefined
                            fields.push({ name: name, value: newValue })
                            msg.edit({ embeds: [embed] })
                            const emb = new EmbedBuilder(embed)
                                .setFields(fields)
                            msg.edit({ embeds: [emb] })

                        } else {
                            embed.fields[fieldnr].name = name
                            embed.fields[fieldnr].value = newValue
                            msg.edit({ embeds: [embed] })
                        }

                        interaction.reply({ content: 'Erledigt', ephemeral: true })
                        break
                    }
                    case 'image': {
                        const url = interaction.options.getString('url')
                        const msgid = ce[interaction.guild.id][interaction.user.id]
                        let msg = await interaction.channel.messages.fetch(msgid)
                        let embed = msg.embeds[0]
                        const emb = new EmbedBuilder(embed)
                            .setImage(url)
                        msg.edit({ embeds: [emb] })
                        interaction.reply({ content: 'Erledigt', ephemeral: true })
                        break;
                    }
                    case 'author': {
                        const msgid = ce[interaction.guild.id][interaction.user.id]
                        let msg = await interaction.channel.messages.fetch(msgid)
                        let embed = msg.embeds[0]
                        const emb = new EmbedBuilder(embed)
                        const name = interaction.options.getString('name')
                        const url = interaction.options.getString('iconurl')

                        if(url){
                            emb.setAuthor({name: `${name}`, iconURL: `${url}`})
                        }else{
                            emb.setAuthor({name: `${name}`})
                        }


                        msg.edit({embeds: [emb]})
                        interaction.reply({content: 'Erledigt', ephemeral: true})
                        break;
                    }
                }
            }
        }
    }
}
