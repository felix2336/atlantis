import { ButtonInteraction, GuildMember } from "discord.js";
import { MemberManager, MyClient, Selfroles } from "../../contents";
import { Button } from "dcbot";

export default new Button<MyClient>({
    id: 'giveaways',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if (Member.hasRole(Selfroles.giveaways)) {
            await Member.removeRole(Selfroles.giveaways)
            interaction.reply({ content: 'Die Rolle wurde entfernt', ephemeral: true })
        } else {
            await Member.addRole(Selfroles.giveaways)
            await interaction.reply({ content: 'Die Rolle wurde hinzugefügt', ephemeral: true })
        }
    },
})