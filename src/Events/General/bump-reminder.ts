import { Events, Message } from "discord.js";
import { Pings } from "contents";
import { MyClient } from 'contents'
import { Event } from "dcbot";
import Bumps from "../../Schemas/bumps";

export default new Event<MyClient>({
    name: Events.MessageCreate,

    async execute(client, message: Message) {
        if (!message.interaction) return;
        if (message.interaction.commandName != 'bump') return;

        await Bumps.findOne({ userId: message.interaction.user.id })
            .then(async User => {
                if (User) {
                    User.bumps++
                    await User.save()
                } else {
                    await Bumps.create({ userid: message.interaction!.user.id, bumps: 1 })
                }
            })
            .catch(console.log)

        await message.channel.send({ content: `Vielen Dank fürs Bumpen ${message.interaction.user}!\nIch werde bescheid geben, wenn es wieder Zeit zum Bumpen ist.` })
        setTimeout(async () => {
            await message.channel.send(`Hey ${Pings.bumping}! Es ist wieder Zeit mit </bump:947088344167366698> zu Bumpen!`)
        }, 7200000)

    }
})