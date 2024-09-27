import { MyClient } from "contents"
import { StringSelectMenu } from "dcbot"
import { ModalBuilder, ActionRowBuilder, TextInputBuilder } from "discord.js"

// Definition der verschiedenen Modal-Fenster für die Interaktionen
const modals = {
    // Modal-Fenster für die Team-Bewerbung
    bewerben: new ModalBuilder({
        title: 'Team Bewerbung', // Titel des Modal-Fensters
        customId: 'apply', // ID des Modal-Fensters
        components: [
            // Zeile für die Eingabe des gewünschten Jobs
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'job', // ID der Eingabe
                    label: 'Als was möchtest du dich bewerben?', // Label der Eingabe
                    placeholder: 'Supporter, Designer, Moderator', // Platzhalter für die Eingabe
                    maxLength: 255, // Maximale Länge der Eingabe
                    required: true, // Eingabe ist erforderlich
                    style: 1 // Stil der Eingabe (1 = Kurztext)
                })
            ),
            // Zeile für die Eingabe der Erfahrungen
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'experience', // ID der Eingabe
                    label: 'Hast du schon Erfahrungen in diesem Bereich?', // Label der Eingabe
                    placeholder: 'Ganze Sätze + Erfahrungen nennen', // Platzhalter für die Eingabe
                    maxLength: 1024, // Maximale Länge der Eingabe
                    required: true, // Eingabe ist erforderlich
                    style: 2 // Stil der Eingabe (2 = Langtext)
                })
            ),
            // Zeile für die Eingabe des Namens
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'name', // ID der Eingabe
                    label: 'Wie heißt du?', // Label der Eingabe
                    maxLength: 255, // Maximale Länge der Eingabe
                    required: true, // Eingabe ist erforderlich
                    style: 1 // Stil der Eingabe (1 = Kurztext)
                })
            ),
            // Zeile für die Eingabe des Alters
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'age', // ID der Eingabe
                    label: 'Wie alt bist du?', // Label der Eingabe
                    required: true, // Eingabe ist erforderlich
                    maxLength: 255, // Maximale Länge der Eingabe
                    style: 1 // Stil der Eingabe (1 = Kurztext)
                })
            ),
            // Zeile für die Eingabe der Online-Zeiten
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'onlinetime', // ID der Eingabe
                    label: 'Bitte nenne uns deine Discord-Onlinezeiten:', // Label der Eingabe
                    style: 2, // Stil der Eingabe (2 = Langtext)
                    required: true, // Eingabe ist erforderlich
                    maxLength: 1024 // Maximale Länge der Eingabe
                })
            ),
        ]
    }),
    // Modal-Fenster für die Partnerschaftsanfrage
    partnerschaft: new ModalBuilder({
        title: 'Partnerschaft', // Titel des Modal-Fensters
        customId: 'partnerschaft', // ID des Modal-Fensters
        components: [
            // Zeile für die Eingabe der Mitgliederzahl
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Wie viele Mitglieder hat dein Server?', // Label der Eingabe
                    customId: 'membercount', // ID der Eingabe
                    required: true, // Eingabe ist erforderlich
                    style: 1 // Stil der Eingabe (1 = Kurztext)
                })
            ),
            // Zeile für die Eingabe der Serverbeschreibung
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Bitte beschreibe deinen Server', // Label der Eingabe
                    customId: 'description', // ID der Eingabe
                    required: true, // Eingabe ist erforderlich
                    minLength: 20, // Minimale Länge der Eingabe
                    placeholder: 'Bitte schreibe ganze Sätze', // Platzhalter für die Eingabe
                    style: 2 // Stil der Eingabe (2 = Langtext)
                })
            )
        ]
    }),
    // Modal-Fenster für die Meldung einer Person
    report: new ModalBuilder({
        title: 'Person melden', // Titel des Modal-Fensters
        customId: 'report', // ID des Modal-Fensters
        components: [
            // Zeile für die Eingabe des Namens der Person
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'target', // ID der Eingabe
                    label: 'wie heisst die person?', // Label der Eingabe
                    style: 1, // Stil der Eingabe (1 = Kurztext)
                    placeholder: 'Bitte nenne uns seinen Discord-Namen', // Platzhalter für die Eingabe
                    required: true // Eingabe ist erforderlich
                })
            ),
            // Zeile für die Eingabe des Grundes
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    customId: 'reason', // ID der Eingabe
                    label: 'Was hat die Person gemacht?', // Label der Eingabe
                    style: 2, // Stil der Eingabe (2 = Langtext)
                    maxLength: 1024, // Maximale Länge der Eingabe
                    placeholder: 'Bitte schreibe ganze Sätze' // Platzhalter für die Eingabe
                })
            ),
            // Zeile für die Eingabe der Beweise
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Hast du Beweise', // Label der Eingabe
                    customId: 'evidence', // ID der Eingabe
                    placeholder: 'Ja/Nein', // Platzhalter für die Eingabe
                    style: 1 // Stil der Eingabe (1 = Kurztext)
                })
            )
        ]
    }),
    // Modal-Fenster für den allgemeinen Support
    support: new ModalBuilder({
        title: 'Allgemeiner Support', // Titel des Modal-Fensters
        customId: 'support', // ID des Modal-Fensters
        components: [
            // Zeile für die Eingabe des Anliegens
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder({
                    label: 'Wie lautet dein Anliegen?', // Label der Eingabe
                    customId: 'issue', // ID der Eingabe
                    required: true, // Eingabe ist erforderlich
                    maxLength: 1024, // Maximale Länge der Eingabe
                    placeholder: 'Bitte schreibe ganze Sätze!', // Platzhalter für die Eingabe
                    style: 2 // Stil der Eingabe (2 = Langtext)
                })
            )
        ]
    })
}

// Definition des String-Select-Menüs für die Interaktionen
export default new StringSelectMenu<MyClient>({
    id: 'ticket', // ID des Menüs
    async execute(interaction, client) {
        // Anzeigen des Modal-Fensters basierend auf der Auswahl
        await interaction.showModal(modals[interaction.values[0]])
    }
})
