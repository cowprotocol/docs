// scripts/fetch-readme.js
import fs from 'fs';
import path from 'path';

const README_URL = 'https://raw.githubusercontent.com/cowprotocol/cow-sdk/refs/heads/main/packages/sdk/README.md';

// Destination file in Docusaurus docs
const DOCS_PATH = path.join(process.cwd(), 'docs/cow-protocol/sdks/cow-sdk', 'README.mdx');

async function fetchReadme() {
    try {
        const res = await fetch(README_URL);
        if (!res.ok) throw new Error(`Failed to fetch CoW SDK README: ${res.statusText}`);
        const text = await res.text();

        fs.writeFileSync(DOCS_PATH, text);
        console.log('✅ CoW SDK README.md fetched from GitHub!');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fetchReadme();
