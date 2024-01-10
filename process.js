const fs = require('fs');

const csvFilePath = '404.csv';
const vercelJsonPath = 'vercel-temp.json';

fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the CSV file:', err);
        return;
    }

    const lines = data.split('\n');
    const redirects = [];

    for (let i = 1; i < lines.length; i++) { // Start from 1 to skip header
        const [old, newUrl, , permanent] = lines[i].split(',');

        if (!old || !newUrl) continue; // Skip if essential data is missing

        // Convert old URL to relative if it's an absolute URL
        let source = new URL(old, 'https://placeholder.com').pathname;

        let destination = newUrl;
        if (newUrl.includes('beta.docs.cow.fi')) {
            destination = newUrl.replace('beta.docs.cow.fi', 'docs.cow.fi');
        }

        // Make destination relative if it's within docs.cow.fi domain
        if (destination.startsWith('https://docs.cow.fi')) {
            destination = destination.replace('https://docs.cow.fi', '');
        }

        let redirectObj;
        if (permanent === 'Y') {
            redirectObj = {
                source: source,
                destination: destination,
                statusCode: 301
            };
        } else {
            redirectObj = {
                source: source,
                destination: destination,
                permanent: false
            };
        }

        redirects.push(redirectObj);
    }

    const vercelConfig = {
        redirects
    };

    fs.writeFile(vercelJsonPath, JSON.stringify(vercelConfig, null, 2), (err) => {
        if (err) {
            console.error('Error writing to vercel.json:', err);
            return;
        }
        console.log('vercel.json has been created successfully.');
    });
});
