// const { Client } = require("discord.js");

// /**
//  * @param { Client } client
//  */

// module.exports = async (client, PG, Ascii) => {

//     const Table = new Ascii().setHeading("Modal", "Status", "Reason");

//     (await PG(`${process.cwd().replace(/\\/g, "/")}/Modals/*/*.js`)).map(async (file) => {
//         const modal = require(file);

//         if (!modal.id) {
//             Table.addRow(file, "⛔", "Missing CustomID!");
//             return;
//         }

//         client.modals.set(modal.id, modal);

//         await Table.addRow(`${modal.id}`, "✅", "Loaded!")
//     });
//     console.log(Table.toString());
// }