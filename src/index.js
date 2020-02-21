require('dotenv').config();
const { app } = require('./app');

async function main() {
    await app.listen(app.get('port'), async () => {
        await console.log(`Is server run http://localhost:${app.get('port')}/notes`)
    });
}

main();