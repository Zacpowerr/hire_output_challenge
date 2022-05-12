const express = require('express');
const cors = require('cors');

const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (request, response) => {
    const url = 'https://records.nhl.com/site/api/player/';
    try {
        const res = await axios.get(url);
        response.send(res.data['data']);
    } catch (error) {
        console.error(error);
    }

});
app.listen(5000, () => {
    console.log("listing in port 5000...")
})