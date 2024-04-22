// Sample localStorage data
const localStorageData = {
    layout_keys: [{"name":"1","createdAt":"12/04/2024","numberOfTab":6},{"name":"2","createdAt":"12/04/2024","numberOfTab":6},{"name":"3","createdAt":"12/04/2024","numberOfTab":6},{"name":"4","createdAt":"12/04/2024","numberOfTab":6}],
    layout_1: {},
    layout_2: {},
    layout_3: {},
    layout_4: {}
};

// Sample cloud_files array
const cloud_files = [
    {
        "kind": "drive#file",
        "mimeType": "application/json",
        "id": "1Tb1p73B5Nv3cklD0Y1KghgmCX11jVFBJ",
        "name": "layout_1.json"
    },
    {
        "kind": "drive#file",
        "mimeType": "application/json",
        "id": "1Ho8h3tdmPTpwHiKXkgd1qBfEnvo3EHNl",
        "name": "layout_5.json"
    }
];

// Function to extract layout name from cloud file name
function extractLayoutName(fileName) {
    return fileName.replace('.json', '').replace('layout_', '');
}

// Function to update localStorage data
function updateLocalStorageData() {
    cloud_files.forEach(file => {
        const layoutName = extractLayoutName(file.name);
        const existingLayout = localStorageData.layout_keys.find(layout => layout.name === layoutName);

        if (existingLayout) {
            const newLayoutName = layoutName + "_local";
            existingLayout.name = newLayoutName;

            // Add new layout to the beginning of layout_keys array
            localStorageData.layout_keys.unshift({
                name: layoutName,
                createdAt: existingLayout.createdAt,
                numberOfTab: existingLayout.numberOfTab
            });

            // Add new layout to localStorageData
            localStorageData[`layout_${newLayoutName}`] = {};
        } else {
            // Add new layout to the beginning of layout_keys array
            localStorageData.layout_keys.unshift({
                name: layoutName,
                createdAt: "12/04/2024", // Example date
                numberOfTab: 6 // Example number
            });

            // Add new layout to localStorageData
            localStorageData[`layout_${layoutName}`] = {};
        }
    });
}

// Update localStorage data
updateLocalStorageData();

// Output updated localStorage data
console.log(localStorageData);
