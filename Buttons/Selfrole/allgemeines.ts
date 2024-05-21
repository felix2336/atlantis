import { ButtonInteraction, GuildMember } from "discord.js";
import { Button, MemberManager, Selfroles } from "../../contents";

const button: Button = {
    id: 'general',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if (Member.hasRole(Selfroles.allgemeines)) {
            await Member.removeRole(Selfroles.allgemeines)
            interaction.reply({ content: 'Die Rolle wurde entfernt', ephemeral: true })
        } else {
            await Member.addRole(Selfroles.allgemeines)
            await interaction.reply({ content: 'Die Rolle wurde hinzugefügt', ephemeral: true })
        }
    },
}
export default button