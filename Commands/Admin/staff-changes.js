const { CommandInteraction, EmbedBuilder, Client, ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits, } = require('discord.js')
const assistent = '1196522075691679754',
    dev = '1146117778483450048',
    admin = '1146113684570124344',
    tadmin = '1190695364584538122',
    mod = '1147206142548787372',
    tmod = '1146113684570124343',
    sup = '1148217519631499384',
    tsup = '1146113684570124342',
    teammitglied = '1146116364243832963',
    mcadmin = '1159470517070348343',
    testphase = '1174018919175041135',
    mcdev = '1180774062285394033',
    mcmod = '1179113823232331786',
    mcbuilder = '1174018914448064552',
    mcsup = '1174016316059959326',
    staff = '1156298949301379212'

module.exports = {
    name: 'staff',
    description: 'Gib eine Teamänderung preis',
    dev: true,
    disabled: false,
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
                        { name: 'Test Supporter', value: tsup },
                        { name: 'Test Moderator', value: tmod },
                        { name: 'Developer', value: dev },
                        { name: 'Testphase im Team', value: testphase },
                        { name: 'Minecraft Server Developer', value: mcdev },
                        { name: 'Minecraft Server Moderator', value: mcmod },
                        { name: 'Minecraft Server Builder', value: mcbuilder },
                        { name: 'Minecraft Server Supporter', value: mcsup },
                        { name: 'Minecraft Server Admin', value: mcadmin }
                    ],
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Gib den Grund für die Aufnahme ein',
                    type: ApplicationCommandOptionType.String
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
                        { name: 'Test Supporter', value: tsup },
                        { name: 'Test Moderator', value: tmod },
                        { name: 'Testphase im Team', value: testphase },
                        { name: 'Teammitglied', value: teammitglied },
                        { name: 'Test Admin', value: tadmin },
                        { name: 'Developer', value: dev },
                        { name: 'Supporter', value: sup },
                        { name: 'Moderator', value: mod },
                        { name: 'Minecraft Server Developer', value: mcdev },
                        { name: 'Minecraft Server Supporter', value: mcsup },
                        { name: 'Minecraft Server Moderator', value: mcmod },
                    ],
                    required: true
                },
                {
                    name: 'next',
                    description: 'Zu welchem Rang wurde der User befördert?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'Teammitglied', value: teammitglied },
                        { name: 'Test Admin', value: tadmin },
                        { name: 'Admin', value: admin },
                        { name: 'Assistent', value: assistent },
                        { name: 'Developer', value: dev },
                        { name: 'Supporter', value: sup },
                        { name: 'Moderator', value: mod },
                        { name: 'Minecraft Server Developer', value: mcdev },
                        { name: 'Minecraft Server Supporter', value: mcsup },
                        { name: 'Minecraft Server Moderator', value: mcmod },
                        { name: 'Minecraft Server Admin', value: mcadmin },
                        { name: 'Minecraft Server Builder', value: mcbuilder }
                    ],
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Gib den Grund für den Uprank ein',
                    type: ApplicationCommandOptionType.String
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
                        { name: 'Test Supporter', value: tsup },
                        { name: 'Test Moderator', value: tmod },
                        { name: 'Teammitglied', value: teammitglied },
                        { name: 'Test Admin', value: tadmin },
                        { name: 'Admin', value: admin },
                        { name: 'Assistent', value: assistent },
                        { name: 'Developer', value: dev },
                        { name: 'Supporter', value: sup },
                        { name: 'Moderator', value: mod },
                        { name: 'Minecraft Server Developer', value: mcdev },
                        { name: 'Minecraft Server Supporter', value: mcsup },
                        { name: 'Minecraft Server Moderator', value: mcmod },
                        { name: 'Minecraft Server Admin', value: mcadmin },
                        { name: 'Minecraft Server Builder', value: mcbuilder }
                    ],
                    required: true,
                },
                {
                    name: 'next',
                    description: 'Zu welchem Rang wurde der User degradiert?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'Teammitglied', value: teammitglied },
                        { name: 'Admin', value: admin },
                        { name: 'Assistent', value: assistent },
                        { name: 'Developer', value: dev },
                        { name: 'Supporter', value: sup },
                        { name: 'Moderator', value: mod },
                        { name: 'Minecraft Server Developer', value: mcdev },
                        { name: 'Minecraft Server Supporter', value: mcsup },
                        { name: 'Minecraft Server Moderator', value: mcmod },
                        { name: 'Minecraft Server Admin', value: mcadmin },
                        { name: 'Minecraft Server Builder', value: mcbuilder }
                    ],
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Gib den Grund für den Downrank ein',
                    type: ApplicationCommandOptionType.String
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
                        { name: 'Test Supporter', value: tsup },
                        { name: 'Test Moderator', value: tmod },
                        { name: 'Teammitglied', value: teammitglied },
                        { name: 'Test Admin', value: tadmin },
                        { name: 'Admin', value: admin },
                        { name: 'Assistent', value: assistent },
                        { name: 'Developer', value: dev },
                        { name: 'Supporter', value: sup },
                        { name: 'Moderator', value: mod },
                        { name: 'Minecraft Server Developer', value: mcdev },
                        { name: 'Minecraft Server Supporter', value: mcsup },
                        { name: 'Minecraft Server Moderator', value: mcmod },
                        { name: 'Minecraft Server Admin', value: mcadmin },
                        { name: 'Minecraft Server Builder', value: mcbuilder }
                    ],
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Gib den Grund für den Kick ein',
                    type: ApplicationCommandOptionType.String
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
                        { name: 'Test Supporter', value: tsup },
                        { name: 'Test Moderator', value: tmod },
                        { name: 'Teammitglied', value: teammitglied },
                        { name: 'Test Admin', value: tadmin },
                        { name: 'Admin', value: admin },
                        { name: 'Assistent', value: assistent },
                        { name: 'Developer', value: dev },
                        { name: 'Supporter', value: sup },
                        { name: 'Moderator', value: mod },
                        { name: 'Minecraft Server Developer', value: mcdev },
                        { name: 'Minecraft Server Supporter', value: mcsup },
                        { name: 'Minecraft Server Moderator', value: mcmod },
                        { name: 'Minecraft Server Admin', value: mcadmin },
                        { name: 'Minecraft Server Builder', value: mcbuilder }
                    ],
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Gib den Grund für den Leave ein',
                    type: ApplicationCommandOptionType.String
                }
            ]
        }
    ],

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const channel = interaction.guild.channels.cache.get('1182852409198903316')
        const ping = '<@&1148638515840700497>'
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case 'add': {
                const user = interaction.options.getUser('user')
                const member = interaction.options.getMember('user')
                const role = interaction.options.getString('role')
                const reason = interaction.options.getString('reason') || '*Nicht angegeben*'
                const embed = new EmbedBuilder({
                    title: 'Neues Teammitglied',
                    fields: [
                        { name: `User`, value: `${user}` },
                        { name: 'Wird uns unterstützen als', value: `<@&${role}>` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0x00d12a
                })
                member.roles.add([staff, role])
                channel.send({ content: ping, embeds: [embed] })
                interaction.reply({ content: `${user} wurde als <@&${role}> aufgenommen`, ephemeral: true })
                break;
            }
            case 'uprank': {
                const user = interaction.options.getUser('user'),
                    member = interaction.options.getMember('user'),
                    previous = interaction.options.getString('previous'),
                    next = interaction.options.getString('next');
                const reason = interaction.options.getString('reason') || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Uprank',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Vorheriger Rang', value: `<@&${previous}>` },
                        { name: 'Neuer Rang', value: `<@&${next}>` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0x00d12a
                })
                member.roles.remove([previous])
                member.roles.add([next])
                channel.send({ content: ping, embeds: [embed] })
                interaction.reply({ content: `${user} wurde von <@&${previous}> zu <@&${next}> befördert`, ephemeral: true })
                break;
            }
            case 'downrank': {
                const user = interaction.options.getUser('user'),
                    member = interaction.options.getMember('user'),
                    previous = interaction.options.getString('previous'),
                    next = interaction.options.getString('next')
                const reason = interaction.options.getString('reason') || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Downrank',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Vorheriger Rang', value: `<@&${previous}>` },
                        { name: 'Neuer Rang', value: `<@&${next}>` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0xc92816
                })
                member.roles.remove([previous])
                member.roles.add([next])
                channel.send({ content: ping, embeds: [embed] })
                interaction.reply({ content: `${user} wurde von <@&${previous}> zu <@&${next}> degradiert`, ephemeral: true })
                break;
            }
            case 'kick': {
                const user = interaction.options.getUser('user'),
                    member = interaction.options.getMember('user'),
                    role = interaction.options.getString('role')
                const reason = interaction.options.getString('reason') || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Kick',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Ehemalig tätig als', value: `<@&${role}>` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0xc92816
                })
                member.roles.remove([role, staff])
                channel.send({ content: ping, embeds: [embed] })
                interaction.reply({ content: `${user} wurde als <@&${role}> aus dem Team geworfen`, ephemeral: true })
                break;
            }
            case 'leave': {
                const user = interaction.options.getUser('user'),
                    member = interaction.options.getMember('user'),
                    role = interaction.options.getString('role');
                const reason = interaction.options.getString('reason') || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Leave',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Ehemalig tätig als', value: `<@&${role}>` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0xc92816
                })
                member.roles.remove([role, staff])
                channel.send({ content: ping, embeds: [embed] })
                interaction.reply({ content: `${user} hat das Team als <@&${role}> verlassen`, ephemeral: true })
                break;
            }
        }
    }
}