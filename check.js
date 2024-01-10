import fs from 'fs';
import fetch from 'node-fetch';

const vercelJsonPath = 'vercel.json';
const baseUrl = 'https://docs-git-redirect-handling-cowswap.vercel.app'; // Base URL for the source paths

async function checkRedirects() {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    const redirects = vercelConfig.redirects;

    for (const redirect of redirects) {
        const sourceUrl = new URL(redirect.source, baseUrl).href;
        let expectedDestination = redirect.destination;
        if (!expectedDestination.startsWith('http://') && !expectedDestination.startsWith('https://')) {
            expectedDestination = new URL(expectedDestination, baseUrl).href;
        }

        const expectedStatusCode = redirect.statusCode || (redirect.permanent === false ? 307 : null);

        try {
            const response = await fetch(sourceUrl, { redirect: 'manual' });
            const actualStatusCode = response.status;
            const actualDestination = response.headers.get('location');

            if (actualStatusCode === expectedStatusCode && (!expectedDestination || new URL(actualDestination, baseUrl).href === expectedDestination)) {
                console.log(`✅ ${sourceUrl} correctly redirects to ${actualDestination} with status code ${actualStatusCode}`);
            } else {
                console.error(`❌ ${sourceUrl} failed to redirect correctly. Expected: ${expectedDestination} with status ${expectedStatusCode}, Actual: ${actualDestination} with status ${actualStatusCode}`);
            }
        } catch (error) {
            console.error(`️⚠️ Error fetching ${sourceUrl}:`, error.message);
        }
    }
}

checkRedirects();