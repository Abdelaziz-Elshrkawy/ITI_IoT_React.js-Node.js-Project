import multer, { memoryStorage } from 'multer';

const imageProcessing = (fieldName) => {
    return multer({ storage: memoryStorage() }).single(fieldName);
};
export default imageProcessing;
