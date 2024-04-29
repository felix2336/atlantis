import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, Client, ActionRowBuilder, Colors, TextChannel } from 'discord.js'

export default {
    id: 'taskmodal',

    async execute(interaction: ModalSubmitInteraction) {
        const title = interaction.fields.getTextInputValue('tasktitle')
        const description = interaction.fields.getTextInputValue('taskdescription')

        const channel = interaction.guild!.channels.cache.get('1200374840696246302') as TextChannel;
        if (!channel) return interaction.reply({ content: 'Der Dev Task Channel existiert nicht mehr. Bitte aktualisiere ihn im Code!', ephemeral: true })

        const finishButton = new ButtonBuilder({
            label: 'Erledigt',
            customId: 'taskfinished',
            style: 3
        })
        const claimButton = new ButtonBuilder({
            label: 'Übernehmen',
            customId: 'taskclaim',
            style: 1
        })

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([finishButton, claimButton])

        const embed = new EmbedBuilder({
            title: title,
            description: description,
            timestamp: new Date(),
            color: Colors.DarkPurple
        })

        const message = await channel.send({ content: '<@&1146117778483450048>', embeds: [embed], components: [row] })
        await message.pin()
        interaction.reply({ content: 'Die Aufgabe wurde erfolgreich übermittelt', ephemeral: true })
    }
}