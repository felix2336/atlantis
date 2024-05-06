import { ChatInputCommandInteraction, EmbedBuilder, Client, ApplicationCommandOptionType, SlashCommandBuilder, GuildMember } from 'discord.js';
import Casino from '../../Schemas/casino';

export default {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Lasse dir deinen Kontostand anzeigen')
        .addUserOption(input => input.setName("user").setDescription("Der Benutzer, dessen Kontostand du sehen möchtest.")),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('user');
        let User;

        User = await Casino.findOne({ user: interaction.user.id })
        if (!User) {
            const embed = new EmbedBuilder({
                title: 'Dein Kontostand',
                fields: [
                    { name: 'Bargeld', value: '💰0' },
                    { name: 'Bankguthaben', value: '💰0' },
                    { name: 'Gesamt', value: '💰0' }
                ],
                color: 0xfca903
            })
            interaction.reply({ embeds: [embed] })
            return;
        }
        if(target){
            const targetMember = interaction.guild!.members.cache.get(target.id) as GuildMember
            const User = await Casino.findOne({user: target.id})
            if(!User) return interaction.reply({content: 'Dieser User hat momentan noch kein Geld', ephemeral: true})
            const embed = new EmbedBuilder({
                title: `Kontostand von ${targetMember.nickname || targetMember.displayName}`,
                fields: [
                    { name: 'Bargeld', value: `💰${User.wallet}` },
                    { name: 'Bankguthaben', value: `💰${User.bank}` },
                    { name: 'Gesamt', value: `💰${User.wallet! + User.bank!}` }
                ],
                color: 0xfca903
            })
            interaction.reply({embeds: [embed]})
            return
        }

        const embed = new EmbedBuilder({
            title: 'Dein Kontostand',
            fields: [
                { name: 'Bargeld', value: `💰${User.wallet}` },
                { name: 'Bankguthaben', value: `💰${User.bank}` },
                { name: 'Gesamt', value: `💰${User.wallet + User.bank}` }
            ],
            color: 0xfca903
        })

        interaction.reply({ embeds: [embed] })
    }
}