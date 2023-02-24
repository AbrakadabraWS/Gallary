import fs from 'fs';
import sharp from 'sharp';

const compression = (dir_no_compression) => {
    dir_no_compression.forEach((picture, index) => {
        sharp(`public/pictures/no_compression/${picture}`)
            .resize({ width: 500 })
            .toFile(`public/pictures/compression/preview/${picture}`)
            .then(() => { })
    })

    dir_no_compression.forEach((picture, index) => {
        sharp(`public/pictures/no_compression/${picture}`)
            .resize({ width: 2500 })
            .toFile(`public/pictures/compression/${picture}`)
            .then(() => { })
    })
}

export const getPicturesList = async (ctx) => {
    let dir_no_compression = fs.readdirSync('public/pictures/no_compression/');
    let dir_preview;
    let dir_compression;

    let picturesList;

    compression(dir_no_compression);

    dir_preview = fs.readdirSync('public/pictures/compression/preview/');
    dir_compression = fs.readdirSync('public/pictures/compression/');


    picturesList = dir_compression.map(fileName => {
        return {
            fileName,
            src: '/pictures/compression/' + fileName,
            srcCompress: '/pictures/compression/preview/' + fileName
        }
    })
    return {
        picturesList
    };
}
