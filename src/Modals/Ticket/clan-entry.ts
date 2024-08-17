import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelType, OverwriteType, TextChannel, ButtonStyle } from "discord.js";
import { Categories } from '../../contents'
import { Modal } from "dcbot";

export default new Modal({
    id: 'clan-entry',

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        await interaction.editReply('Ticket wird erstellt...')
        const infos = interaction.fields.getTextInputValue('clan')
        const channel = await interaction.guild!.channels.create({
            name: `clan-${interaction.user.username}`,
            parent: Categories.ticket,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                { id: interaction.user.id, allow: ['SendMessages', 'ViewChannel'], type: OverwriteType.Member },
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'], type: OverwriteType.Role },
            ]
        })

        const embed = new EmbedBuilder({
            description: `### ${interaction.member} möchte einem Clan beitreten:\n\`\`\`${infos}\`\`\``
        })
        
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                customId: 'clanticket-close',
                label: "Ticket schließen",
                emoji: '🔒',
                style: ButtonStyle.Secondary
            })
        ])
        
        await channel.send({content: `${interaction.guild!.roles.everyone}`, embeds: [embed], components: [row]})
        await interaction.editReply(`Ticket erstellt: ${channel}`)
    }
})