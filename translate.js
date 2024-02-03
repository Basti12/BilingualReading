// Dynamically import node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const deepLAuthKey = 'b4d2b925-6252-cf6c-cf32-b73b5fb47972:fx'; // Replace 'YOUR_API_KEY' with your actual DeepL authorization key

// Modify translateText to return a promise that resolves with the translated text
async function translateText(text, targetLang) {
    return new Promise(async (resolve, reject) => {
        const url = 'https://api-free.deepl.com/v2/translate';
        const body = {
            text: [text],
            target_lang: targetLang
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `DeepL-Auth-Key ${deepLAuthKey}`,
                    'User-Agent': 'YourApp/1.2.3',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            // Assuming the API response structure, resolve the promise with the translated text
            // Here, we assume the API returns an array of translations for the text
            resolve(data.translations[0].text);
        } catch (error) {
            console.error('Error translating text:', error);
            reject(error);
        }
    });
}

module.exports = {
    translateText
};
