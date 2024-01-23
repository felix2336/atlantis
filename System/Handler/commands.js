const { Client } = require("discord.js");
const { Permissions } = require("../Validations/Permissions");

/**
 * @param { Client } client
 */

module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii().setHeading("Command", "Status", "Reason")

    const CommandsArray = [];

    (await PG(`${process.cwd().replace(/\\/g, "/")}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name) {
            Table.addRow(file, "⛔", "Missing name!");
            return;
        }

        if(command.disabled) return Table.addRow(command.name, '❌', 'Disabled!')

        if (!command.context && !command.description) {
            Table.addRow(file, "⛔", "Missing description!");
            return;
        }

        if (command.dev && !command.permission) {
            client.commands.set(command.name, command);
            CommandsArray.push(command)
            await Table.addRow(`${command.name}`, "✅", "Dev!")
        }

        if (!Permissions.includes(command.permission) || !command.permission) {
            Table.addRow(file, "⛔", "Missing/invalid permission!");
            return;
        }

        client.commands.set(command.name, command);

        CommandsArray.push(command);

        await Table.addRow(`${command.name}`, "✅", "Loaded!")
    });
    console.log(Table.toString());

    client.on("ready", client => {
        client.guilds.cache.forEach(g => {
            g.commands.set(CommandsArray);
        })
    })

}