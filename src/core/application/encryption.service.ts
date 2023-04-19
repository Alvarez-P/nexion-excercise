import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
  private SECRET: string;
  constructor(private configService: ConfigService) {
    this.SECRET = this.configService.get('ENCRYPT_SECRET');
  }

  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.SECRET).toString();
  }

  compare(plainText: string, hash: string): boolean {
    const decrypted = CryptoJS.AES.decrypt(hash, this.SECRET);
    return plainText === decrypted.toString(CryptoJS.enc.Utf8);
  }
}
