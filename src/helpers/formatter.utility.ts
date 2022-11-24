export function formatDate(dateString: string, retrieveFullDate: boolean = false) {
    const date = new Date(dateString);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `${date.getHours()}`;
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    let formattedDate = `${day}/${month}/${date.getFullYear()}`;
    let formattedHour = `${hours}:${minutes}:${seconds}`;
    return retrieveFullDate ? `${formattedDate} ${formattedHour}` : `${formattedDate}`;
}