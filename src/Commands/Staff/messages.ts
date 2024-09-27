import { ChatInputCommandInteraction, Client, EmbedBuilder, Colors, GuildMember, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { MessageUser } from 'contents';
import { SlashCommand } from 'dcbot'
import { readFileSync, writeFileSync } from 'fs'
import Messages from '../../Schemas/messages';

export default new SlashCommand({
    // Daten für den Befehl
    data: new SlashCommandBuilder()
        .setName('messages')
        .setDescription("Lasse dir Nachrichten anzeigen von dir, einem anderen User oder das Leaderboard")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addSubcommand(input => input
            .setName('leaderboard')
            .setDescription('Lasse dir das Leaderboard dieser Woche anzeigen')
            .addStringOption(input => input.setName('type').setDescription('Welches Leaderboard möchtest du sehen?').addChoices(/*{ name: 'Heutiges Leaderboard', value: 'daily' },*/ { name: 'Leaderboard dieser Woche', value: 'weekly' }).setRequired(true))
        ),

    // Funktion, die ausgeführt wird, wenn der Befehl aufgerufen wird
    async execute(interaction, client) {
        // Lese die Daten aus der JSON-Datei
        let DB = JSON.parse(readFileSync('./JSON/messages.json', 'utf8')) as MessageUser[]
        const member = interaction.member as GuildMember

        // Überprüfe, ob der Benutzer die erforderliche Rolle hat
        if (!member.roles.cache.has('1156298949301379212')) {
            interaction.reply({ content: 'Du musst im Team sein, um diesen Befehl nutzen zu können', ephemeral: true })
            return
        }

        // Hole den Sub-Befehl
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand()
        const day = new Date().getDay()

        // Verarbeite den Sub-Befehl
        switch (subcommand) {
            case 'leaderboard': {
                // Hole den Typ des Leaderboards
                const type = interaction.options.getString('type')
                switch (type) {
                    case 'daily': {
                        // Erstelle das Leaderboard für den Tag
                        const leaderboard: { user: string, count: number }[] = []

                        // Durchlaufe alle Benutzer und berechne ihre Nachrichten für den Tag
                        for (const UserData of DB) {
                            const User = new MessageUser().assignData(UserData)
                            const messages = User.getMessagesOfDay(day)
                            leaderboard.push({ user: User.userid!, count: messages })
                        }

                        // Sortiere das Leaderboard
                        const sortedLeaderboard = leaderboard.sort((a, b) => b.count - a.count)
                        let message = ''

                        // Erstelle die Nachricht für das Leaderboard
                        sortedLeaderboard.forEach((user, index) => {
                            message += `\`\`${index + 1}. \`\` <@${user.user}> **• ${user.count}** Nachrichten gesendet.\n`
                        })

                        // Erstelle den Embed für das Leaderboard
                        const embed = new EmbedBuilder({
                            title: 'Daily Messages Leaderboard',
                            description: message,
                            color: Colors.Aqua
                        })

                        // Sende das Leaderboard
                        interaction.reply({ embeds: [embed] })
                        break;
                    }
                    case 'weekly': {
                        // Deferre die Antwort, um die Datenbank abzufragen
                        await interaction.deferReply()
                        let DB = await Messages.find()
                        const leaderboard: { user: string, count: number }[] = []

                        // Durchlaufe alle Benutzer und berechne ihre Nachrichten für die Woche
                        for (const User of DB) {
                            leaderboard.push({ user: User.userId, count: User.messagesSent })
                        }

                        // Sortiere das Leaderboard
                        leaderboard.sort((a, b) => b.count - a.count)
                        let message = ''

                        // Erstelle die Nachricht für das Leaderboard
                        for (let i = 0; i < leaderboard.length; i++) {
                            const entry = leaderboard[i]
                            const member = await interaction.guild!.members.fetch(entry.user)

                            // Füge den Benutzer zum Leaderboard hinzu
                            if (member.roles.cache.has('1201848061819891774')) {
                                message += `\`\`${i + 1}. \`\`⏱️ <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                            } else {
                                if (entry.count < 50) {
                                    message += `\`\`${i + 1}. \`\`<a:redlight:1211374559224135700> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                                }
                                else if (entry.count >= 50 && entry.count < 75) {
                                    message += `\`\`${i + 1}. \`\`<:dogsmile:1230441707766808608> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                                } else {
                                    message += `\`\`${i + 1}. \`\`<a:6797evolvingbadgeboost:1234205150898425898> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                                }
                            }
                        }

                        // Erstelle den Embed für das Leaderboard
                        const embed = new EmbedBuilder({
                            title: 'Weekly Messages Leaderboard',
                            description: message,
                            color: Colors.Aqua
                        })

                        // Sende das Leaderboard
                        await interaction.editReply({ embeds: [embed] })
                    }
                }
                break;
            }
        }
    }
})
