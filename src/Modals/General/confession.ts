import { ModalSubmitInteraction, EmbedBuilder, Client, Colors, TextChannel, WebhookClient, GuildMember } from "discord.js";
import { Channels } from 'contents'
import { Modal } from "dcbot";

export default new Modal( {
    id: 'confession',

    async execute(interaction: ModalSubmitInteraction, client: Client) {
        const embed = new EmbedBuilder({
            title: 'Anonyme Beichte',
            description: `\`\`\`${interaction.fields.getTextInputValue('confession')}\`\`\`` + '\n\n<:arrowright:1238592999189905449> Du möchtest auch etwas beichten?\n<:arrowright:1238592999189905449> Benutze einfach </beichte:1238593437050208278>',
            color: Colors.DarkGold,
        })

        const channel = client.channels.cache.get(Channels.beichten) as TextChannel
        await channel.send({embeds: [embed]})
        await interaction.reply({content: 'Vielen Dank für deine Beichte. Sie wurde anonym veröffentlicht!', ephemeral: true})
    }
})