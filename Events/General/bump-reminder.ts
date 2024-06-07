import { Events, Message } from "discord.js";
import { MyClient, Pings } from "../../contents";
import Bumps from "../../Schemas/bumps";

export default {
    name: Events.MessageCreate,

    async execute(message: Message, client: MyClient) {
        if(!message.interaction) return;
        if(message.interaction.commandName != 'bump') return;

        let User = await Bumps.findOne({userId: message.interaction.user.id})
        if(!User) {
            User = await Bumps.create({userId: message.interaction.user.id, bumps: 1})
        }


        await message.channel.send({content: `Vielen Dank fürs Bumpen ${message.interaction.user}!\nIch werde bescheid geben, wenn es wieder Zeit zum Bumpen ist.`})
        await User.save()
        setTimeout(async () => {
            await message.channel.send(`Hey ${Pings.bumping}! Es ist wieder Zeit mit </bump:947088344167366698> zu Bumpen!`)
        }, 7200000)

    }
}