import { SlashCommand } from 'dcbot'
import { Colors, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { exec } from 'child_process'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('git')
        .setDescription('Führe git Befehle auf dem Server aus')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(cmd => cmd
            .setName('pull')
            .setDescription('Pulle Daten aus dem Repo auf den Server')
        ),

    async execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'pull': {
                exec('git pull', (error, stdout, stderr) => {
                    if (error) {
                        const embed = new EmbedBuilder({
                            title: `${error.name}`,
                            description: `${error.message}`,
                            color: Colors.Red
                        })
                        interaction.reply({ embeds: [embed] })
                        return
                    }
                    else if (stderr) {
                        const embed = new EmbedBuilder({
                            title: `OUTPUT ERROR`,
                            description: stderr,
                            color: Colors.Orange
                        })
                        interaction.reply({ embeds: [embed] })
                    }
                    else {
                        const embed = new EmbedBuilder({
                            title: 'SUCCESS',
                            description: stdout,
                            color: Colors.Green
                        })
                        interaction.reply({ embeds: [embed] })
                    }
                })
            }
        }
    }
})