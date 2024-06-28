import { ButtonInteraction, GuildMember } from "discord.js";
import { MemberManager, MyClient, Selfroles } from "../../contents";
import { Button } from 'dcbot'
export default new Button<MyClient>({
    id: '15+',

    async execute(interaction, client) {
        const Member = new MemberManager(interaction.member as GuildMember, client.guild)
        if (Member.hasRole(Selfroles.age15)) {
            await Member.removeRole(Selfroles.age15)
            interaction.reply({ content: 'Die Rolle wurde entfernt', ephemeral: true })
        } else {
            if (Member.hasRole(Selfroles.age13)) {
                await Member.removeRole(Selfroles.age13)
            } else if (Member.hasRole(Selfroles.age18)) {
                await Member.removeRole(Selfroles.age18)
            } else if (Member.hasRole(Selfroles.age20)) {
                await Member.removeRole(Selfroles.age20)
            }

            await Member.addRole(Selfroles.age15)
            await interaction.reply({ content: 'Die Rolle wurde hinzugefügt', ephemeral: true })
        }
    },
})