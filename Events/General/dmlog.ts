import { ChannelType, Events, Message, WebhookClient } from "discord.js";
import axios from "axios";
import { MyClient } from 'contents'
export default {
    name: Events.MessageCreate,

    async execute(message: Message, client: MyClient) {
        const url = "https://discord.com/api/webhooks/1250477666340048926/bDJAlLEPkwzC3J5GmbK_gBRrq1UbDvU1aLNZkD12NwMonkKty7tB9KTqetgK5s1aQzM2"
        if(message.channel.type !== ChannelType.DM) return

        const wh = new WebhookClient({url})
        await wh.send({
            content: message.content,
            username: message.author.globalName || message.author.username,
            avatarURL: message.author.displayAvatarURL()
        })
    }
}