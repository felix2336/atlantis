import { Event } from 'dcbot'
import { Categories, Channels } from 'contents'
import { Attachment, Events, ForumChannel, Message, TextBasedChannel, TextChannel } from 'discord.js'

export default new Event({
    name: Events.MessageCreate,

    async execute(client, message: Message) {
        if(message.author.bot) return;
        const channel = message.channel as TextChannel
        if (channel.parentId != Categories.ticket) return;
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel
        const wh = (await transkripts.fetchWebhooks()).first()
        const transkript = transkripts.threads.cache.find(ch => ch.name == channel.name)

        if(!wh) {
            return
        }

        const attachments: Attachment[] = []
        for(const [_, attachment] of message.attachments) {
            attachments.push(attachment)
        }

        await wh.send({
            files: attachments,
            content: message.content,
            threadId: transkript!.id,
            username: message.author.username,
            avatarURL: message.author.displayAvatarURL(),
        })
    },
})