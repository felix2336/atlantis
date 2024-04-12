
import { ModalSubmitInteraction, EmbedBuilder, Colors, Client, ButtonBuilder, ActionRowBuilder, TextChannel, Message, EmbedData } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs'
import StaffPoll from '../../Classes/staff-poll';

export default {
    id: 'modal_staffpoll',

    async execute(interaction: ModalSubmitInteraction, client: Client) {
        const channel = client.channels.cache.get('1208549139126812702') as TextChannel;
        const messages = await channel.messages.fetch();
        const message = messages.first()
        if (!message) return interaction.reply({ content: 'Die Umfrage wurde nicht gefunden. Bitte erstelle eine neue', ephemeral: true })
        let polls = JSON.parse(readFileSync('./JSON/polls.json', 'utf8')) as StaffPoll[]
        const pollData = polls.find(poll => poll.id == message.id)
        if (!pollData) return interaction.reply({ content: 'Die Umfrage wurde nicht gefunden. Bitte erstelle eine neue', ephemeral: true })
        const poll = new StaffPoll().assignData(pollData)

        const option1 = interaction.fields.getTextInputValue('field1');
        const option2 = interaction.fields.getTextInputValue('field2');
        const option3 = interaction.fields?.getTextInputValue('field3');
        const option4 = interaction.fields?.getTextInputValue('field4');

        poll.options.push({ name: option1, votes: [] })
        poll.options.push({ name: option2, votes: [] })
        poll.options.push({ name: option3, votes: [] })
        poll.options.push({ name: option4, votes: [] })

        polls = polls.filter(p => p.id != poll.id)
        polls.push(poll)

        const embed = new EmbedBuilder(message.embeds[0].data)
        // .addFields([
        //     { name: option1, value: `0 Stimmen` },
        //     { name: option2, value: `0 Stimmen` },
        //     { name: option3, value: `0 Stimmen` },
        //     { name: option4, value: `0 Stimmen` }
        // ])

        embed.data.fields = [
            { name: option1, value: `0 Stimmen` },
            { name: option2, value: `0 Stimmen` },
            { name: option3, value: `0 Stimmen` },
            { name: option4, value: `0 Stimmen` }
        ]


        const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                customId: 'poll-1',
                label: option1,
                style: 1
            }),
            new ButtonBuilder({
                customId: 'poll-2',
                label: option2,
                style: 1
            }),
            new ButtonBuilder({
                customId: 'poll-3',
                label: option3,
                style: 1
            }),
            new ButtonBuilder({
                customId: 'poll-4',
                label: option4,
                style: 1
            }),
        ]);

        if (!option3) {
            embed.data.fields!.pop();
            embed.data.fields!.pop();
            row.components.pop();
            row.components.pop();
            poll.options.pop()
            poll.options.pop()
        }
        else if (!option4) {
            embed.data.fields!.pop();
            row.components.pop();
            poll.options.pop()
        }

        //@ts-ignore
        await message.edit({ content: '', embeds: [embed], components: [row] });
        writeFileSync('./JSON/polls.json', JSON.stringify(polls, null, 2), 'utf8')
        interaction.reply({ content: 'Die Umfrage wurde erfolgreich erstellt', ephemeral: true });
    }
};
