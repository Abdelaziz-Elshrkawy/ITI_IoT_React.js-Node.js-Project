import multer, { memoryStorage } from 'multer';
import path from 'path';
const userImage = multer({
    storage: memoryStorage()
});
export default userImage;
