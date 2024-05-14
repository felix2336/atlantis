import { StringSelectMenuInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder, ActionRow } from "discord.js";

export default {
    id: 'ticket',

    async execute(interaction: StringSelectMenuInteraction) {
        switch(interaction.values[0]) {
            case 'bewerben': {
                const modal = new ModalBuilder({
                    title: 'Team Bewerbung',
                    customId: 'apply'
                })

                const job = new TextInputBuilder({
                    customId: 'job',
                    label: 'Als was möchtest du dich bewerben?',
                    placeholder: 'Supporter, Designer, Moderator',
                    maxLength: 255,
                    required: true,
                    style: 1
                })

                const experience = new TextInputBuilder({
                    customId: 'experience',
                    label: 'Hast du schon Erfahrungen in diesem Bereich?',
                    placeholder: 'Ganze Sätze + Erfahrungen nennen',
                    maxLength: 1024,
                    required: true,
                    style: 2
                })

                const name = new TextInputBuilder({
                    customId: 'name',
                    label: 'Wie heißt du?',
                    maxLength: 255,
                    required: true,
                    style: 1
                })

                const age = new TextInputBuilder({
                    customId: 'age',
                    label: 'Wie alt bist du?',
                    required: true,
                    maxLength: 255,
                    style: 1,

                })

                const onlinetime = new TextInputBuilder({
                    customId: 'onlinetime',
                    label: 'Bitte nenne uns deine Discord-Onlinezeiten:',
                    style: 2,
                    required: true,
                    maxLength: 1024
                })


                const row = new ActionRowBuilder<TextInputBuilder>().addComponents(job)
                const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(experience)
                const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(name)
                const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(age)
                const row5 = new ActionRowBuilder<TextInputBuilder>().addComponents(onlinetime)

                modal.addComponents(row, row2, row3, row4, row5)
                await interaction.showModal(modal)
                break
            }

            case('partnerschaft'): {
                const modal = new ModalBuilder({
                    title: 'Partnerschaft',
                    customId: 'partnerschaft',
                    components: [
                        new ActionRowBuilder<TextInputBuilder>({
                            components: [
                                new TextInputBuilder({
                                    label: 'Wie viele Mitglieder hat dein Server?',
                                    customId: 'membercount',
                                    required: true,
                                    style: 1,
                                })
                            ]
                        }),
                        new ActionRowBuilder<TextInputBuilder>({
                            components: [
                                new TextInputBuilder({
                                    label: 'Bitte beschreibe deinen Server',
                                    customId: 'description',
                                    required: true,
                                    minLength: 20,
                                    placeholder: 'Bitte schreibe ganze Sätze',
                                    style: 2
                                })
                            ]
                        })
                    ]
                })
                await interaction.showModal(modal)
                
                break
            }

            case 'report': {
                const modal = new ModalBuilder({
                    title: 'Person melden',
                    customId: 'report',
                    components: [
                        new ActionRowBuilder<TextInputBuilder>().addComponents([
                            new TextInputBuilder({
                                customId: 'target',
                                label: 'wie heisst die person?',
                                style: 1,
                                placeholder: 'Bitte nenne uns seinen Discord-Namen',
                                required: true
                            })
                        ]),
                        new ActionRowBuilder<TextInputBuilder>().addComponents([
                            new TextInputBuilder({
                                customId: 'reason',
                                label: 'Was hat die Person gemacht?',
                                style: 2,
                                maxLength: 1024,
                                placeholder: 'Bitte schreibe ganze Sätze'
                            })
                        ]),
                        new ActionRowBuilder<TextInputBuilder>().addComponents([
                            new TextInputBuilder({
                                label: 'Hast du Beweise',
                                customId: 'evidence',
                                placeholder: 'Ja/Nein',
                                style: 1
                            })
                        ])
                    ]
                })
                await interaction.showModal(modal)
                break
            }

            case 'support': {
                const modal = new ModalBuilder({
                    title: 'Allgemeiner Support',
                    customId: 'support',
                    components: [
                        new ActionRowBuilder<TextInputBuilder>().addComponents([
                            new TextInputBuilder({
                                label: 'Wie lautet dein Anliegen?',
                                customId: 'issue',
                                required: true,
                                maxLength: 1024,
                                placeholder: 'Bitte schreibe ganze Sätze!',
                                style: 2
                            })
                        ])
                    ]
                })
                await interaction.showModal(modal)
                break
            }
        }
    }
}