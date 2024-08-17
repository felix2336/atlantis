import { ButtonInteraction, GuildMember } from "discord.js";
import { MemberManager, MyClient, Selfroles } from "../../contents";
import { Button } from "dcbot";

export default new Button<MyClient>({
    id: 'brawlstars',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if (Member.hasRole(Selfroles.brawlstars)) {
            await Member.removeRole(Selfroles.brawlstars)
            interaction.reply({ content: 'Die Rolle wurde entfernt', ephemeral: true })
        } else {
            await Member.addRole(Selfroles.brawlstars)
            await interaction.reply({ content: 'Die Rolle wurde hinzugefügt', ephemeral: true })
        }
    },
})