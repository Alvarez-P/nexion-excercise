import { ConfigService } from '@nestjs/config';
import { EncryptionService } from 'src/core/application/encryption.service';

export const encrypt = (text: string) => {
  const encryptionService = new EncryptionService(new ConfigService());
  return encryptionService.encrypt(text);
};
