export async function getAESKey(password) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.digest('SHA-256', enc.encode(password));
    return crypto.subtle.importKey(
        'raw',
        keyMaterial,
        'AES-GCM',
        false,
        ['encrypt', 'decrypt']
    );
}

export async function encryptData(data, password) {
    try {
        const enc = new TextEncoder();
        const iv = crypto.getRandomValues(new Uint8Array(12)); 
        const cryptoKey = await getAESKey(password);

        const encryptedBuffer = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            cryptoKey,
            enc.encode(JSON.stringify(data))
        );

        return { encrypted: Array.from(new Uint8Array(encryptedBuffer)), iv: Array.from(iv) };
    } catch (err) {
        console.error('Encryption failed:', err);
        return null;
    }
}

export async function decryptData(encryptedObj, password) {
    try {
        const { encrypted, iv } = encryptedObj;
        const cryptoKey = await getAESKey(password);

        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: new Uint8Array(iv) },
            cryptoKey,
            new Uint8Array(encrypted)
        );

        return JSON.parse(new TextDecoder().decode(decryptedBuffer));
    } catch (err) {
        console.error('Decryption failed:', err);
        return null;
    }
}
