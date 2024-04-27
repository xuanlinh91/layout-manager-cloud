import {encryptData} from "./encrypt.js";

export function countTabs(jsonData) {
    return jsonData.flatMap(layout => layout.tabs).length;
}

export async function localStorageDataToBlob(item, encryption, passkey, fileName) {
    if (!fileName) {
        fileName = item + ".json"
    }
    let data = localStorage.getItem(item);
    if (encryption) {
        data = JSON.stringify(await encryptData(data, passkey));
    }
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