import { GuildMember } from "discord.js";
import { MemberManager, MyClient, Selfroles } from "contents";
import { Button } from "dcbot";

export default new Button<MyClient>({
    id: 'italy',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if (Member.hasRole(Selfroles.italien)) {
            await Member.removeRole(Selfroles.italien)
            interaction.reply({ content: 'Die Rolle wurde entfernt', ephemeral: true })
        } else {
            if (Member.hasRole(Selfroles.österreich)) {
                await Member.removeRole(Selfroles.österreich)
            } else if (Member.hasRole(Selfroles.deutschland)) {
                await Member.removeRole(Selfroles.deutschland)
            } else if (Member.hasRole(Selfroles.niederlande)) {
                await Member.removeRole(Selfroles.niederlande)
            } else if (Member.hasRole(Selfroles.frankreich)) {
                await Member.removeRole(Selfroles.frankreich)
            } else if (Member.hasRole(Selfroles.schweiz)) {
                await Member.removeRole(Selfroles.schweiz)
            }

            await Member.addRole(Selfroles.italien)
            await interaction.reply({ content: 'Die Rolle wurde hinzugefügt', ephemeral: true })
        }
    },
})