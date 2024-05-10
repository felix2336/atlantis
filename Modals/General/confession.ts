import { ModalSubmitInteraction, EmbedBuilder, Client, Colors, TextChannel, WebhookClient, GuildMember } from "discord.js";
import { Channels } from '../../contents'

export default {
    id: 'confession',

    async execute(interaction: ModalSubmitInteraction, client: Client) {
        const wh = new WebhookClient({
            url: "https://discord.com/api/webhooks/1238619638569373768/sRiZcZ-SthbSJjCD27LG-P7QQ8tlhvNjjRA9xsz44i0uLL2gHhoPb-oxOyhrEflP5v-b"
        })
        const embed = new EmbedBuilder({
            title: 'Anonyme Beichte',
            description: `\`\`\`${interaction.fields.getTextInputValue('confession')}\`\`\`` + '\n\n<:arrowright:1238592999189905449> Du möchtest auch etwas beichten?\n<:arrowright:1238592999189905449> Benutze einfach </beichte:1238593437050208278>',
            color: Colors.DarkGold,
        })

        const channel = client.channels.cache.get(Channels.beichten) as TextChannel
        const whe = new EmbedBuilder({
            author: {name: `${(interaction.member as GuildMember).displayName} (${interaction.user.username})`, iconURL: interaction.user.displayAvatarURL()},
            description: `\`\`\`${interaction.fields.getTextInputValue('confession')}\`\`\`` + '\n\n<:arrowright:1238592999189905449> Du möchtest auch etwas beichten?\n<:arrowright:1238592999189905449> Benutze einfach </beichte:1238593437050208278>',
            color: Colors.DarkGold,
        })
        await channel.send({embeds: [embed]})
        await interaction.reply({content: 'Vielen Dank für deine Beichte. Sie wurde anonym veröffentlicht!', ephemeral: true})
        wh.send({embeds: [embed]})
    }
}