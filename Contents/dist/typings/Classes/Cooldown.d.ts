export declare class Cooldown<K extends string, V extends number> {
    private storage;
    constructor();
    delete(key: K): boolean;
    has(key: K): boolean;
    isExpired(key: K): boolean;
    set(key: K, value: V): void;
}
