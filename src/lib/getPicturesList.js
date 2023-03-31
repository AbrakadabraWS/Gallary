import fs from 'fs';
import path from 'path';
import sharp from 'sharp';


const deletedFiles = (pathFolder, deletedArray) => {
    deletedArray.forEach(picture => {
        fs.rmSync(path.resolve(pathFolder, picture));
    });

    return fs.readdirSync(pathFolder);
}

const sharpedFile = (pathFrom, pathTo, sharpedArray, compressionSize) => {
    sharpedArray.forEach(picture => {
        sharp(path.resolve(pathFrom, picture))
            .resize({ width: compressionSize })
            .toFile(path.resolve(pathTo, picture))
            .then(() => { })
    });

    return fs.readdirSync(pathTo);
}

const checkDirs = (picturesDir = [], previewDir = [], compressionDir = []) => {
    let previewDeleted = [];
    let previewSharped = [];
    let compressionDeleted = [];
    let compressionSharped = [];

    picturesDir.forEach(item => {
        if (!previewDir.includes(item)) {
            previewSharped.push(item);
        }

        if (!compressionDir.includes(item)) {
            compressionSharped.push(item);
        }
    });

    previewDir.forEach(item => {
        if (!picturesDir.includes(item)) {
            previewDeleted.push(item);
        }
    });

    compressionDir.forEach(item => {
        if (!picturesDir.includes(item)) {
            compressionDeleted.push(item);
        }
    });

    return {
        previewDeleted: previewDeleted,
        previewSharped: previewSharped,
        compressionDeleted: compressionDeleted,
        compressionSharped: compressionSharped,
    }
}

export const getPicturesList = async (galleryName) => {
    if (!galleryName) {
        return null;
    }

    let picturesList = [];

    const galleryPath = path.resolve();
    const picturesPath = path.resolve(galleryPath, 'pictures', galleryName);
    const previewPath = path.resolve(galleryPath, 'public', 'images', 'preview', galleryName);
    const compressionPath = path.resolve(galleryPath, 'public', 'images', 'compression', galleryName);

    let picturesDir;
    let previewDir;
    let compressionDir;

    if (!fs.existsSync(previewPath)) {
        fs.mkdirSync(previewPath, { recursive: true });
    }

    if (!fs.existsSync(compressionPath)) {
        fs.mkdirSync(compressionPath, { recursive: true });
    }

    previewDir = fs.readdirSync(previewPath);
    compressionDir = fs.readdirSync(compressionPath);
    picturesDir = fs.readdirSync(picturesPath);

    picturesDir = picturesDir.filter((fileName) => {
        return fileName.indexOf('.txt') === -1;
    });

    let { previewDeleted, previewSharped, compressionDeleted, compressionSharped } = checkDirs(picturesDir, previewDir, compressionDir)

    if (previewDeleted.length > 0) {
        previewDir = deletedFiles(previewPath, previewDeleted);
    }

    if (compressionDeleted.length > 0) {
        compressionDir = deletedFiles(compressionPath, compressionDeleted);
    }

    if (previewSharped.length > 0) {
        previewDir = sharpedFile(picturesPath, previewPath, previewSharped, 500);
    }

    if (compressionSharped.length > 0) {
        compressionDir = sharpedFile(picturesPath, compressionPath, compressionSharped, 2500);
    }

    picturesList = {
        srcPreview: '/images/preview/' + galleryName,
        srcCompression: '/images/compression/' + galleryName,
        files: compressionDir,
    }

    return picturesList
}
