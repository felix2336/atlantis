import { ButtonInteraction, GuildMember } from "discord.js";
import { Button, MemberManager, Selfroles } from "../../contents";

const button: Button = {
    id: 'pc',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if (Member.hasRole(Selfroles.pc)) {
            await Member.removeRole(Selfroles.pc)
            interaction.reply({ content: 'Die Rolle wurde entfernt', ephemeral: true })
        } else {
            await Member.addRole(Selfroles.pc)
            await interaction.reply({ content: 'Die Rolle wurde hinzugefügt', ephemeral: true })
        }
    },
}
export default button