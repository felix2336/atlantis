const { GuildMember, EmbedBuilder, Client } = require('discord.js')

module.exports = {
    name: 'guildMemberUpdate',
    disabled: true,

    /**
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember
     */

    async execute(oldMember, newMember) {
        const staff = '1156298949301379212',
            tsup = '1146113684570124342',
            sup = '1148217519631499384',
            tmod = '1146113684570124343',
            mod = '1147206142548787372',
            teventler = '1174018919175041135',
            eventler = '1174018914448064552',
            tmarketing = '1174018688383463515',
            marketing = '1174016316059959326',
            channel = newMember.guild.channels.cache.get('1178073046444163102'); //Test Channel

        //ins team aufgenommen
        if (!oldMember.roles.cache.has(staff)) {
            setTimeout(() => {
                if (newMember.roles.cache.has(staff) && newMember.roles.cache.has(tsup)) {
                    if (!oldMember.roles.cache.has(tsup)) {
                        const embed = new EmbedBuilder({
                            title: 'Neues Teammitglied',
                            fields: [
                                { name: 'User', value: `${newMember}` },
                                { name: 'Wird uns unterstützen als', value: `<@&${tsup}>` }
                            ],
                            color: 0x00c800
                        })
                        channel.send({ embeds: [embed] })
                        return
                    }
                } else if (newMember.roles.cache.has(staff) && newMember.roles.cache.has(tmod)) {
                    if (!oldMember.roles.cache.has(tmod)) {
                        const embed = new EmbedBuilder({
                            title: 'Neues Teammitglied',
                            fields: [
                                { name: 'User', value: `${newMember}` },
                                { name: 'Wird uns unterstützen als', value: `<@&${tmod}>` }
                            ],
                            color: 0x00c800
                        })
                        channel.send({ embeds: [embed] })
                        return
                    }
                } else if (newMember.roles.cache.has(staff) && newMember.roles.cache.has(teventler)) {
                    if (!oldMember.roles.cache.has(teventler)) {
                        const embed = new EmbedBuilder({
                            title: 'Neues Teammitglied',
                            fields: [
                                { name: 'User', value: `${newMember}` },
                                { name: 'Wird uns unterstützen als', value: `<@&${teventler}>` }
                            ],
                            color: 0x00c800
                        })
                        channel.send({ embeds: [embed] })
                        return
                    }
                } else if (newMember.roles.cache.has(staff) && newMember.roles.cache.has(tmarketing)) {
                    if (!oldMember.roles.cache.has(tmarketing)) {
                        const embed = new EmbedBuilder({
                            title: 'Neues Teammitglied',
                            fields: [
                                { name: 'User', value: `${newMember}` },
                                { name: 'Wird uns unterstützen als', value: `<@&${tmarketing}>` }
                            ],
                            color: 0x00c800
                        })
                        channel.send({ embeds: [embed] })
                        return
                    }
                }
            }, 10000)
        }
        //Team Testphase bestanden
        else if (oldMember.roles.cache.has(staff)) {
            if (newMember.roles.cache.has(staff) && !newMember.roles.cache.has(tsup)) {
                if (!oldMember.roles.cache.has(sup) && newMember.roles.cache.has(sup)) {
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied hat die Testphase bestanden',
                        fields: [
                            { name: 'User', value: `${newMember}` },
                            { name: 'Befördert', value: `von <@&${tsup}> zu <@&${sup}>` }
                        ],
                        color: 0x00c800
                    })
                    channel.send({ embeds: [embed] })
                    return
                }
            } else if (newMember.roles.cache.has(staff) && !newMember.roles.cache.has(tmod)) {
                if (!oldMember.roles.cache.has(mod) && newMember.roles.cache.has(mod)) {
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied hat die Testphase bestanden',
                        fields: [
                            { name: 'User', value: `${newMember}` },
                            { name: 'Befördert', value: `von <@&${tmod}> zu <@${mod}>` }
                        ],
                        color: 0x00c800
                    })
                    channel.send({ embeds: [embed] })
                    return
                }
            } else if (newMember.roles.cache.has(staff) && !newMember.roles.cache.has(teventler)) {
                if (!oldMember.roles.cache.has(eventler) && newMember.roles.cache.has(eventler)) {
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied hat die Testphase bestanden',
                        fields: [
                            { name: 'User', value: `${newMember}` },
                            { name: 'Befördert', value: `von <@&${teventler}> zu <@&${eventler}>` }
                        ],
                        color: 0x00c800
                    })
                    channel.send({ embeds: [embed] })
                    return
                }
            } else if (newMember.roles.cache.has(staff) && !newMember.roles.cache.has(tmarketing)) {
                if (!oldMember.roles.cache.has(marketing) && newMember.roles.cache.has(marketing)) {
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied hat die Testphase bestanden',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Befördert', value: `von <@&${tmarketing}> zu <@&${marketing}>`}
                        ],
                        color: 0x00c800
                    })

                    channel.send({embeds: [embed]})
                    return
                }
            }
            //team verlassen
            else if(oldMember.roles.cache.has(staff) && !newMember.roles.cache.has(staff)){
                if(oldMember.roles.cache.has(tsup)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${tsup}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
                else if(oldMember.roles.cache.has(sup)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${sup}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
                else if(oldMember.roles.cache.has(tmod)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${tmod}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
                else if(oldMember.roles.cache.has(mod)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${mod}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
                else if(oldMember.roles.cache.has(teventler)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${teventler}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
                else if(oldMember.roles.cache.has(eventler)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${eventler}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
                else if(oldMember.roles.cache.has(tmarketing)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${tmarketing}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
                else if(oldMember.roles.cache.has(marketing)){
                    const embed = new EmbedBuilder({
                        title: 'Ein Teammitglied weniger',
                        fields: [
                            {name: 'User', value: `${newMember}`},
                            {name: 'Hat uns unterstützt als', value: `<@&${marketing}>`}
                        ],
                        color: 0xffa600
                    })
                    channel.send({embeds: [embed]})
                }
            }
        }
    }
}