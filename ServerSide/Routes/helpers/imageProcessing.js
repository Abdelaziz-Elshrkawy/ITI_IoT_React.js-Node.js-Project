import multer, { memoryStorage } from 'multer';

const imageProcessing = (feildName) => {
    return multer({ storage: memoryStorage() }).single(feildName);
};
export default imageProcessing;
