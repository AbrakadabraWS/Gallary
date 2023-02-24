import fs from 'fs';
import sharp from 'sharp';

const compression = (dir_no_compression) => {
    dir_no_compression.forEach((picture, index) => {
        sharp(`public/pictures/no_compression/${picture}`)
            .resize({ width: 500 })
            .toFile(`public/pictures/compression/${picture}`)
            .then(() => { })
    })
    return fs.readdirSync('public/pictures/compression/')
}

export const getPicturesList = async (ctx) => {
    let dir_no_compression = fs.readdirSync('public/pictures/no_compression/');
    let dir_compression = fs.readdirSync('public/pictures/compression/');
    let picturesList;

    if (dir_no_compression.length !== dir_compression.length) {
        dir_compression = compression(dir_no_compression);
    }

    picturesList = dir_no_compression.map(fileName => {
        return {
            fileName,
            src: '/pictures/no_compression/' + fileName,
            srcCompress: '/pictures/compression/' + fileName
            // stats,
            // fileData: file,
        }
    })
    // console.log(dir);
    return {
        picturesList
    };
}
