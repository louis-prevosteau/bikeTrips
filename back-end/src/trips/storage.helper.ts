import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

const destinationPath = './uploads/trip-photos';

export function ensureUploadDirExists() {
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
}

export function storageConfig() {
  ensureUploadDirExists();

  return diskStorage({
    destination: destinationPath,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
}
