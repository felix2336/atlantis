import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, GuildMember, TextChannel, Colors } from 'discord.js'
import { Channels } from 'contents'
import { SlashCommand } from 'dcbot'
import Warns from '../../Schemas/warns'

/**
 * Befehl zum Warnen eines Users
 */
export default new SlashCommand({
    /**
     * Definition des Befehls
     */
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warne einen User')
        .addUserOption(input => input.setName('user').setDescription('Der User der gewarnt werden soll').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für den Warn').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    /**
     * Ausführung des Befehls
     * @param interaction
     */
    async execute(interaction) {
        // Grund für den Warn
        const reason = interaction.options.get('reason', true).value as string
        // Der User, der gewarnt werden soll
        const member = interaction.options.getMember('user') as GuildMember
        // Der Channel, in dem der Warn-Log gesendet wird
        const channel = interaction.guild!.channels.cache.get(Channels.warn) as TextChannel

        // Überprüfe, ob der User bereits Warns hat
        await Warns.findOne({ userId: member.user.id })
            .then(async User => {
                if (User) {
                    // Wenn der User bereits Warns hat, füge eine neue Warn hinzu
                    User.warns.push({
                        date: new Date().toLocaleDateString('ru'),
                        id: generateWarnId(),
                        moderator: interaction.user.username,
                        reason: reason
                    })
                    await User.save()
                } else {
                    // Wenn der User keine Warns hat, erstelle einen neuen Eintrag
                    const User = new Warns({
                        userId: member.user.id,
                        warns: [{
                            date: new Date().toLocaleDateString('ru'),
                            id: generateWarnId(),
                            moderator: interaction.user.username,
                            reason: reason
                        }]
                    })
                    await User.save()
                }
            })

        // Erstelle den Embed für den Warn-Log
        const embed = new EmbedBuilder({
            title: 'User gewarnt',
            description: `<a:redlight:1211374559224135700> ${member} wurde von ${interaction.user.username} gewarnt\nGrund: **${reason}**`,
            color: Colors.Red
        })

        // Erstelle den Embed für die Direktnachricht an den User
        const dmEmbed = new EmbedBuilder({
            author: { name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' },
            title: 'Du wurdest gewarnt',
            fields: [
                { name: 'Moderator', value: `${interaction.user} (${interaction.user.username})` },
                { name: 'Grund', value: reason }
            ]
        })

        // Sende den Warn-Log in den Channel
        await channel.send({ embeds: [embed] })
        // Sende eine Bestätigung an den Moderator
        interaction.reply({ content: `Du hast ${member} gewarnt!\nGrund: **${reason}**`, ephemeral: true })
        // Sende eine Direktnachricht an den User
        await member.send({ embeds: [dmEmbed] }).catch(console.log)
    }
})

/**
 * Generiert eine eindeutige ID für die Warn
 * @returns {string}
 */
function generateWarnId(): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
    let id: string = "";

    for (let index = 0; index < 5; index++) {
        const randIndex = Math.floor(Math.random() * charset.length)
        id += charset.charAt(randIndex)
    }

    return id;
}
