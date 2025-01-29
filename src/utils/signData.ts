import fs from 'fs';
import crypto from 'crypto';

// Load private key
const privateKey = fs.readFileSync('private_key.pem', 'utf8');

export function signData(data: unknown) {
  const sign = crypto.createSign('SHA256');
  sign.update(JSON.stringify(data));
  sign.end();
  return sign.sign(privateKey, 'base64'); // Returns a signature
}
