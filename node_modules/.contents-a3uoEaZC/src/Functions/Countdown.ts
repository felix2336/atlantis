export function countdown(ms: number) {
    return `<t:${Math.floor(ms / 1000)}:R>`
}