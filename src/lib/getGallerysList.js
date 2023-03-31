import fs from 'fs/promises';
import path from 'path';

const textToArray = (text, key) => {
    let textArray = text.split(key);
    let resultArray = [];

    textArray.forEach(line => {
        if (line !== '') {
            resultArray.push(line);
        }
    });
    return resultArray;
}

const getCardInfo = async (filePath) => {
    const fileData = await fs.readFile(filePath, 'utf8');
    const textInArray = textToArray(fileData, '\n');
    let title = '';
    let text = '';
    textInArray.forEach(item => {
        if (item.startsWith('@Title@') && item.endsWith('@Title@')) {
            title = textToArray(item, '@Title@')[0];
        }
        else if (item.startsWith('@Text@') && item.endsWith('@Text@')) {
            text = textToArray(item, '@Text@')[0];
        }
        else {
            console.log('Error in src/lib/getGallaryList.js/getCardInfo.txt');
        }
    });
    return { title, text }
}

const getTree = async (dirPath) => {
    let tree = {
        folders: {},
        files: []
    };
    let dir = await fs.readdir(dirPath);

    for (let itemIndex in dir) {
        const itemPath = path.resolve(dirPath, dir[itemIndex]);
        const itemExtname = path.extname(itemPath);
        const itemName = path.basename(itemPath, itemExtname);

        const itemStat = await fs.stat(itemPath);
        if (itemStat.isDirectory()) {
            tree.folders[itemName] = await getTree(itemPath);
        }
        else {
            if (itemExtname === '.txt') {
                tree.cardInfo = await getCardInfo(itemPath);
            }
            else {
                tree.files.push(itemPath);
            }
        }
    };

    return tree;
}

export const getGallerysList = async () => {

    const picturesPath = path.resolve('pictures');
    const imagesPath = path.resolve('public', 'images');

    const picturesTree = await getTree(picturesPath);
    const imagesTree = await getTree(imagesPath);

    return {
        picturesPath: picturesPath,
        picturesTree: picturesTree,
        imagesPath: imagesPath,
        imagesTree: imagesTree,
    }
}
