import { ButtonInteraction, GuildMember } from "discord.js";
import { Button, MemberManager, Selfroles } from "../../contents";

const button: Button = {
    id: 'male',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if(Member.hasRole(Selfroles.male)) {
            await Member.removeRole(Selfroles.male)
            interaction.reply({content: 'Die Rolle wurde entfernt', ephemeral: true})
        } else {
            if(Member.hasRole(Selfroles.female)) {
                await Member.removeRole(Selfroles.female)
            }
            await Member.addRole(Selfroles.male)
            await interaction.reply({content: 'Die Rolle wurde hinzugefügt', ephemeral: true})
        }
    },
}
export default button