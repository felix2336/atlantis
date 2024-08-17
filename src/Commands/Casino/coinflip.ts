import { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder } from 'discord.js'
import Casino from '../../Schemas/casino'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Wirf eine Münze und erhalte mit etwas Glück ein wenig Geld')
        .addStringOption(input => input.setName('symbol').setDescription('Wähle das Symbol, auf das du setzen möchtest').addChoices({name: 'Kopf', value: 'heads'}, {name: 'Zahl', value: 'tails'}).setRequired(true))
        .addNumberOption(input => input.setName('amount').setDescription('Wie viel Geld möchtest du setzen?').setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        let User = await Casino.findOne({ user: interaction.user.id })
        if(!User){
            User = await Casino.create({
                user: interaction.user.id,
                bank: 0,
                wallet: 0,
                inventory: {}
            })
        }
        //@ts-ignore
        const symbol = interaction.options.getString('symbol')
        switch (symbol) {
            case 'heads': {
                //@ts-ignore
                const bid = interaction.options.getNumber('amount') as number
                if (bid <= 0) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du musst mindestens 💰1 bieten', color: 0xff1414 })] })
                if (bid > User.wallet!) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du kannst nicht mehr bieten, als du hast', color: 0xff1414 })] })
                const random = Math.floor(Math.random() * 2)
                if (random == 1) {
                    const embed = new EmbedBuilder({
                        title: 'Guter Wurf',
                        description: `Die Münze ist auf Kopf gelandet. Somit hast du 💰${bid} Plus gemacht`,
                        color: 0x77ff00
                    })
                    User.wallet! += bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                } else {
                    const embed = new EmbedBuilder({
                        title: 'Schlechter Wurf',
                        description: `Die Münze ist auf Zahl gelandet. Somit hast du leider 💰${bid} verloren`,
                        color: 0xff1414
                    })
                    User.wallet! -= bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                }
                break;
            }
            case 'tails': {
                //@ts-ignore
                const bid = parseInt(interaction.options.getNumber('amount'))
                if (bid <= 0) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du musst mindestens 💰1 bieten', color: 0xff1414 })] })
                if (bid > User.wallet!) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du kannst nicht mehr bieten, als du hast', color: 0xff1414 })] })
                const random = Math.floor(Math.random() * 2)
                if (random == 1) {
                    const embed = new EmbedBuilder({
                        title: 'Guter Wurf',
                        description: `Die Münze ist auf Zahl gelandet. Somit hast du 💰${bid} Plus gemacht`,
                        color: 0x77ff00
                    })
                    User.wallet! += bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                } else {
                    const embed = new EmbedBuilder({
                        title: 'Schlechter Wurf',
                        description: `Die Münze ist auf Kopf gelandet. Somit hast du leider 💰${bid} verloren`,
                        color: 0xff1414
                    })
                    User.wallet! -= bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                }
                break;
            }
        }
    }
}
export default command