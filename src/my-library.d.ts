import { Client, ClientOptions, Collection, Guild, Message, MessageContextMenuCommandInteraction, TextChannel, UserContextMenuCommandInteraction } from "discord.js";
import { Button, ContextMenu, Modal, SelectMenu, SlashCommand } from "../contents";
import { AudioPlayer } from "@discordjs/voice";

declare module "contents" {
    export class Cooldown<K, V> {
        private storage: Record<string, V>;
        public set(key: K, value: V): void;
        public has(key: K): boolean;
        public isExpired(key: K): boolean;
        public delete(key: K): boolean;
    }
    export class MyClient extends Client<boolean> {
        public commands: Collection<string, SlashCommand>;
        public apps: SlashCommand[] & ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>[];
        public contextMenus: Collection<string, ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>>;
        public modals: Collection<string, Modal>;
        public selectMenus: Collection<string, SelectMenu>;
        public buttons: Collection<string, Button>;
        public guild: Guild | undefined;
        public queue: { title: string, url: string, thumbnail: string, duration: string }[];
        public player: AudioPlayer | undefined;

        constructor(options: ClientOptions);

        public setGuild(guild: Guild): void;
        public enableAudioPlayer(): void;
    }
    export class Suggestion {
        user: string;
        suggestion: string;
        type: SuggestionType;

        constructor(data: SuggestionData);

        public submit(channel: TextChannel): Promise<void>
        private getTypeString(): string
    }
    export enum SuggestionType {
        Server = 1,
        Bot = 2
    }
    export interface SuggestionData {
        user: string,
        suggestion: string,
        type: SuggestionType
    }
}