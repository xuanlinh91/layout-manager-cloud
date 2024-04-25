export function countTabs(jsonData) {
    return jsonData.flatMap(layout => layout.tabs).length;
}

export function localStorageDataToBlob(item, fileName) {
    if (!fileName) {
        fileName = item + ".json"
    }
    const data = localStorage.getItem(item);
    const file = new Blob([data], {type: 'application/json'});
    file.name = fileName;
    return file
}

export async function hashString(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}