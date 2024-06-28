import { ButtonInteraction, Guild, GuildMember } from "discord.js";
import { Roles, MemberManager } from "../../contents";
import { Button } from "dcbot";

export default new Button( {
    id: 'verify',

    async execute(interaction: ButtonInteraction){
        const Member = new MemberManager(interaction.member as GuildMember, interaction.guild as Guild)
        if(Member.hasRole(Roles.community)) {
            interaction.reply({content: 'Du bist bereits verifiziert!', ephemeral: true});
            return;
        } 
        Member.addRole(Roles.community)
        interaction.reply({content: 'Du hast dich erfolgreich verifiziert!', ephemeral: true})
    }
})