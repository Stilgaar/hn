
const today = new Date()

export const formatToDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // months are 0-based in JS
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

export const formatToDateForDisplay = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // months are 0-based in JS
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
}

export const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

export const currentDate = today;
let hours = String(currentDate.getHours()).padStart(2, '0');
let minutes = String(currentDate.getMinutes()).padStart(2, '0');
export const timeString = `${hours}h${minutes}`;

export const currentYear = today.getFullYear()

export const monthNamesInFrench = (dateItem) => {
    const date = new Date(dateItem);
    const monthName = new Intl.DateTimeFormat('fr', { month: 'long' }).format(date);
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};

export const makeTimeString = (date) => {
    const makeDate = new Date(date)
    let hours = String(makeDate.getHours()).padStart(2, '0');
    let minutes = String(makeDate.getMinutes()).padStart(2, '0');
    return `${hours}h${minutes}`
}

// TO DO : voir si je l'utilse ailleurs celle la
export const makeTimeStringWithSeconds = (date) => {
    const makeDate = new Date(date)
    let hours = String(makeDate.getHours()).padStart(2, '0');
    let minutes = String(makeDate.getMinutes()).padStart(2, '0');
    let seconds = String(makeDate.getSeconds()).padStart(2, '0')
    return `${hours}h${minutes}m${seconds}`
}

export const makeDateForJson = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export const formatAmount = (amount) => {
    const newAmount = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
    return newAmount
}

export const formatKilometers = (kilometers) => {
    const newKilometers = new Intl.NumberFormat('fr-FR').format(kilometers) + ' km';
    return newKilometers;
}


export const normalizeNameLowerCase = (name) => {
    if (!name) return "";

    const frenchAccentsMap = {
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a',
        'ç': 'c',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ñ': 'n',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
        'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
        'ý': 'y', 'ÿ': 'y'
    };

    return String(name)
        .toLowerCase()
        .replace(/[àáâãäçèéêëìíîïñòóôõöùúûüýÿ]/g, char => frenchAccentsMap[char] || char);
}
