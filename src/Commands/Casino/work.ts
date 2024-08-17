import { ChatInputCommandInteraction, Client, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import Casino from '../../Schemas/casino';
import Cooldowns from '../../Schemas/cooldowns';
import { SlashCommand } from 'contents';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('gehe arbeiten für ein wenig Geld'),

    async execute(interaction: ChatInputCommandInteraction, client: Client){
        let CD;
        CD = await Cooldowns.findOne({user: interaction.user.id})
        if (CD && CD.work) {
            const lastExecute = parseInt(CD.work)
            const now = Date.now();
            const cooldownTime = 3600000 //1 Stunde

            const timestamp = Math.floor((lastExecute + cooldownTime) / 1000)
            if (now - lastExecute < cooldownTime){
                const embed = new EmbedBuilder({
                    title: 'Arbeit fehlgeschlagen',
                    description: `Du kannst erneut arbeiten <t:${timestamp}:R>`,
                    color: 0xff1414
                })
                interaction.reply({embeds: [embed]})
                return;
            };
        }
        if(!CD){
            CD = await Cooldowns.create({
                user: interaction.user.id,
                crime: String,
                work: String,
                rob: String,
                daily: String
            })
        }
        CD.work = Date.now()
        await CD.save()
        
        const income = Math.floor(Math.random() * 100)
        const messages = [
            `Du hast im REWE um die Ecke geholfen, die Regale aufzufüllen und hast 💰${income} erhalten`,
        ]

        const embed = new EmbedBuilder({
            title: 'Erfolgreiche Arbeit',
            description: messages[Math.floor(Math.random() * messages.length)],
            color: 0x77ff00,
        })

        let User;
        User = await Casino.findOne({user: interaction.user.id})
        if(!User){
            User = await Casino.create({
                user: interaction.user.id,
                wallet: 0,
                bank: 0,
                inventory: {}
            })
        }

        User.wallet += income
        await User.save()
        interaction.reply({embeds: [embed]})
    }
}
export default command