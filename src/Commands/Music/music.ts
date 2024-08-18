import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember, Colors } from 'discord.js'
import { SlashCommand } from 'dcbot'
import { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnection, AudioPlayerStatus } from '@discordjs/voice'
import ytdl from 'ytdl-core-discord'
import ytsr from 'ytsr'
import { MyClient } from 'contents'

export default new SlashCommand<MyClient>( {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Nutze die Musikfunktion')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(cmd => cmd
            .setName('play')
            .setDescription('Füge einen Song zur Warteschlange hinzu')
            .addStringOption(option => option.setName('songinfo').setDescription('Songname und bestenfalls Interpret').setRequired(true)),
        )
        .addSubcommand(cmd => cmd
            .setName('queue')
            .setDescription('Zeigt die aktuelle Warteschlange an')
        )
        .addSubcommand(cmd => cmd
            .setName('skip')
            .setDescription('Überspringe den aktuellen Song')
        )
        .addSubcommand(cmd => cmd
            .setName('exit')
            .setDescription('Beende die Wiedergabe und der Bot verlässt den Sprachkanal')
        )
        .addSubcommand(cmd => cmd
            .setName('pause')
            .setDescription('Pausiere die Weidergabe')
        )
        .addSubcommand(cmd => cmd
            .setName('resume')
            .setDescription('Setze die Wiedergabe fort')
        ),

    async execute(interaction, client) {
	console.log(client)
        try {
            let embed = new EmbedBuilder()
            const member = interaction.member as GuildMember
            const clientMember = await interaction.guild!.members.fetch(client.user!.id)

            if (!member.voice.channel) {
                interaction.reply({ content: 'Du musst dich in einem Sprachkanal befinden!', ephemeral: true });``
                return 
            }
            if (clientMember.voice.channel) {
                if (member.voice.channelId != clientMember.voice.channelId) {
                interaction.reply({ content: 'Um Musik zu steuern, musst du im selben Sprachkanal sein, wie der Bot!', ephemeral: true })
                return
                }
            }

            const sub = interaction.options.getSubcommand()

            const connection = joinVoiceChannel({
                channelId: member.voice.channelId!,
                guildId: member.guild.id!,
                adapterCreator: member.guild.voiceAdapterCreator
            })

            if (sub == 'play') {
                const search = interaction.options.getString('songinfo', true)

                const song = (await ytsr(search, { limit: 1 })).items[0]
                if (!song) {
                    interaction.reply({ content: 'Es wurde kein Song gefunden!', ephemeral: true })
                    return
                }
                const songInfo = {
                    //@ts-ignore
                    title: song.title as string,
                    //@ts-ignore
                    url: song.url as string,
                    //@ts-ignore
                    thumbnail: song.bestThumbnail.url as string,
                    //@ts-ignore
                    duration: song.duration as string
                }

                client.queue.push(songInfo)

                if (client.queue.length == 1) {
                    try {
                        const stream = await ytdl(client.queue[0].url)
                        const resource = createAudioResource(stream)
                        client.player.play(resource)
                        connection.subscribe(client.player)
                        embed
                            .setDescription(`Ich habe **[${songInfo.title}](${songInfo.url})** erfolgreich zur Warteschlange hinzugefügt!`)
                            //@ts-ignore
                            .setThumbnail(song.bestThumbnail.url)
                            //@ts-ignore
                            .setFooter({ text: `Länge: ${song.duration}` })
                            .setColor(Colors.Gold)
                    } catch (e) {
                        embed.setDescription(`Ein Fehler ist aufgetreten!`)
                        interaction.reply({ embeds: [embed] })
                        return;
                    }
                }
                embed
                    .setDescription(`Ich habe **[${songInfo.title}](${songInfo.url})** erfolgreich zur Warteschlange hinzugefügt!`)
                    //@ts-ignore
                    .setThumbnail(song.bestThumbnail.url)
                    //@ts-ignore
                    .setFooter({ text: `Länge: ${song.duration}` })
                    .setColor(Colors.Gold)

                interaction.reply({ embeds: [embed] });

            } else if (sub == 'queue') {
                if (!clientMember.voice.channel) {
                    interaction.reply({ content: 'Ich bin momentan nicht in einem Sprachkanal!', ephemeral: true })
                    return
                }
                const embed = new EmbedBuilder({
                    title: 'Warteschlange',
                    description: client.queue.map((song, i) => {
                        return `**${i})** **[${song.title}](${song.url})** \`${song.duration}\``
                    }).join('\n'),
                    color: Colors.Gold
                })

                interaction.reply({ embeds: [embed] })
            } else if (sub == 'skip') {
                if (!clientMember.voice.channel) {
                    interaction.reply({ content: 'Ich bin momentan nicht in einem Sprachkanal!', ephemeral: true })
                    return
                }

                client.queue.shift()
                if (client.queue.length > 0) {
                    const nextStream = await ytdl(client.queue[0].url)
                    const nextResource = createAudioResource(nextStream)
                    client.player.play(nextResource);
                    embed
                        .setDescription(`Ich spiele jetzt **[${client.queue[0].title}](${client.queue[0].url})**`)
                        .setColor(Colors.Gold)
                        .setThumbnail(client.queue[0].thumbnail)
                        .setFooter({ text: 'Länge: ' + client.queue[0].duration })

                    interaction.reply({ embeds: [embed] })

                } else {
                    client.queue = []
                    embed
                        .setDescription('Da keine weiteren Songs in der Warteschlange sind, kann ich nichts abspielen!')
                        .setColor(Colors.Gold)

                    interaction.reply({ embeds: [embed] })
                }

            } else if (sub == 'exit') {
                if (!clientMember.voice.channel) {
                    interaction.reply({ content: 'Ich bin momentan nicht in einem Sprachkanal!', ephemeral: true })
                    return
                }
                client.queue = []
                connection.destroy()
                embed
                    .setDescription('Ich habe den Sprachkanal verlassen!')
                    .setColor(Colors.Gold);

                interaction.reply({ embeds: [embed] })
            } else if (sub == 'pause') {
                if (!clientMember.voice.channel) {
                    interaction.reply({ content: 'Ich bin momentan nicht in einem Sprachkanal!', ephemeral: true })
                    return
                }

                const paused = client.player.pause(true)
                if (paused) {
                    embed
                        .setColor(Colors.Gold)
                        .setDescription('Wiedergabe erfolgreich pausiert!')

                    interaction.reply({ embeds: [embed] })
                } else {
                    embed
                        .setColor(Colors.Gold)
                        .setDescription('Wiedergabe konnte nicht pausiert werden!')

                    interaction.reply({ embeds: [embed] })
                }
            } else if (sub == 'resume') {
                if (!clientMember.voice.channel) {
                    interaction.reply({ content: 'Ich bin momentan nicht in einem Sprachkanal!', ephemeral: true })
                    return
                }

                const resumed = client.player.unpause()
                if (resumed) {
                    embed
                        .setColor(Colors.Gold)
                        .setDescription('Wiedergabe erfolgreich gestartet!')

                    interaction.reply({ embeds: [embed] })
                } else {
                    embed
                        .setColor(Colors.Gold)
                        .setDescription('Wiedergabe konnte nicht gestartet werden!')

                    interaction.reply({ embeds: [embed] })
                }
            }
        } catch(e) {
            console.log(e)
            interaction.reply({content: 'Etwas ist schiefgelaufen! Bitte versuche es erneut', ephemeral: true})
        }
    },
})
