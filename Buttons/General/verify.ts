import { ButtonInteraction, GuildMember } from "discord.js";
import { Roles } from "../../contents";

export default {
    id: 'verify',

    async execute(interaction: ButtonInteraction){
        const member = interaction.member as GuildMember
        if(member.roles.cache.has(Roles.community)) return interaction.reply({content: 'Du bist bereits verifiziert!', ephemeral: true});
        member.roles.add(Roles.community)
        interaction.reply({content: 'Du hast dich erfolgreich verifiziert!', ephemeral: true})
    }
}