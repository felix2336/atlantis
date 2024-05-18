import { ButtonInteraction, Guild, GuildMember } from "discord.js";
import { Roles, MemberManager } from "../../contents";

export default {
    id: 'verify',

    async execute(interaction: ButtonInteraction){
        const Member = new MemberManager(interaction.member as GuildMember, interaction.guild as Guild)
        if(Member.hasRole(Roles.community)) return interaction.reply({content: 'Du bist bereits verifiziert!', ephemeral: true});
        Member.addRole(Roles.community)
        interaction.reply({content: 'Du hast dich erfolgreich verifiziert!', ephemeral: true})
    }
}