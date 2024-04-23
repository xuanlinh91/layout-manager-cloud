// Function to generate timestamp string
export function generateTimestamp() {
    const now = new Date();
    return now.toISOString();
}

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

export function splitOldNewLayout(layoutKeys, layoutIds){
    // Arrays to store elements with name existing and not existing in layoutIds
    const oldLayouts = [];
    const newLayouts = [];

    // Iterate over layoutKeys array
    layoutKeys.forEach(key => {
        // Check if the key exists in layoutIds
        if (layoutIds.hasOwnProperty(key.name)) {
            oldLayouts.push(key); // Add to layoutKeysExist array if exists
        } else {
            newLayouts.push(key); // Add to layoutKeysNotExist array if not exists
        }
    });

    return {oldLayouts, newLayouts}
}

export async function hashString(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}