import { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ActionRowBuilder, PermissionFlagsBits, Colors, TextChannel } from "discord.js";
import { SlashCommand, Channels } from "../../contents";

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('selfroles')
        .setDescription('Sende die Selfroles in den selfrolechannel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true})
        const channel = client.channels.cache.get(Channels.selfrole) as TextChannel

        const genderEmbed = new EmbedBuilder({
            title: 'Was bist du?',
            color: Colors.Gold
        })
        const ageEmbed = new EmbedBuilder({
            title: 'Wie alt bist du?',
            color: Colors.Gold
        })
        const deviceEmbed = new EmbedBuilder({
            title: 'Worauf spielst du?',
            color: Colors.Gold
        })
        const countryEmbed = new EmbedBuilder({
            title: 'In welchem Land wohnst du?',
            color: Colors.Gold
        })
        const gamesEmbed = new EmbedBuilder({
            title: 'Was spielst du?',
            color: Colors.Gold
        })
        const pingEmbed = new EmbedBuilder({
            title: 'Für was möchtest du gepingt werden?',
            color: Colors.Gold
        })

        const row = ActionRowBuilder<ButtonBuilder>;
        
        const genderButtons = new row({
            components: [
                new ButtonBuilder({
                    label: 'Männlich',
                    style: 2,
                    customId: 'male',
                    emoji: '🚹'
                }),
                new ButtonBuilder({
                    label: 'Weiblich',
                    style: 2,
                    customId: 'female',
                    emoji: '🚺'
                })
            ]
        })

        const ageButtons = new row({
            components: [
                new ButtonBuilder({
                    label: '13+',
                    style: 2,
                    customId: '13+',
                    emoji: '1️⃣'
                }),
                new ButtonBuilder({
                    label: '15+',
                    style: 2,
                    customId: '15+',
                    emoji: '2️⃣'
                }),
                new ButtonBuilder({
                    label: '18+',
                    style: 2,
                    customId: '18+',
                    emoji: '3️⃣'
                }),
                new ButtonBuilder({
                    label: '20+',
                    style: 2,
                    customId: '20+',
                    emoji: '4️⃣'
                }),

            ]
        })

        const deviceButtons = new row({
            components: [
                new ButtonBuilder({
                    label: 'iOS',
                    style: 2,
                    customId: 'ios',
                    emoji: '📱'
                }),
                new ButtonBuilder({
                    label: 'Android',
                    style: 2,
                    customId: 'android',
                    emoji: '📲'
                }),
                new ButtonBuilder({
                    label: 'PC',
                    style: 2,
                    customId: 'pc',
                    emoji: '🖥️'
                }),
                new ButtonBuilder({
                    label: 'Konsole',
                    style: 2,
                    customId: 'konsole',
                    emoji: '🕹️'
                }),
            ]
        })

        const countryButtons1 = new row({
            components: [
                new ButtonBuilder({
                    label: 'Deutschland',
                    style: 2,
                    customId: 'germany',
                    emoji: '🇩🇪'
                }),
                new ButtonBuilder({
                    label: 'Österreich',
                    style: 2,
                    customId: 'österreich',
                    emoji: '🇦🇹'
                }),
                new ButtonBuilder({
                    label: 'Italien',
                    style: 2,
                    customId: 'italy',
                    emoji: '🇮🇹'
                }),
                new ButtonBuilder({
                    label: 'Niederlande',
                    style: 2,
                    customId: 'netherlands',
                    emoji: '🇳🇱'
                }),
                new ButtonBuilder({
                    label: 'Frankreich',
                    style: 2,
                    customId: 'france',
                    emoji: '🇫🇷'
                }),
            ]
        })

        const countryButtons2 = new row({
            components: [
                new ButtonBuilder({
                    label: 'Schweiz',
                    style: 2,
                    customId: 'switzerland',
                    emoji: '🇨🇭'
                })
            ]
        })

        const gameButtons1 = new row({
            components: [
                new ButtonBuilder({
                    label: 'Minecraft Java',
                    style: 2,
                    customId: 'mcjava',
                    emoji: '1️⃣'
                }),
                new ButtonBuilder({
                    label: 'Minecraft Bedrock',
                    style: 2,
                    customId: 'mcbedrock',
                    emoji: '2️⃣'
                }),
                new ButtonBuilder({
                    label: 'Rocket league',
                    style: 2,
                    customId: 'rocketleague',
                    emoji: '3️⃣'
                }),
                new ButtonBuilder({
                    label: 'Fortnite',
                    style: 2,
                    customId: 'fortnite',
                    emoji: '4️⃣'
                }),
                new ButtonBuilder({
                    label: 'Clash of Clans',
                    style: 2,
                    customId: 'coc',
                    emoji: '5️⃣'
                }),
            ]
        })

        const gameButtons2 = new row({
            components: [
                new ButtonBuilder({
                    label: 'Valorant',
                    style: 2,
                    customId: 'valorant',
                    emoji: '1️⃣'
                }),
                new ButtonBuilder({
                    label: 'GTA',
                    style: 2,
                    customId: 'gta',
                    emoji: '2️⃣'
                }),
                new ButtonBuilder({
                    label: 'Brawl Stars',
                    style: 2,
                    customId: 'brawlstars',
                    emoji: '3️⃣'
                }),
                new ButtonBuilder({
                    label: 'Call of Duty',
                    style: 2,
                    customId: 'cod',
                    emoji: '4️⃣'
                }),
            ]
        })

        const pingButtons1 = new row({
            components: [
                new ButtonBuilder({
                    label: 'Wahrheit oder Pflicht',
                    style: 2,
                    customId: 'wop',
                    emoji: '1️⃣'
                }),
                new ButtonBuilder({
                    label: 'Bumping',
                    style: 2,
                    customId: 'bumping',
                    emoji: '2️⃣'
                }),
                new ButtonBuilder({
                    label: 'Bot Status',
                    style: 2,
                    customId: 'botstatus',
                    emoji: '3️⃣'
                }),
                new ButtonBuilder({
                    label: 'Events',
                    style: 2,
                    customId: 'events',
                    emoji: '4️⃣'
                }),
                new ButtonBuilder({
                    label: 'Allgemeines',
                    style: 2,
                    customId: 'general',
                    emoji: '5️⃣'
                }),
            ]
        })

        const pingButtons2 = new row({
            components: [
                new ButtonBuilder({
                    label: 'Gewinnspiele',
                    style: 2,
                    customId: 'giveaways',
                    emoji: '1️⃣'
                }),
                new ButtonBuilder({
                    label: 'Neuigkeiten',
                    style: 2,
                    customId: 'news',
                    emoji: '2️⃣'
                }),
                new ButtonBuilder({
                    label: 'Umfragen',
                    style: 2,
                    customId: 'polls',
                    emoji: '3️⃣'
                }),
                new ButtonBuilder({
                    label: 'Team Änderungen',
                    style: 2,
                    customId: 'staffchanges',
                    emoji: '4️⃣'
                }),
            ]
        })

        await send(genderEmbed, [genderButtons])
        await send(ageEmbed, [ageButtons])
        await send(deviceEmbed, [deviceButtons])
        await send(countryEmbed, [countryButtons1, countryButtons2])
        await send(gamesEmbed, [gameButtons1, gameButtons2])
        await send(pingEmbed, [pingButtons1, pingButtons2])

        await interaction.editReply('Selfroles geschickt')
        
        async function send(embed: EmbedBuilder, components: ActionRowBuilder<ButtonBuilder>[]) {
            await channel.send({embeds: [embed], components})
        }
    },
}
export default command