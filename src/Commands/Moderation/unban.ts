import { SlashCommand } from "dcbot";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Entbanne einen User von deinem Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(input => input.setName('user').setDescription('Gib hier die UserID des gebannten Users ein').setAutocomplete(true).setRequired(true)),

    async autocomplete(interaction, client) {
        const guild = interaction.guild!
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const bans = await guild.bans.fetch()
        const filteredBans = bans.filter(ban => ban.user.username.toLowerCase().includes(focusedValue))
        const options = filteredBans.map(ban => ({ name: ban.user.username, value: ban.user.id })).slice(0, 25)
        await interaction.respond(options)
    },

    async execute(interaction, client) {
        const userId = interaction.options.getString('user', true);
        const guild = interaction.guild!;
        const bans = await guild.bans.fetch();
        if (!bans.has(userId)) {
            interaction.reply({ content: 'Dieser Benutzer ist nicht gebannt!', ephemeral: true });
            return;
        }
        await guild.members.unban(userId);
        await interaction.reply({ content: `Du hast <@${userId}> erfolgreich entbannt!`, ephemeral: true })
    },
})