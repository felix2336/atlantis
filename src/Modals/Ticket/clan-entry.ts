import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelType, OverwriteType, TextChannel, ButtonStyle } from "discord.js";
import { Categories } from 'contents'
import { Modal } from "dcbot";

export default new Modal({
    id: 'clan-entry',

    // Funktion, die aufgerufen wird, wenn das Modal ausgeführt wird
    async execute(interaction) {
        // Antwort auf die Interaktion verzögern und als ephemeral markieren
        await interaction.deferReply({ ephemeral: true })
        // Antwort bearbeiten, um den Benutzer über den Status zu informieren
        await interaction.editReply('Ticket wird erstellt...')

        // Wert des Textinputs 'clan' aus dem Modal auslesen
        const infos = interaction.fields.getTextInputValue('clan')

        // Neuen Textkanal erstellen
        const channel = await interaction.guild!.channels.create({
            // Name des Kanals setzen
            name: `clan-${interaction.user.username}`,
            // Kanal in die Kategorie 'Tickets' einordnen
            parent: Categories.ticket,
            // Typ des Kanals auf Textkanal setzen
            type: ChannelType.GuildText,
            // Berechtigungen für den Kanal setzen
            permissionOverwrites: [
                // Dem Benutzer, der das Ticket erstellt hat, Berechtigung zum Senden von Nachrichten und zum Ansehen des Kanals geben
                { id: interaction.user.id, allow: ['SendMessages', 'ViewChannel'], type: OverwriteType.Member },
                // Der Rolle 'everyone' die Berechtigung zum Ansehen des Kanals entziehen
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'], type: OverwriteType.Role },
            ]
        })

        // Neues Embed erstellen
        const embed = new EmbedBuilder({
            // Beschreibung des Embeds setzen
            description: `### ${interaction.member} möchte einem Clan beitreten:\n\`\`\`${infos}\`\`\``
        })

        // Neuen ActionRow erstellen
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            // Neuen Button erstellen
            new ButtonBuilder({
                // Custom-ID des Buttons setzen
                customId: 'clanticket-close',
                // Label des Buttons setzen
                label: "Ticket schließen",
                // Emoji des Buttons setzen
                emoji: '🔒',
                // Stil des Buttons setzen
                style: ButtonStyle.Secondary
            })
        ])

        // Nachricht in den neuen Kanal senden
        await channel.send({ content: `${interaction.guild!.roles.everyone}`, embeds: [embed], components: [row] })
        // Antwort bearbeiten, um den Benutzer über den Erfolg zu informieren
        await interaction.editReply(`Ticket erstellt: ${channel}`)
    }
})
