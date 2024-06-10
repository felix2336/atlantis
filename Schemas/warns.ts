import { Schema, model } from 'mongoose'
import { Colors, EmbedBuilder } from 'discord.js'

const WarnSchema = new Schema({
    userId: { type: String, required: true },
    warns: [{ date: { type: String, required: true }, moderator: { type: String, required: true }, reason: { type: String, required: true }, id: { type: String, required: true } }],
})

const Warns = model('warns', WarnSchema)
export default Warns

function getWarnEmbed(): EmbedBuilder {
    const e = new EmbedBuilder({
        title: `Warns von ${this.username}`,
        description: '',
        color: Colors.Aqua
    })

    for (const warn of this.warns) {
        e.data.description += `${warn.date} von ${warn.moderator}\nGrund: **${warn.reason}**\nWarn-ID: \`${warn.id}\`\n\n`
    }

    return e
}

function addWarn(moderator: string, reason: string): void {
    this.warns.push({
        date: new Date().toLocaleDateString('ger'),
        moderator,
        reason,
        id: this.generateWarnId()
    })
}