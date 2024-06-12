import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";
import { Client, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction, Guild, ClientOptions, Collection, ButtonInteraction, ChatInputCommandInteraction, ContextMenuCommandBuilder, InteractionResponse, Message, ModalSubmitInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder, StringSelectMenuInteraction } from "discord.js";

export interface SlashCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined> | Promise<Message<boolean>> | Promise<Message<boolean> | undefined>
}

export interface ContextMenu<T extends UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction> {
    data: ContextMenuCommandBuilder,
    execute: (interaction: T, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined>
}

export interface Button {
    id: string,
    execute: (interaction: ButtonInteraction, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined>
}

export interface SelectMenu {
    id: string
    execute: (interaction: StringSelectMenuInteraction, client: MyClient) => Promise<void>
}

export interface Modal {
    id: string,
    execute: (interaction: ModalSubmitInteraction, client: MyClient) => Promise<void>
}

export class MyClient extends Client {
    public commands: Collection<string, SlashCommand>;
    public apps: SlashCommand[] & ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>[];
    public contextMenus: Collection<string, ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>>;
    public modals: Collection<string, Modal>;
    public selectMenus: Collection<string, SelectMenu>
    public buttons: Collection<string, Button>
    public guild: Guild;
    public queue: { title: string, url: string, thumbnail: string, duration: string }[]
    public player: AudioPlayer

    constructor(options: ClientOptions);

    public setGuild(guild: Guild): void;
    public enableAudioPlayer(): void;
    public loadAll(): Promise<void>
}
export class ConsoleInfo {
    public show(message: string): void
}
export class ConsoleWarning {
    public show(message: string): void
}