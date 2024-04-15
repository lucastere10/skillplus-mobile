
import { GOOGLE_PASSWORD_SECRET_KEY } from "@env";
import CryptoJS from 'crypto-js';

export function generateDummyPassword(googleId: string) {
    const hash = CryptoJS.HmacSHA256(googleId, GOOGLE_PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Hex);
    return hash;
}
