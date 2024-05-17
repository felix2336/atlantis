import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js'
import axios from 'axios'
import { SlashCommand } from '../../contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('steal-emoji')
        .setDescription('Hole ein Emoji von einem anderen Server auf diesen')
        .addStringOption(input => input.setName('emoji').setDescription('Welches Emoji möchtest du auf diesen Server holen?').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction) {
        const emoji = interaction.options.get('emoji', true).value as string;
        const id = emoji.split(':').pop()?.split('>')[0]

        const emojiName = emoji.split(':')[1]

        if (!id) return interaction.reply({ content: 'Das Emoji konnte nicht geladen werden!', ephemeral: true })

        if(emoji.startsWith('<') && emoji.endsWith('>')){
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if(image) return 'gif'
                else return 'png'
            })
            .catch(err => {
                return 'png'
            })

            const emojiurl = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`

            await interaction.guild!.emojis.create({
                attachment: `${emojiurl}`,
                name: emojiName
            })
            .then(emoji => {
                return interaction.reply({content: `Das Emoji \`${emoji.name}\`: ${emoji} wurde erfolgreich hinzugefügt!`, ephemeral: true})
            })
            .catch(err => {
                console.log(err)
                return interaction.reply({content: 'Das EMoji konnte nicht hinzugefügt werden!', ephemeral: true})
            })
        }
    }
}
export default command