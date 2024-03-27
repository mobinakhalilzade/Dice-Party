import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private readonly key = environment.encryption_key;
  private readonly excludedKeys = ['refresh_token', 'token'];

  getData(key: string): any {
    const data = localStorage.getItem(key) || '';
    const decryptedData = this.shouldEncrypt(key) ? this.decrypt(data) : data;

    if (decryptedData) {
      if (this.isJSON(decryptedData)) {
        try {
          const jsonData = JSON.parse(decryptedData);
          return jsonData;
        } catch (jsonError) {
          console.error('Error parsing decrypted data as JSON:', jsonError);
        }
      } else {
        return decryptedData;
      }
    }
    return null;
  }

  setData(key: string, data: any): void {
    const jsonData = typeof data === 'string' ? data : JSON.stringify(data);
    const valueToSet = this.shouldEncrypt(key) ? this.encrypt(jsonData) : jsonData;
    localStorage.setItem(key, valueToSet);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    const decryptedBytes = CryptoJS.AES.decrypt(txtToDecrypt, this.key);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }

  private isJSON(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  private shouldEncrypt(key: string): boolean {
    return !this.excludedKeys.includes(key);
  }
}
