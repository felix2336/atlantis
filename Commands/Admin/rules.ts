import { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits, ChatInputCommandInteraction, Colors, TextChannel } from "discord.js";
import { Channels } from "../../contents";
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Sende das aktualisierte Regelwerk')
        .setDefaultMemberPermissions(0),

    async execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.guild!.channels.cache.get(Channels.rules) as TextChannel
        const message = await channel.messages.fetch("1234592346402721803")
        const embed = new EmbedBuilder({
            title: "Unser Regelwerk",
            color: Colors.DarkGrey,
            fields: [
                {
                    name: "§A Grundlegende Bestimmungen",
                    value: "A.1. Bei Betreten und Interaktion innerhalb 『Atlantis Lounge 🌊』 akzeptierst du unsere Richtlinien.\n\nA.2. Jede Person ist selbst für die Integrität ihres eigenen Zugangs verantwortlich.\n⠀",
                },
                {
                    name: "§B Kontoverantwortlichkeit und Verhalten",
                    value: "B.1. Benutzernamen oder Inhalt, der anderen schaden könnte, sind unzulässig.\n\nB.2. Dein Zugang sollte privat bleiben und nicht geteilt werden.\n\nB.3. Das Umgehen von verhängten Einschränkungen resultiert in strengeren Maßnahmen.\n⠀",
                },
                {
                    name: "§C Umgang mit Bugs",
                    value: "C.1. Das Nutzen oder Verbreiten von Bugs wird nicht geduldet.\n\nC.2. Jegliche Unregelmäßigkeiten sollten umgehend kommuniziert werden.\n⠀",
                },
                {
                    name: "§D Interaktion zwischen Nutzern",
                    value: "D.1. Transaktionen mit echtem Geld und automatisierte Interaktionen sind unzulässig.\n\nD.2. Jegliche Form von Bedrohungen, besonders technischer Natur, ist strikt verboten.\n\nD.3. Jeder Nutzer sollte respektvoll und rücksichtsvoll gegenüber anderen agieren.\n⠀",
                },
                {
                    name: "§E Inhalte und geistiges Eigentum",
                    value: "E.1. Inhalte, die auf dem Portal geteilt werden, müssen den allgemeinen Richtlinien entsprechen.\n\nE.2. Das Kopieren, Teilen oder anderweitige Verbreiten von Inhalten ohne Erlaubnis ist untersagt.\n⠀",
                },
                {
                    name: "§F Schlussbestimmungen",
                    value: "F.1. Verstöße gegen diese Richtlinien können zu Sanktionen führen.\n\nF.2.  『Atlantis Lounge 🌊』\nbehält sich das Recht vor, diese Richtlinien nach eigenem Ermessen zu ändern.",
                }
            ],
        })

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                label: 'Verifizieren',
                style: 3,
                customId: 'verify',
            })
        ])

        await message.edit({embeds: [embed], components: [row]})
        interaction.reply({content: 'Regelwerk gesendet', ephemeral: true})
    }
}

export default command