import fs from 'fs';
import https from 'https';
import { fetch } from 'undici'; // Undici is the default fetch engine for Node.js

const ca = fs.readFileSync('C:/Users/IT/AppData/Local/mkcert/rootCA.pem'); // Adjust path accordingly

// Create a custom https agent with the CA certificate
const httpsAgent = new https.Agent({
    ca, // Trust mkcert's root CA
    rejectUnauthorized: true, // Ensure Node validates the certificate
});

export async function secureFetch(url: string, options: RequestInit = {}) {
    return fetch(url, {
        ...options,
        dispatcher: httpsAgent, // Use the custom agent with the CA
    });
}
