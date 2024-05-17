import { ChatInputCommandInteraction, EmbedBuilder, Client, SlashCommandBuilder } from 'discord.js'
import {readdirSync} from 'fs'
import { MyClient } from '../../contents'

export default {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Lasse dir Infos zum Bot anzeigen'),

    async execute(interaction: ChatInputCommandInteraction, client: MyClient){
        const embed = new EmbedBuilder({
            title: `${client.user!.username} Infos`,
            description: `${client.user} wurde von <@773072144304963624> und <@731990066158895175> mit der discord.js Library programmiert.
            
            <:ActiveDev_Badge:1211374507873406996> Befehle: \`${client.commands.size}\`
            <:discordjs:1208835491101802576> Discord.js \`v14.12.1\`
            <:nodejs:1208835656835407902> NodeJS \`v21.6.1\`
            
            Wenn du einen guten kostengünstigen Hoster suchst, schau doch mal [hier](https://ht-hosting.de/aff.php?aff=275) vorbei`,
            timestamp: new Date(),
            footer: {text: client.user!.username + ' Info', iconURL: client.user!.displayAvatarURL()},
            thumbnail: {url: client.user!.displayAvatarURL()}
        })

        await interaction.reply({embeds: [embed]})
    }
}

function convertUptime(ms: number) {
    let seconds: string | number = Math.floor((ms / 1000) % 60);
    let minutes: string | number = Math.floor((ms / (1000 * 60)) % 60);
    let hours: string | number = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (Number(hours) < 10) ? `0${hours}` : hours;
    minutes = (Number(minutes) < 10) ? `0${minutes}` : minutes;
    seconds = (Number(seconds) < 10) ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
}