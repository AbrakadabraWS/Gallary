import fs from 'fs';

export async function getPicturesList(ctx) {
    let dir = fs.readdirSync('public/pictures');
    dir = dir.map(fileName => {
        let stats = fs.statSync('public/pictures/' + fileName)
        let file = fs.readFileSync('public/pictures/' + fileName)
        return {
            fileName,
            src: '/pictures/' + fileName,
            // stats,
            // fileData: file,
        }
    })
    // console.log(dir);
    return {
        dir
    };
}
