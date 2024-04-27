const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3/files';
const UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files';

export async function createFolder(folderName, accessToken) {
    console.log("Creating folder: ", folderName)
    const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
    };

    const response = await fetch(DRIVE_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(folderMetadata)
    });

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
    }

    const data = await response.json();
    if (!data.id) {
        console.error('Unexpected response format');
        return null;
    }

    return data.id;
}

export async function deleteFile(fileId, accessToken) {
    console.log("Deleting file: ", fileId)
    try {
        await fetch(DRIVE_API_URL + "/" + fileId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

async function uploadFile(folderId, uploadFile, accessToken) {
    const metadata = {
        name: uploadFile.name,
        mimeType: "application/json",
        parents: [folderId]
    };

    // Create a file object from JSON string
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    formData.append("file", uploadFile);

    try {
        const response = await fetch(UPLOAD_URL + "?uploadType=multipart", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        const data = await response.json();
        console.log(data);
        return data.id;
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

async function updateFile(folderId, fileId, uploadFile, accessToken) {
    const metadata = {
        name: uploadFile.name,
        mimeType: "application/json",
    };

    // Create a file object from JSON string
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    formData.append("file", uploadFile);

    try {
        const response = await fetch(UPLOAD_URL + "/" + fileId + '?uploadType=multipart', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        const data = await response.json();
        console.log(data);
        return data.id;
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

export async function checkFolderExist(folderName, accessToken) {
    const foldersResponse = await fetch(DRIVE_API_URL + "?q=trashed = false and mimeType = " +
        "\'application/vnd.google-apps.folder\' and name = \'" + folderName + "\'", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const foldersData = await foldersResponse.json();

    let folderId;
    if (foldersData.files.length > 0) {
        folderId = foldersData.files[0].id;
    }

    return folderId
}

export async function getDriveFileContent(fileId, accessToken) {
    if (fileId) {
        const fileContentResponse = await fetch(DRIVE_API_URL + `/${fileId}?alt=media`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return await fileContentResponse.json();
    }
}


export async function listFolderJsonFiles(folderID, accessToken) {
    const endpoint = DRIVE_API_URL + "?q='" + folderID + "'+in+parents&mimeType='application/json'"
    const folderFiles = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const filesData = await folderFiles.json();
    return filesData.files
}

export async function checkFileExist(fileName, accessToken) {
    const endpoint = DRIVE_API_URL+ "?q=name%3D%27" + fileName + "%27&fields=files(id)";
    const fileCheckResponse = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const filesData = await fileCheckResponse.json();

    let fileId;
    if (filesData.files && filesData.files.length > 0) {
        fileId = filesData.files[0].id;
    }

    return fileId
}

export async function persist(fileId, folderId, file, accessToken) {
    console.log("Start persist: ", file.name)
    if (fileId) {
        // Replace file
        fileId = await updateFile(folderId, fileId, file, accessToken)
        if (!fileId) {
            console.error('Error updating file:', file.name);
            return;
        }
        console.log('File updated successfully. File ID:', fileId);
    } else {
        // Upload file to folder
        fileId = await uploadFile(folderId, file, accessToken);
        if (!fileId) {
            console.error('Error uploading file:', file.name);
            return;
        }

        console.log('File uploaded successfully. File ID:', fileId);
    }

    return fileId
}