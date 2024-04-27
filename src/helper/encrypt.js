// Function to derive a key from the passkey
async function deriveKey(passkey) {
    const encoder = new TextEncoder();
    const passkeyBytes = encoder.encode(passkey);
    const baseKey = await window.crypto.subtle.importKey(
        'raw',
        passkeyBytes,
        {name: 'PBKDF2'},
        false,
        ['deriveKey']
    );
    return await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode('salt'), // Use a unique salt for each user
            iterations: 100000,
            hash: 'SHA-256'
        },
        baseKey,
        {name: 'AES-CBC', length: 256},
        false,
        ['encrypt', 'decrypt']
    );
}

// Function to convert a Uint8Array to a Base64 string
function arrayToBase64(array) {
    return btoa(String.fromCharCode.apply(null, array));
}

// Function to convert a Base64 string to a Uint8Array
function base64ToArray(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// Modify the encryptData function
async function encryptData(data, passkey) {
    const derivedKey = await deriveKey(passkey);
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    const encryptedData = await window.crypto.subtle.encrypt(
        {name: 'AES-CBC', iv: iv},
        derivedKey,
        dataBytes
    );
    // Convert iv and data to Base64 strings
    return {iv: arrayToBase64(iv), data: arrayToBase64(new Uint8Array(encryptedData))};
}

// Modify the decryptData function
async function decryptData(encryptedData, passkey) {
    const derivedKey = await deriveKey(passkey);
    // Convert iv and data from Base64 strings to Uint8Array
    const decryptedData = await window.crypto.subtle.decrypt(
        {name: 'AES-CBC', iv: base64ToArray(encryptedData.iv)},
        derivedKey,
        base64ToArray(encryptedData.data)
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
}

export {encryptData, decryptData};