import multer, { memoryStorage } from 'multer';

const userImage = multer({
    storage: memoryStorage(),
});
export default userImage;
