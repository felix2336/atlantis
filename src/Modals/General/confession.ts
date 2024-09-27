import { ModalSubmitInteraction, EmbedBuilder, Client, Colors, TextChannel, WebhookClient, GuildMember } from "discord.js";
import { Channels } from 'contents'
import { Modal } from "dcbot";

export default new Modal({
    // ID des Modals
    id: 'confession',

    // Funktion, die ausgeführt wird, wenn das Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction, client: Client) {
        // Erstelle ein neues Embed, um die Beichte darzustellen
        const embed = new EmbedBuilder({
            // Titel des Embeds
            title: 'Anonyme Beichte',
            // Beschreibung des Embeds, enthält die Beichte des Nutzers
            description: `\`\`\`${interaction.fields.getTextInputValue('confession')}\`\`\`` + '\n\n<:arrowright:1238592999189905449> Du möchtest auch etwas beichten?\n<:arrowright:1238592999189905449> Benutze einfach </beichte:1238593437050208278>',
            // Farbe des Embeds
            color: Colors.DarkGold,
        })

        // Hole den Kanal, in dem die Beichte gepostet werden soll
        const channel = client.channels.cache.get(Channels.beichten) as TextChannel
        // Sende die Beichte in den Kanal
        await channel.send({ embeds: [embed] })
        // Sende eine Antwort an den Nutzer, dass die Beichte erfolgreich gepostet wurde
        await interaction.reply({ content: 'Vielen Dank für deine Beichte. Sie wurde anonym veröffentlicht!', ephemeral: true })
    }
})
