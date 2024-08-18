import { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, Role, TextChannel } from 'discord.js'
import { SlashCommand } from 'dcbot'
import { MyClient } from 'contents'

export default new SlashCommand<MyClient>({
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Gib eine Teamänderung preis')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(input => input
            .setName('add')
            .setDescription('Gib eine Meldung, dass ein Teammitglied aufgenommen wurde')
            .addUserOption(input => input.setName('user').setDescription('Welcher user wurde ins Team aufgenommen?').setRequired(true))
            .addRoleOption(input => input.setName('role').setDescription('Als was wird uns dieser User unterstützen?').setRequired(true))
            .addStringOption(input => input.setName('reason').setDescription('Warum wurde dieser User ins Team aufgenommen?'))
        )
        .addSubcommand(input => input
            .setName('uprank')
            .setDescription('Gib eine Meldung, dass ein Teammitglied befördert wurde')
            .addUserOption(input => input.setName('user').setDescription('Welcher user wurde befördert?').setRequired(true))
            .addRoleOption(input => input.setName('previous').setDescription('Welchen Rang hatte der User vor der Beförderung?').setRequired(true))
            .addRoleOption(input => input.setName('next').setDescription('Welchen Rang hat der User jetzt?').setRequired(true))
            .addStringOption(input => input.setName('reason').setDescription('Warum wurde dieser User befördert?'))
        )
        .addSubcommand(input => input
            .setName('downrank')
            .setDescription('Gib eine Meldung, dass ein Teammitglied degradiert wurde')
            .addUserOption(input => input.setName('user').setDescription('Welcher user wurde degradiert?').setRequired(true))
            .addRoleOption(input => input.setName('previous').setDescription('Welchen Rang hatte der User vor der Degradierung?').setRequired(true))
            .addRoleOption(input => input.setName('next').setDescription('Welchen Rang hat der User jetzt?').setRequired(true))
            .addStringOption(input => input.setName('reason').setDescription('Warum wurde dieser User degradiert?'))
        )
        .addSubcommand(input => input
            .setName('kick')
            .setDescription('Gib eine Meldung, dass ein Teammitglied gekickt wurde')
            .addUserOption(input => input.setName('user').setDescription('Welcher user wurde aus dem Team geworfen?').setRequired(true))
            .addRoleOption(input => input.setName('role').setDescription('Als hat uns dieser User unterstützt?').setRequired(true))
            .addStringOption(input => input.setName('reason').setDescription('Warum wurde dieser User ins Team aufgenommen?'))
        )
        .addSubcommand(input => input
            .setName('leave')
            .setDescription('Gib eine Meldung, dass ein Teammitglied das Team verlassen hat')
            .addUserOption(input => input.setName('user').setDescription('Welcher user hat das Team verlassen?').setRequired(true))
            .addRoleOption(input => input.setName('role').setDescription('Als was wird hat uns dieser User unterstützt?').setRequired(true))
            .addStringOption(input => input.setName('reason').setDescription('Warum hat dieser User das Team verlassen?'))
        ),

    async execute(interaction, client) {
        const channel = client.guild.channels.cache.get('1182852409198903316') as TextChannel
        const ping = '<@&1148638515840700497>'
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case 'add': {
                const user = interaction.options.getUser('user')
                //@ts-ignore
                const role = interaction.options.getRole('role') as Role
                const reason = interaction.options.get('reason')?.value as string || '*Nicht angegeben*'
                const embed = new EmbedBuilder({
                    title: 'Neues Teammitglied',
                    fields: [
                        { name: `User`, value: `${user}` },
                        { name: 'Wird uns unterstützen als', value: `${role}` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0x00d12a
                })
                SendAndReply(embed, ping, 'Die Meldung wurde erfolgreich gesendet')
                break;
            }
            case 'uprank': {
                const user = interaction.options.getUser('user')
                //@ts-ignore
                const previous = interaction.options.getRole('previous') as Role
                //@ts-ignore
                const next = interaction.options.getRole('next') as Role
                const reason = interaction.options.get('reason')?.value as string || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Uprank',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Vorheriger Rang', value: `${previous}` },
                        { name: 'Neuer Rang', value: `${next}` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0x00d12a
                })
                SendAndReply(embed, ping, 'Die Meldung wurde erfolgreich gesendet')
                break;
            }
            case 'downrank': {
                const user = interaction.options.getUser('user')
                //@ts-ignore
                const previous = interaction.options.getRole('previous') as Role
                //@ts-ignore
                const next = interaction.options.getRole('next') as Role
                const reason = interaction.options.get('reason')?.value as string || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Downrank',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Vorheriger Rang', value: `${previous}` },
                        { name: 'Neuer Rang', value: `${next}` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0xc92816
                })
                SendAndReply(embed, ping, 'Die Meldung wurde erfolgreich gesendet')
                break;
            }
            case 'kick': {
                const user = interaction.options.getUser('user')
                //@ts-ignore
                const role = interaction.options.getRole('role') as Role
                const reason = interaction.options.get('reason')?.value as string || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Kick',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Ehemalig tätig als', value: `${role}` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0xc92816
                })
                SendAndReply(embed, ping, 'Die Meldung wurde erfolgreich gesendet')
                break;
            }
            case 'leave': {
                const user = interaction.options.getUser('user')
                //@ts-ignore
                const role = interaction.options.getRole('role') as Role
                const reason = interaction.options.get('reason')?.value as string || '*Nicht angegeben*'

                const embed = new EmbedBuilder({
                    title: 'Team Leave',
                    fields: [
                        { name: 'User', value: `${user}` },
                        { name: 'Ehemalig tätig als', value: `${role}` },
                        { name: 'Grund', value: `${reason}` }
                    ],
                    color: 0xc92816
                })
                SendAndReply(embed, ping, 'Die Meldung wurde erfolgreich gesendet')
                break;
            }
        }

        function SendAndReply(embed: EmbedBuilder, ping: string, replyMessage: string){
            channel.send({content: ping, embeds: [embed]})
            interaction.reply({content: replyMessage, ephemeral: true})
        }
    }
})