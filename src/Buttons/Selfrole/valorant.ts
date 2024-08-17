import { ButtonInteraction, GuildMember } from "discord.js";
import { MemberManager, MyClient, Selfroles } from "../../contents";
import { Button } from "dcbot";

export default new Button<MyClient>({
    id: 'valorant',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if (Member.hasRole(Selfroles.valorant)) {
            await Member.removeRole(Selfroles.valorant)
            interaction.reply({ content: 'Die Rolle wurde entfernt', ephemeral: true })
        } else {
            await Member.addRole(Selfroles.valorant)
            await interaction.reply({ content: 'Die Rolle wurde hinzugefügt', ephemeral: true })
        }
    },
})