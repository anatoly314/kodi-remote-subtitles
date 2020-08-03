const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// https://stackoverflow.com/a/5002618/947111
function _removeHtmlFromText(rawText) {
    const div = document.createElement("div");
    div.innerHTML = rawText;
    const text = div.textContent || div.innerText || "";
    return text;
}

export async function translate(subtitlesRow,  sourceLanguage, translationLanguage) {



    const text = _removeHtmlFromText(subtitlesRow);
    try {
        let URI = `${CORS_PROXY}http://translate.google.ps/translate_a/t?client=dict-chrome-ex` +
        `&sl=${sourceLanguage ? sourceLanguage : 'auto'}` +
        `&tl=${translationLanguage}` +
        `&q=${text}` +
        `&tbb=1` +
        `&ie=UTF-8` +
        `&oe=UTF-8`;
        const response = await fetch(URI, {
            method: 'GET',
            headers: {
                'Origin': null
            }
        });
        const translation = await response.json();
        return translation;
    } catch (e) {
        console.error(e);
    }


}
