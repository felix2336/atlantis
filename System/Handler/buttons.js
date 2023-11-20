const { Client } = require("discord.js");

/**
 * @param { Client } client
 */

module.exports = async (client, PG, Ascii) => {
    
    const Table = new Ascii().setHeading("Button", "Status", "Reason");

    (await PG(`${process.cwd().replace(/\\/g,"/")}/Buttons/*/*.js`)).map(async (file) => {
        const button = require(file);

        if(!button.id) {
            Table.addRow(file, "⛔", "Missing CustomID!");
            return;
        }

        client.buttons.set(button.id, button);
    
        await Table.addRow(`${button.id}`, "✅", "Loaded!")
    });
    console.log(Table.toString());
}