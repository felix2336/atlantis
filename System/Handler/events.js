const { Events } = require("../Validations/Events");


module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii().setHeading("Event", "Status", "Reason");
    
    (await PG(`${process.cwd().replace(/\\/g,"/")}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);


        if(!Events.includes(event.name) || !event.name) {
            await Table.addRow(file, `⛔`, `Missing name!`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }
        
        await Table.addRow(`${file.split('/')[5].split('.')[0]}`, "✅", "Loaded!")
    });

    console.log(Table.toString());
}