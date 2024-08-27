import { ModalBuilder, TextInputBuilder, ActionRowBuilder } from "discord.js";
import { StringSelectMenu } from 'dcbot'
import { MyClient } from "contents";

const modals = {
    bewerben: new ModalBuilder({
        title: 'Team Bewerbung',
        customId: 'apply',
        components: [
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'job',
                    label: 'Als was möchtest du dich bewerben?',
                    placeholder: 'Supporter, Designer, Moderator',
                    maxLength: 255,
                    required: true,
                    style: 1
                })
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'experience',
                    label: 'Hast du schon Erfahrungen in diesem Bereich?',
                    placeholder: 'Ganze Sätze + Erfahrungen nennen',
                    maxLength: 1024,
                    required: true,
                    style: 2
                })
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'name',
                    label: 'Wie heißt du?',
                    maxLength: 255,
                    required: true,
                    style: 1
                })
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'age',
                    label: 'Wie alt bist du?',
                    required: true,
                    maxLength: 255,
                    style: 1,
                })
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'onlinetime',
                    label: 'Bitte nenne uns deine Discord-Onlinezeiten:',
                    style: 2,
                    required: true,
                    maxLength: 1024
                })
            ),
        ]
    }),
    partnerschaft: new ModalBuilder({
        title: 'Partnerschaft',
        customId: 'partnerschaft',
        components: [
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Wie viele Mitglieder hat dein Server?',
                    customId: 'membercount',
                    required: true,
                    style: 1,
                })
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Bitte beschreibe deinen Server',
                    customId: 'description',
                    required: true,
                    minLength: 20,
                    placeholder: 'Bitte schreibe ganze Sätze',
                    style: 2
                })
            )
        ]
    }),
    report: new ModalBuilder({
        title: 'Person melden',
        customId: 'report',
        components: [
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'target',
                    label: 'wie heisst die person?',
                    style: 1,
                    placeholder: 'Bitte nenne uns seinen Discord-Namen',
                    required: true
                })
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'reason',
                    label: 'Was hat die Person gemacht?',
                    style: 2,
                    maxLength: 1024,
                    placeholder: 'Bitte schreibe ganze Sätze'
                })
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Hast du Beweise',
                    customId: 'evidence',
                    placeholder: 'Ja/Nein',
                    style: 1
                })
            )
        ]
    }),
    support: new ModalBuilder({
        title: 'Allgemeiner Support',
        customId: 'support',
        components: [
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Wie lautet dein Anliegen?',
                    customId: 'issue',
                    required: true,
                    maxLength: 1024,
                    placeholder: 'Bitte schreibe ganze Sätze!',
                    style: 2
                })
            )
        ]
    })
}

export default new StringSelectMenu<MyClient>({
    id: 'ticket',
    async execute(interaction, client) {
        await interaction.showModal(modals[interaction.values[0]])
    }
})