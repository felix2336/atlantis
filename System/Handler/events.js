const { Events } = require("../Validations/Events");


module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii().setHeading("Event", "Status", "Reason");
    
    (await PG(`${process.cwd().replace(/\\/g,"/")}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);


        if(!Events.includes(event.name) || !event.name) {
            await Table.addRow(file, `⛔`, `Missing name!`);
            return;
        }
        else if(event.disabled){
            await Table.addRow(file, `❌`, `Disabled!`)
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } 
        else if(event.disabled) return
        else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }
        
        await Table.addRow(`${event.name}`, "✅", "Loaded!")
    });

    console.log(Table.toString());
}