type DecryptToken = string;

export async function decryptToken(encryptedToken: string, decryptionKey: string): Promise<DecryptToken> {
  const crypto = window.crypto.subtle;

  const key = new TextEncoder().encode(decryptionKey);
  const iv = new Uint8Array(16); // Same IV used during encryption

  const encryptedData = new Uint8Array(
    atob(encryptedToken)
      .split("")
      .map((c) => c.charCodeAt(0))
  );

  return crypto
    .importKey("raw", key, { name: "AES-CBC" }, false, ["decrypt"])
    .then((importedKey) => {
      return crypto.decrypt(
        { name: "AES-CBC", iv: iv },
        importedKey,
        encryptedData
      );
    })
    .then((decryptedData) => {
      const decoder = new TextDecoder();
      return decoder.decode(decryptedData); // Returns the decrypted token (the signed token)
    })
    .catch((err) => {
      console.error("Decryption failed:", err);
      return ""; // Return a default string in case of failure
    })
}


// Decode the decrypted token (JWT) into its claims
export function decodeToken(decryptedToken: string) {
    const jwtParts = decryptedToken.split('.');
    const payload = JSON.parse(atob(jwtParts[1])); // Base64Url decoding
    console.log(payload);
}
