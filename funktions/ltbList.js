const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    try {
        const url = 'https://de.wikipedia.org/wiki/Liste_der_Ausgaben_des_Lustigen_Taschenbuchs';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const ltbList = [];

        $('table.wikitable tbody tr').each((index, element) => {
            const tds = $(element).find('td');
            if (tds.length > 1) {
                const nummer = $(tds[0]).text().trim();
                const titel = $(tds[1]).text().trim();
                if (nummer && titel) {
                    ltbList.push({ nummer, titel });
                }
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(ltbList),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Fehler beim Abrufen der LTB-Liste' }),
        };
    }
};