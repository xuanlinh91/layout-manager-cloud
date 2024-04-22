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
        // Generate the key corresponding to layoutIds object
        const layoutIdKey = "layout_" + key.name;

        // Check if the key exists in layoutIds
        if (layoutIds.hasOwnProperty(layoutIdKey)) {
            oldLayouts.push(key); // Add to layoutKeysExist array if exists
        } else {
            newLayouts.push(key); // Add to layoutKeysNotExist array if not exists
        }
    });

    return {oldLayouts, newLayouts}
}