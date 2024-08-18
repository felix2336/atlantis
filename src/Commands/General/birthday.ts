import { SlashCommand } from 'dcbot'
import { SlashCommandBuilder } from 'discord.js'
import Birthdays from '../../Schemas/birthdays';
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1)

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Setze deinen Geburtstag')
        .addNumberOption(input => input.setName('day').setDescription('An welchem Tag hast du Geburtstag?').setRequired(true).setAutocomplete(true))
        .addNumberOption(input => input.setName('month').setDescription('In welchem Monat hast du Geburtstag?').setRequired(true).setAutocomplete(true)),

    async autocomplete(interaction, client) {
        const focusedOption = interaction.options.getFocused(true);

        switch (focusedOption.name) {
            case 'day': {
                const choices = days.filter(d => d.toString().startsWith(focusedOption.value))
                interaction.respond(choices.map(ch => ({ name: ch.toString(), value: ch })).slice(0, 25))
                break
            }
            case 'month': {
                const choices = months.filter(m => m.toString().startsWith(focusedOption.value))
                interaction.respond(choices.map(ch => ({ name: ch.toString(), value: ch })))
                break
            }
        }
    },

    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true})
        const day = interaction.options.getNumber('day', true)
        const month = interaction.options.getNumber('month', true)

        if (!days.includes(day)) {
            interaction.editReply({ content: 'Bitte gib einen gültigen Tag ein'})
            return
        }
        if (!months.includes(month)) {
            interaction.editReply({ content: 'Bitte gib einen gültigen Monat ein'})
            return
        }

        let dbUser = await Birthdays.findOne({userId: interaction.user.id})

        if(dbUser) {
            dbUser.day = day
            dbUser.month = month
            await dbUser.save()
        } else {
            dbUser = await Birthdays.create({userId: interaction.user.id, day: day, month: month})
        }

        await interaction.editReply({content: `Dein Geburtstag wurde gespeichert: \`${day}.${month}\``})
    },
})