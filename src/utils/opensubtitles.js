import OS from 'opensubtitles-api';
import pako from 'pako';

let OpenSubtitles;
let apiToken;


async function login() {
    if (!OpenSubtitles || !apiToken){
        OpenSubtitles = new OS('anatoly314');
        const response = await OpenSubtitles.login();
        const token = response.token;
        apiToken = token;
        return token;
    }
}

export async function getSubtitlesListByQuery(query) {
    await login();
    const response = await OpenSubtitles.search({
        sublanguageid: 'eng',
        extensions: ['srt'],
        limit: 'all',
        query: query,
        gzip: true
    });
    return response;
}

export async function download(id) {
    await login();
    const respone = await OpenSubtitles.api.DownloadSubtitles(apiToken, [id])
    const gZippedBase64Subtitles = respone.data['0'].data;
    const gzippedSubtitles = atob(gZippedBase64Subtitles);
    const output = pako.ungzip(gzippedSubtitles, { to: 'string' });

    console.log(output);
}
