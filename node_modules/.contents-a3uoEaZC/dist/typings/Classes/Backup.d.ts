import { Guild } from "discord.js";
export declare class Backup {
    categories?: any;
    constructor(data?: Backup);
    save(guild: Guild): void;
    load(guild: Guild): Promise<void>;
}
