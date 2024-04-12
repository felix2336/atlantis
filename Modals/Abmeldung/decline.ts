import { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Colors, GuildMember, DMChannel } from 'discord.js'

export default {
    id: 'decline',

    async execute(interaction: ModalSubmitInteraction) {

        await interaction.deferReply({ ephemeral: true })

        const userid = interaction.message!.embeds[0].fields[0].value.split('@')[1].split('>')[0]
        const reason = interaction.fields?.getTextInputValue('reason') || '*Kein Grund angegeben*'

        const member = interaction.guild!.members.cache.get(userid) as GuildMember

        const embed = new EmbedBuilder({
            title: 'Abmeldung abgelehnt',
            fields: [
                { name: 'Grund', value: reason }
            ],
            color: Colors.Red,
            timestamp: new Date()
        })

        const dm = await member.createDM()
            .catch(err => {
                console.error(err)
                interaction.editReply({ content: 'Etwas ist schiefgelaufen' })
                return
            })
        
        if(!(dm instanceof DMChannel)) return;
        await dm.send({ embeds: [embed] })
        interaction.editReply({ content: 'Die Abmeldung wurde erfolgreich abgelehnt' })
        const button = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                label: 'Abgelehnt',
                style: 4,
                customId: '1',
                disabled: true
            })])

        const emb = interaction.message!.embeds[0]
        emb.fields.push({ name: 'Abgelehnt - Grund:', value: reason })
        //@ts-ignore
        await interaction.message!.edit({ embeds: [emb], components: [button] })

    }
}