import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember, Colors } from "discord.js";
import { SlashCommand, WarnData, Warn } from "../../contents";
import {readFileSync, writeFileSync} from 'fs'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('clearwarnings')
        .setDescription('Lösche alle Verwarnungen von einem User')
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction, client) {
        const target = interaction.options.getMember('user') as GuildMember
        let warnings = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as WarnData[]

        const warnData = warnings.find(w => w.userid == target.user.id)
        if(!warnData || !warnData.warns || warnData.warns.length == 0) return interaction.reply({content: `${target} hat keine Verwarnungen`, ephemeral: true});

        const User = new Warn(warnData)
        const cleared = User.clearWarns();
        const embed = new EmbedBuilder({
            title: 'Verwarnungen gelöscht',
            description: `Alle Verwarnungen von ${target} wurden gelöscht!`,
            color: Colors.Gold,
            timestamp: new Date
        })
        if(cleared) {
            interaction.reply({embeds: [embed]})
        } else {
            interaction.reply({content: 'Die warns wurden nicht gelöscht', ephemeral: true})
        }
    },
}
export default command