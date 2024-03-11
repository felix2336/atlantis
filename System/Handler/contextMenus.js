const { Client } = require("discord.js");
const { Permissions } = require("../Validations/Permissions");

/**
 * @param { Client } client
 */

module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii().setHeading("Context Menu", "Status", "Reason");


    (await PG(`${process.cwd().replace(/\\/g, "/")}/ContextMenus/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name) {
            Table.addRow(file, "⛔", "Missing name!");
            return;
        }
        if (!command.type) {
            Table.addRow(file, "⛔", 'Missing Type')
            return;
        }

        if (command.disabled) return Table.addRow(command.name, '❌', 'Disabled!')


        client.menus.set(command.name, command);
        client.apps.push(command)

        await Table.addRow(`${command.name}`, "✅", "Loaded!")
    });

    console.log(Table.toString());

    client.on('ready', () => {
        client.guilds.cache.forEach(g => {
            g.commands.set(client.apps)
        })
    })
}