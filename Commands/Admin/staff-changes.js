const { CommandInteraction, EmbedBuilder, Client, ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: 'staff',
    description: 'Gib eine Teamänderung preis',
    dev: true,
    permission: 'Administrator',
    options: [
        {
            name: 'add',
            description: 'Gib eine Meldung, dass ein Teammitglied aufgenommen wurde',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'Welcher User, wurde ins Team aufgenommen?',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'role',
                    description: 'Als was wird uns dieser User unterstützen?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'Test Supporter',
                            value: '1146113684570124342'
                        },
                        {
                            name: 'Test Moderator',
                            value: '1146113684570124343'
                        },
                        {
                            name: 'Test Eventler',
                            value: '1174018919175041135'
                        },
                        {
                            name: 'Test Marketing',
                            value: '1174018688383463515'
                        },
                        {
                            name: 'Teammitglied',
                            value: '1146116364243832963'
                        }
                    ],
                    required: true
                }
            ]
        },
        {
            name: 'uprank',
            description: 'Wenn ein Teamler ein Uprank erhält',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'Welcher User erhält ein Uprank?',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'previous',
                    description: 'Welchen Rang hatte der User vor der Beförderung?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'Test Supporter',
                            value: '1146113684570124342'
                        },
                        {
                            name: 'Test Moderator',
                            value: '1146113684570124343'
                        },
                        {
                            name: 'Test Eventler',
                            value: '1174018919175041135'
                        },
                        {
                            name: 'Test Marketing',
                            value: '1174018688383463515'
                        },
                        {
                            name: 'Teammitglied',
                            value: '1146116364243832963'
                        },
                        {
                            name: 'Supporter',
                            value: '1148217519631499384'
                        },
                        {
                            name: 'Moderator',
                            value: '1147206142548787372'
                        },
                        {
                            name: 'Marketing',
                            value: '1174016316059959326'
                        },
                        {
                            name: 'Eventler',
                            value: '1174018914448064552'
                        }
                    ],
                    required: true
                },
                {
                    name: 'next',
                    description: 'Zu welchem Rang wurde der User befördert?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'Supporter',
                            value: '1148217519631499384'
                        },
                        {
                            name: 'Moderator',
                            value: '1147206142548787372'
                        },
                        {
                            name: 'Marketing',
                            value: '1174016316059959326'
                        },
                        {
                            name: 'Eventler',
                            value: '1174018914448064552'
                        },
                        {
                            name: 'Admin',
                            value: '1146113684570124344'
                        },
                    ],
                    required: true
                }
            ],
        },
        {
            name: 'downrank',
            description: 'Wenn ein Teamler ein Downrank erhält',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'Welcher User erhält ein Downrank?',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'previous',
                    description: 'Welchen Rang hatte der User vor der Degradierung?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'Supporter',
                            value: '1148217519631499384'
                        },
                        {
                            name: 'Moderator',
                            value: '1147206142548787372'
                        },
                        {
                            name: 'Marketing',
                            value: '1174016316059959326'
                        },
                        {
                            name: 'Eventler',
                            value: '1174018914448064552'
                        },
                        {
                            name: 'Admin',
                            value: '1146113684570124344'
                        },
                    ],
                    required: true,
                },
                {
                    name: 'next',
                    description: 'Zu welchem Rang wurde der User degradiert?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'Test Supporter',
                            value: '1146113684570124342'
                        },
                        {
                            name: 'Test Moderator',
                            value: '1146113684570124343'
                        },
                        {
                            name: 'Test Eventler',
                            value: '1174018919175041135'
                        },
                        {
                            name: 'Test Marketing',
                            value: '1174018688383463515'
                        },
                        {
                            name: 'Teammitglied',
                            value: '1146116364243832963'
                        },
                        {
                            name: 'Supporter',
                            value: '1148217519631499384'
                        },
                        {
                            name: 'Moderator',
                            value: '1147206142548787372'
                        },
                        {
                            name: 'Marketing',
                            value: '1174016316059959326'
                        },
                        {
                            name: 'Eventler',
                            value: '1174018914448064552'
                        }
                    ],
                    required: true
                }
            ]
        },
        {
            name: 'kick',
            description: 'Wenn ein User aus dem Team gekickt wurde',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'Welcher User wurde aus dem Team geworfen?',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: 'role',
                    description: 'Als was war der User im Team tätig?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'Test Supporter',
                            value: '1146113684570124342'
                        },
                        {
                            name: 'Test Moderator',
                            value: '1146113684570124343'
                        },
                        {
                            name: 'Test Eventler',
                            value: '1174018919175041135'
                        },
                        {
                            name: 'Test Marketing',
                            value: '1174018688383463515'
                        },
                        {
                            name: 'Teammitglied',
                            value: '1146116364243832963'
                        },
                        {
                            name: 'Supporter',
                            value: '1148217519631499384'
                        },
                        {
                            name: 'Moderator',
                            value: '1147206142548787372'
                        },
                        {
                            name: 'Marketing',
                            value: '1174016316059959326'
                        },
                        {
                            name: 'Eventler',
                            value: '1174018914448064552'
                        },
                        {
                            name: 'Admin',
                            value: '1146113684570124344'
                        }
                    ],
                    required: true
                }
            ]
        },
        {
            name: 'leave',
            description: 'Wenn ein Teamler das Team verlassen hat',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'Welcher User hat das Team verlassen?',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: 'role',
                    description: 'Als was war der User im Team tätig?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'Test Supporter',
                            value: '1146113684570124342'
                        },
                        {
                            name: 'Test Moderator',
                            value: '1146113684570124343'
                        },
                        {
                            name: 'Test Eventler',
                            value: '1174018919175041135'
                        },
                        {
                            name: 'Test Marketing',
                            value: '1174018688383463515'
                        },
                        {
                            name: 'Teammitglied',
                            value: '1146116364243832963'
                        },
                        {
                            name: 'Supporter',
                            value: '1148217519631499384'
                        },
                        {
                            name: 'Moderator',
                            value: '1147206142548787372'
                        },
                        {
                            name: 'Marketing',
                            value: '1174016316059959326'
                        },
                        {
                            name: 'Eventler',
                            value: '1174018914448064552'
                        },
                        {
                            name: 'Admin',
                            value: '1146113684570124344'
                        }
                    ],
                    required: true
                }
            ]
        }
    ],

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const channel = interaction.guild.channels.cache.get('1178073046444163102')
        const ping = 'PING'
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case 'add': {
                const user = interaction.options.getUser('user')
                const role = interaction.options.getString('role')
                const embed = new EmbedBuilder({
                    title: 'Neues Teammitglied',
                    fields: [
                        { name: `User`, value: `${user}` },
                        { name: 'Wird uns unterstützen als', value: `<@&${role}>` }
                    ],
                    color: 0x00d12a
                })
                channel.send({ content: ping, embeds: [embed] })
                break;
            }
            case 'uprank': {
                const user = interaction.options.getUser('user'),
                    previous = interaction.options.getString('previous'),
                    next = interaction.options.getString('next');

                const embed = new EmbedBuilder({
                    title: 'Team Uprank',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Vorheriger Rang', value: `<@&${previous}>` },
                        { name: 'Neuer Rang', value: `<@&${next}>` },
                    ],
                    color: 0x00d12a
                })
                channel.send({ content: ping, embeds: [embed] })
                break;
            }
            case 'downrank': {
                const user = interaction.options.getUser('user'),
                    previous = interaction.options.getString('previous'),
                    next = interaction.options.getString('next')

                const embed = new EmbedBuilder({
                    title: 'Team Downrank',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Vorheriger Rang', value: `<@&${previous}>` },
                        { name: 'Neuer Rang', value: `<@&${next}>` },
                    ],
                    color: 0xc92816
                })
                channel.send({ content: ping, embeds: [embed] })
                break;
            }
            case 'kick': {
                const user = interaction.options.getUser('user'),
                    role = interaction.options.getString('role')

                const embed = new EmbedBuilder({
                    title: 'Team Kick',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Ehemalig tätig als', value: `<@&${role}>` }
                    ],
                    color: 0xc92816
                })
                channel.send({ content: ping, embeds: [embed] })
                break;
            }
            case 'leave': {
                const user = interaction.options.getUser('user'),
                    role = interaction.options.getString('role')

                const embed = new EmbedBuilder({
                    title: 'Team Leave',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Ehemalig tätig als', value: `<@&${role}>` }
                    ],
                    color: 0xc92816
                })
                channel.send({ content: ping, embeds: [embed] })
                break;
            }
        }
    }
}