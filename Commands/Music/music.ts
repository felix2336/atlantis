import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember, Colors } from 'discord.js'
import { SlashCommand } from '../../contents'
import { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnection } from '@discordjs/voice'
import ytdl from 'ytdl-core-discord'
import ytsr from 'ytsr'

const command: SlashCommand = {
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
            .setName('stop')
            .setDescription('Beende die Wiedergabe und der Bot verlässt den Sprachkanal')
        ),

    async execute(interaction, client) {
        let embed = new EmbedBuilder()
        const member = interaction.member as GuildMember

        if (!member.voice.channel) return interaction.reply({ content: 'Du musst dich in einem Sprachkanal befinden!', ephemeral: true });

        const sub = interaction.options.getSubcommand()

        const connection = joinVoiceChannel({
            channelId: member.voice.channelId!,
            guildId: member.guild.id!,
            adapterCreator: member.guild.voiceAdapterCreator
        })

        if (sub == 'play') {
            const search = interaction.options.getString('songinfo', true)

            const song = (await ytsr(search, { limit: 1 })).items[0]
            if(!song) return interaction.reply({content: 'Es wurde kein Song gefunden!', ephemeral: true})
            const songInfo = {
                //@ts-ignore
                title: song.title as string,
                //@ts-ignore
                url: song.url as string,
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

        } else if(sub == 'queue') {
            const embed = new EmbedBuilder({
                title: 'Warteschlange',
                description: client.queue.map((song, i) => {
                    return `**${i})** **[${song.title}](${song.url})**`
                }).join('\n'),
                color: Colors.Gold
            })

            return await interaction.reply({embeds: [embed]})
        } else if(sub == 'skip') {
            client.queue.shift()

            if (client.queue.length > 0) {
                const nextStream = await ytdl(client.queue[0].url)
                const nextResource = createAudioResource(nextStream)
                client.player.play(nextResource);
                embed
                    .setDescription(`Ich spiele jetzt **[${client.queue[0].title}](${client.queue[0].url})**`)
                    .setColor(Colors.Gold);
            } else {
                connection.disconnect()
                connection.destroy()
                client.queue = []
                embed
                    .setDescription('Da keine weiteren Songs in der Warteschlange sind, habe ich den Sprachkanal verlassen!')
                    .setColor(Colors.Gold)
            }

            return await interaction.reply({embeds: [embed]})
        } else if(sub == 'stop') {
            connection.destroy()
            embed
                .setDescription('Die Wiedergabe wurde erfolgreich beendet!')
                .setColor(Colors.Gold);

            interaction.reply({embeds: [embed]})
        }

        client.player.on('stateChange', async (oldState, newState) => {
            if (newState.status != 'idle') return
            client.queue.shift()

            if (client.queue.length > 0) {
                const nextStream = await ytdl(client.queue[0].url)
                const nextResource = createAudioResource(nextStream)
                client.player.play(nextResource)
            } else {
                connection.destroy()
                client.queue = []
            }
        })

    },
}
export default command