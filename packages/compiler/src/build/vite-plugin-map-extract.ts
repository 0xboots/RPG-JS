import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import glob from 'glob';

async function processTsxFile(tsxFile: string, output: string) {
    const content = fs.readFileSync(tsxFile, 'utf-8');
    const result = await parseStringPromise(content);
    const imagePath = path.join(path.dirname(tsxFile), result.tileset.image[0].$.source);

    const imageName = path.basename(imagePath);
    const destPath = path.join('dist', output, 'assets', imageName);

    if (!fs.existsSync(path.dirname(destPath))) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
    }

    fs.copyFileSync(imagePath, destPath);
}

export function mapExtractPlugin(output: string = 'client') {
    return {
        name: 'map-extract',
        async buildStart() {
            const tsxFiles = glob.sync('src/**/*.tsx');

            // Traitez chaque fichier TSX
            for (const tsxFile of tsxFiles) {
                await processTsxFile(tsxFile, output);
            }
        },
        configureServer(server) {
            // Ajoutez un watcher pour les fichiers TSX
            server.watcher.add('src/**/*.tsx');

            // Lorsqu'un fichier TSX est ajouté, traitez-le
            server.watcher.on('add', async (file) => {
                if (file.endsWith('.tsx')) {
                    await processTsxFile(file, output);
                }
            });
        },
    };
}
