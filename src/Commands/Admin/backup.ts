import { SlashCommandBuilder, PermissionFlagsBits, Client } from 'discord.js'
import { Backup, MyClient } from '../../contents'
import { SlashCommand } from 'dcbot'
import { readFileSync } from 'fs'

export default new SlashCommand<MyClient>({
    data: new SlashCommandBuilder()
        .setName('backup')
        .setDescription('Erstelle oder lade ein Backup')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(input => input
            .setName('save')
            .setDescription('Speichere die aktuellen Kanäle des Servers als Backup')
        )
        .addSubcommand(input => input
            .setName('load')
            .setDescription('Lade das neuste Backup auf diesen Server')
        ),

    async execute(interaction, client) {
        const guild = client.guild
        const subcommand = interaction.options.getSubcommand()


        switch (subcommand) {
            case 'save': {
                new Backup().save(guild)
                interaction.reply({ content: 'Backup erstellt', ephemeral: true })
                console.log(`${interaction.user.username} (${interaction.user.id}) hat ein Backup gespeichert!`)
                break
            }
            case 'load': {
                const backupData = JSON.parse(readFileSync('./JSON/backup.json', 'utf8')) as Backup
                await interaction.deferReply({ ephemeral: true })
                await new Backup(backupData).load(guild)
                await interaction.editReply('Backup geladen')
                console.log(`${interaction.user.username} (${interaction.user.id}) hat ein Backup geladen!`)
                break;
            }
        }
    }
})