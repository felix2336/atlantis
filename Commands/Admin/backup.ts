import { CommandInteraction, Client, ChannelType, SlashCommandBuilder, PermissionFlagsBits, Guild } from 'discord.js'
import { Backup } from '../../contents'
import {readFileSync} from 'fs'

export default {
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

    async execute(interaction: CommandInteraction, client: Client) {
        const guild = interaction.guild as Guild
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand()


        switch (subcommand) {
            case 'save': {
                new Backup().save(guild)
                interaction.reply({ content: 'Backup erstellt', ephemeral: true })

                break
            }
            case 'load': {
                const backupData = JSON.parse(readFileSync('./JSON/backup.json', 'utf8')) as Backup
                await interaction.deferReply({ ephemeral: true })
                await new Backup(backupData).load(guild)
                await interaction.editReply('Backup geladen')
                break;
            }
        }
    }
}
