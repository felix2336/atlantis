export class Cooldown<K extends string, V extends number> {
    private storage: Record<string, V>

    constructor() {
        this.storage = {}
    }

    delete(key: K): boolean {
        const keyString = String(key)
        if (this.storage[keyString]) {
            delete this.storage[keyString]
            return true
        }
        return false
    }
    has(key: K): boolean {
        const keyString = String(key)
        return this.storage[keyString] !== undefined
    }
    isExpired(key: K): boolean {
        const keyString = String(key)
        const n = Date.now()
        if (this.storage[keyString] < n || !this.storage[keyString]) {
            return true
        }
        return false
    }
    set(key: K, value: V): void {
        const keyString = String(key)
        this.storage[keyString] = value
    }
}