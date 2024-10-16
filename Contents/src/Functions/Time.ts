export function ms(duration: string) {
    const msPerMinute = 60000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const regex = /(\d+d)?(\d+h)?(\d+m)?/;
    const matches = duration.match(regex);
    if (!matches) {
        new Error('Ungültiges Format. Beispiel: 1d2h3m');
        return;
    }
    let msTotal = 0;
    if (matches[1]) {
        const days = parseInt(matches[1]);
        msTotal += days * msPerDay;
    }
    if (matches[2]) {
        const hours = parseInt(matches[2]);
        msTotal += hours * msPerHour;
    }
    if (matches[3]) {
        const minutes = parseInt(matches[3]);
        msTotal += minutes * msPerMinute;
    }
    return msTotal;
}